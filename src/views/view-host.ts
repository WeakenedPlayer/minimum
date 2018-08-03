import { Subject, Observable, Subscription, from } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { View } from './view';
import { Router } from './router';

export class ViewHost {
    private factorySubject: Subject<()=>View> = new Subject();
    private router: Router<()=>View> = new Router();
    private show$: Observable<void>;
    private subscription: Subscription = null;
    
    constructor() {
        this.show$ = this.factorySubject.pipe(
            flatMap( factory => {
                if( factory ) {
                    let view: View;
                    view = ( this.router.current )();
                    return from( view.show( this ) );
                }
            } )
        );
    }
    
    start(): void {
        if( this.subscription === null || this.subscription.closed ) {
            this.subscription = this.show$.subscribe();
        }
    }
    
    stop(): void {
        if( this.subscription !== null && !this.subscription.closed ) {
            this.subscription.unsubscribe();
            this.subscription = null;
        }
    }

    open( factory: ()=>View ): void {
        this.router.open( factory );
        this.factorySubject.next( this.router.current );
    }
    
    goNext(): void {
        let factory = this.router.goNext();
        if( factory === undefined ) {
            factory = this.router.current;
        }
        this.factorySubject.next( factory );
    }
    
    reopen(): void {
        let factory = this.router.current;
        this.factorySubject.next( factory );
    }
    
    goBack(): void {
        let factory = this.router.goBack();
        if( factory === undefined ) {
            factory = this.router.current;
        }
        this.factorySubject.next( factory );
    }
}