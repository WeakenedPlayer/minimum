import { prompt, clear, chalk, clui, ListView, BotController } from '../@modules';
import { Observable, Subscription } from 'rxjs';

export class StartView extends ListView {
    private spinner = new clui.Spinner( 'Logging in...', ['◜','◠','◝','◞','◡','◟'] );
    private spinnerObservable: Observable<void>;
    private busyObservable: Observable<boolean>;
    private subscription = new Subscription();
    
    constructor( private controller: BotController ) {
        super();
        this.add( 'Source directory...', ( () => { this.host.next( 'source-input' ); } ) );
        this.add( 'Temporary directory...',  ( () => {this.host.next( 'temporary-input' ); } ) );
        this.add( 'Discord App Token...',  ( () => { this.host.next( 'token-input' ); } ) );
        this.add( 'Login', () => { 
            this.spinner.start();
            this.controller.login()
            .then( () => {
                this.spinner.stop();
                this.host.next( 'connected' );
            }, ( err ) => {
                this.spinner.stop();
                this.host.next( 'start', 'Login failed...' );
            } ); 
        } );
        this.add( 'Quit',() => { process.exit(); } );
    }

    protected message(): string {
        return 'Offline menu:';
    }
    
    /*    private unsubscribe() {
        if( !this.subscription.closed ) {
            this.subscription.unsubscribe();
            this.subscription = new Subscription();
        }
    }*/
    
    
    onInit() {
/*      this.busyObservable = this.controller.state$.map( state => state.busy )
        .distinctUntilChanged()
        .publish()
        .refCount();
        
        this.spinnerObservable = this.controller.state$.map( state => state.busy )
        .filter( busy => busy )
        .flatMap( ( busy ) => {
            // busy になったら Spinnerを開始し、busyでなくなったら止めるようにする。
            this.spinner.start();
            return this.busyObservable
            .filter( busy => !busy )
            .map( () => {
                this.spinner.stop();
            } );
        } );
*/
    }
    
    onOpen(): void {
        // clear();
        // console.log( 'start-view/open' );
        // this.subscription.add( this.spinnerObservable.subscribe() );
    }
    
    onClose(): void {
        // console.log( 'start-view/close' );
         this.spinner.stop();
        // this.unsubscribe();
    }
}
