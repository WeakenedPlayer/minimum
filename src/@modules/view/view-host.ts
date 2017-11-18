import { Subject, Observable, Subscription } from 'rxjs';
import { View } from './view';

interface ViewRef {
    id: string;
    param?: any;
}

export class ViewHost {
    private views: { [id:string]: View } = {};
    private refSubject: Subject<ViewRef> = new Subject();
    private show$: Observable<void>;
    private subscription: Subscription = new Subscription();
    private currentRef: ViewRef = null;
    private lastRef: ViewRef = null;
    
    constructor() {
        this.show$ = this.refSubject
        .flatMap( ref => {
            // console.log( ref );
            this.lastRef = ref; 
            let view = this.views[ ref.id ];
            if( view ) {
                this.currentRef = ref;
                return Observable.fromPromise( view.show( ref.param ).then( () => {
                    this.lastRef = ref; 
                } ) );
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

    next( id: string, param?: any ): void {
        this.refSubject.next( { id: id, param: param } );
    }

    reopen( param?: any ): void {
        this.next( this.currentRef.id, param );
    }
    
    back( param?: any ): void {
        this.next( this.lastRef.id, param );
    }
    
    add( name: string, view: View ): void {
        if( name && view ) {
            view.registerHost( this );
            this.views[ name ] = view;
            view.onInit();
        }
    }
}