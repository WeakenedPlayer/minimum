import { inquirer } from './cli';
import { Subject, Observable, Subscription } from 'rxjs';

export abstract class View {
    protected host: ViewHost = null;
    
    constructor() {
    }
    public registerHost( host: ViewHost ): void {
        this.host = host;
    }
    public abstract onInit(): void;
    public abstract onOpen(): void;
    public abstract onClose(): void;
    public abstract show( param?: any ): Promise<any>;
    public abstract processAnswer( answer?: any): void;
}

interface ViewRef {
    id: string;
    param?: any;
}

export class ViewHost {
    private views: { [id:string]: View } = {};
    private cancelSubject: Subject<string> = new Subject();
    private refSubject: Subject<ViewRef> = new Subject();
    private show$: Observable<void>;
    private subscription: Subscription = new Subscription();
    private lastView: View = null;
    
    constructor() {
        this.show$ = this.refSubject
        .flatMap( ref => {
            let lastView = this.lastView;
            if( lastView ) {
                lastView.onClose();
            }

            let view = this.views[ ref.id ];
            if( view ) {
                //console.log( 'views/opened: ' + ref.id );
                view.onOpen();
                return Observable.fromPromise(
                    view.show( ref.param )
                    .then( ( answer: any ) => {
                        //console.log( 'views/closed' );
                        view.processAnswer( answer );
                        this.lastView = view;
                    }, ( err ) => {
                        // do nothing
                    } )
                );
            }
        } );
    }
    
    start() {
        this.subscription.add( this.show$.subscribe() );
    }
    
    stop() {
        if( !this.subscription.closed ) {
            this.subscription.unsubscribe();            
            this.subscription = new Subscription();
        }
    }

    cancel() {
        this.cancelSubject.error( false );
    }
    
    next( id: string, param?: any ): void {
        this.refSubject.next( { id: id, param: param } );
    }
    
    add( name: string, view: View ): void {
        if( name && view ) {
            view.registerHost( this );
            this.views[ name ] = view;
            view.onInit();
        }
    }
}