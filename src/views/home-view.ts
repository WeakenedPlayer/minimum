import { prompt, clear, chalk, clui, ListView, BotController } from '../@modules';
import { Observable, Subscription } from 'rxjs';

export class HomeView extends ListView {
    private spinner = new clui.Spinner( 'Logging in...', ['◜','◠','◝','◞','◡','◟'] );
    private spinnerObservable: Observable<void>;
    private busyObservable: Observable<boolean>;
    private subscription = new Subscription();
    
    constructor( private controller: BotController ) {
        super();
        this.add( 'Source directory...', ( () => { this.host.next( 'source-input' ); } ) );
        this.add( 'Temporary directory...',  ( () => {this.host.next( 'temporary-input' ); } ) );
        this.add( 'Discord App Token...',  ( () => { this.host.next( 'token-input' ); } ) );
        this.add( 'Login', () => { this.login(); } );
        this.add( 'Quit',() => { process.exit(); } );
    }

    private login() {
        this.spinner.start();
        this.controller.login()
        .then( () => {
            console.log( 'connected' );
            this.spinner.stop();
            this.host.next( 'connected' );
        }, ( err ) => {
            console.log( 'failed' );
            this.spinner.stop();
            this.host.reopen( chalk.bgRed('Login failed.}\n') );
        } ); 
    }
    
    protected message(): string {
        return 'Offline menu:';
    }
    
    public onInit(): void {}
    public show( param?: any ): Promise<void> {
        // clear();
        return this.showAndExecute( param )
        .catch( ( err ) => {
            this.host.reopen( err );
        } ); 
    }
}
