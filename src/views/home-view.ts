import { prompt, clear, chalk, clui, ListView, BotController } from '../@modules';
import { Observable, Subscription } from 'rxjs';

export class HomeView extends ListView {
    private spinner = new clui.Spinner( 'Logging in...', ['◜','◠','◝','◞','◡','◟'] );
    
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
            this.spinner.stop();
            this.host.next( 'connected', chalk.bgBlue('Login Succeed.') );
        }, ( err ) => {
            this.spinner.stop();
            this.host.reopen( { message: chalk.bgRed('Login failed.') } );
        } );
    }
    
    protected message(): string {
        return 'Offline menu:';
    }
    
    public onInit(): void {}
    
    public show( param?: any ): Promise<void> {
        clear();
        if( param && param.message ) {
            console.log( param.message );
        }
        return this.showAndExecute( param )
        .catch( ( err ) => {
            console.log('------------------------------------------------------------------------------------\n');
            console.log( err );
            console.log('------------------------------------------------------------------------------------\n');
        } ); 
    }
}
