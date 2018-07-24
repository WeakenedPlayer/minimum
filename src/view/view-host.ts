import { Subject, Observable, Subscription, from } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { View } from './view';


export class ViewHost {
    private views: { [id:string]: View } = {};
    private refSubject: Subject<string> = new Subject();
    private view$: Observable<void>;
    private subscription: Subscription = new Subscription();
    private current: string = '';
    private last: string = '';
    
    constructor() {
        this.view$ = this.refSubject.pipe(
            flatMap( ref => {
                let view = this.views[ ref ];
                if( view ) {
                    this.last = this.current;
                    this.current = ref;
                    return from( view.show() );
                }
            } )
        );
        
    }
    
    start() {
        this.subscription.add( this.view$.subscribe() );
    }
    
    stop() {
        if( !this.subscription.closed ) {
            this.subscription.unsubscribe();            
            this.subscription = new Subscription();
        }
    }

    next( id: string ): void {
        this.refSubject.next( id );
    }

    reopen( param?: string ): void {
        this.next( this.current );
    }
    
    back( param?: string ): void {
        this.next( this.last );
    }
    
    add( name: string, view: View ): void {
        if( name && view ) {
            view.registerHost( this );
            this.views[ name ] = view;
        }
    }
}