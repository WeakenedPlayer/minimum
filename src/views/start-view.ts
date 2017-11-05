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
    
    onInit() {
    }
    
    onOpen(): void {
        clear();
    }
    
    onClose(): void {
        // console.log( 'start-view/close' );
        //  this.spinner.stop();
    }
}
