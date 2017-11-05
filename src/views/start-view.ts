import { prompt, clear, chalk, clui, ListView, BotController } from '../@modules';
import { Observable, Subscription } from 'rxjs';

export class StartView extends ListView {
    private spinner = new clui.Spinner( 'Logging in...', ['◜','◠','◝','◞','◡','◟'] );
    private spinnerObservable: Observable<void>;
    private loggedInObservable: Observable<void>;
    private subscription = new Subscription();
    
    constructor( private controller: BotController ) {
        super();
        this.add( 'Source directory...', ( () => { this.host.next( 'source-input' ); } ) );
        this.add( 'Temporary directory...',  ( () => { this.host.next( 'temporary-input' ); } ) );
        this.add( 'Discord App Token...',  ( () => { this.host.next( 'token-input' ); } ) );
        this.add( 'Login', () => { this.controller.login(); } );
        this.add( 'Quit',() => { process.exit(); } );
    }
    
    protected onPreShow() {
        this.subscription.add( this.spinnerObservable.subscribe() );
        this.subscription.add( this.loggedInObservable.subscribe() );
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
        
        this.loggedInObservable = this.controller.state$
        .map( state => state.connected )
        .distinctUntilChanged()
        .map( connected => {
            console.log( connected );
            if( connected ) {
                this.host.next( 'connected' );
                this.subscription.unsubscribe();
            }
        } );
    }

    

    onDestroy() {
        if( !this.subscription.closed ) {
            this.subscription.unsubscribe();
        }
    }
    
    protected message(): string {
        return 'Offline menu:';
    }
}
