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
    
    onInit() {/*
        this.busyObservable = this.controller.state$.map( state => state.busy )
        .distinctUntilChanged()
        .publish()
        .refCount();
        
        this.spinnerObservable = this.controller.state$.map( state => state.busy )
        .map( (busy) => { console.log( busy); return busy;} )
        .filter( busy => busy )
        .flatMap( ( busy ) => {
            // busy になったら Spinnerを開始し、busyでなくなったら止めるようにする。
            console.log( 'start' );
            this.spinner.start();
            return this.busyObservable
            .filter( busy => !busy )
            .map( () => {
                console.log( 'stop' );
                this.spinner.stop();
            } );
        } );*/
        
        this.spinnerObservable = this.controller.state$
        .map( (state) => { console.log( state); } )
    }
    
    onOpen(): void {
        // clear();
        console.log( 'start-view/open' );
        this.subscription.add( this.spinnerObservable.subscribe() );
    }
    
    onClose(): void {
        // console.log( 'start-view/close' );
        this.spinner.stop();
        this.unsubscribe();
    }
}
