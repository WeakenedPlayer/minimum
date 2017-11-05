import { prompt, clear, chalk, clui, ListView, BotController } from '../@modules';
import { Observable, Subscription } from 'rxjs';

export class StartView extends ListView {
    private spinner = new clui.Spinner( 'Logging in...', ['◜','◠','◝','◞','◡','◟'] );
    private spinnerObservable: Observable<void>;
    private subscription = new Subscription();
    
    constructor( private controller: BotController ) {
        super();
        this.add( 'Source directory...', ( () => { console.log('dir'); this.host.next( 'source-input' ); } ) );
        this.add( 'Temporary directory...',  ( () => { console.log('dir'); this.host.next( 'temporary-input' ); } ) );
        this.add( 'Discord App Token...',  ( () => {console.log('dir');  this.host.next( 'token-input' ); } ) );
        this.add( 'Login', () => { 
            this.controller.login()
            .then( () => {
                this.host.next( 'connected' );
            }, ( err ) => {
                this.host.next( 'start', 'Login failed...' );
            } ); 
        } );
        this.add( 'Quit',() => { process.exit(); } );
    }

    private unsubscribe() {
        if( !this.subscription.closed ) {
            this.subscription.unsubscribe();
            this.subscription = new Subscription();
        }
    }
    
    protected message(): string {
        return 'Offline menu:';
    }
    
    onInit() {
        this.spinnerObservable = this.controller.state$.map( state => state.busy )
        .distinctUntilChanged()
        .map( ( busy ) => {
            if( busy ) {
                clear();
                this.spinner.start();
            } else {
                this.spinner.stop();
            }
        } );
    }
    
    onOpen(): void {
        // clear();
        console.log( 'start-view/open' );
        this.subscription.add( this.spinnerObservable.subscribe() );
    }
    
    onClose(): void {
        console.log( 'start-view/close' );
        this.spinner.stop();
        this.unsubscribe();
    }
}
