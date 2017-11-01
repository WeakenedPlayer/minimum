import { Subject, Observable } from 'rxjs';
import { inquirer } from './cli';

export abstract class View {
    protected host: ViewHost = null;
    public init( host: ViewHost ): void {
        this.host = host;
    }
    public abstract show( param?: any ): Promise<void>;
}

class ViewReference {
    constructor( public readonly id, public readonly param?: any ) {}
}

/* inquirer.ui.bottomBar は消さないと終了できないので要注意 */
export class ViewHost {
    private views: { [id:string]: View } = {};
    private end$: Subject<boolean> = new Subject();
    private viewSubject: Subject<ViewReference> = new Subject();
    private viewObservable: Observable<void>;
    public get show$(): Observable<void> {
        return this.viewObservable;
    }
    constructor() {
        this.viewObservable = this.viewSubject
        .filter( ( ref ) => { return ( ref && ref.id && ( this.views[ ref.id ] !== undefined )); } )
        .flatMap( ref => {
            return Observable.fromPromise( this.views[ ref.id ].show( ref.param ) );
        } )
        .takeUntil( this.end$ );
    }
    
    add( id: string, view: View ): void {
        if( id ) {
            this.views[ id ] = view;
            view.init( this );
        }
    }

    next( id: string, param?: any ): void {
        if( id ) {
            this.viewSubject.next( new ViewReference( id, param ) );
        }
    }
    
    close(): void {
        this.end$.next( true );
    }
}