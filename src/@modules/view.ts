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

/* 表示が重ならないようにする */
export class ViewHost {
    private views: { [id:string]: View } = {};
    private end$: Subject<boolean> = new Subject();
    private viewSubject: Subject<ViewReference> = new Subject();
    private viewObservable: Observable<void>;
    private _bottomBar: any;
    public get show$(): Observable<void> {
        return this.viewObservable;
    }
    constructor() {
        this._bottomBar = new inquirer.ui.BottomBar();
        this.viewObservable = this.viewSubject
        .takeUntil( this.end$ )
        .flatMap( ref => {
            if( ref && ref.id && this.views[ ref.id ] ) {
                return Observable.fromPromise( this.views[ ref.id ].show( ref.param ) );
            }
        } );
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
    
    set bottomBar( text: string ) {
        this._bottomBar.updateBottomBar( text );
    }
}