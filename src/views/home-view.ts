import { prompt, clear, chalk, clui, ListView, BotController, BotPreference, Item, ConstantItem, VariableItem, separator } from '../@modules';
import { Observable, Subscription } from 'rxjs';

export class HomeView extends ListView {
    private items: Item[] = [];
    private spinner = new clui.Spinner( 'Logging in...', ['◜','◠','◝','◞','◡','◟'] );
    
    constructor( private controller: BotController, private pref: BotPreference ) {
        super();
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
    
    public onInit(): void {
        this.items.push( separator );
        this.items.push( new VariableItem( ()=> 'Source directory...    (' + this.pref.directory.src + ')', () => { this.host.next( 'source-input'    ); } ) );
        this.items.push( new VariableItem( ()=> 'Temporary directory... (' + this.pref.directory.tmp + ')', () => { this.host.next( 'temporary-input' ); } ) );
        this.items.push( separator );
        this.items.push( new ConstantItem( 'Discord App...', () => { this.host.next( 'token-input' ); } ) );
        this.items.push( separator );
        this.items.push( new ConstantItem( 'Login', () => { this.login(); } ) );
        this.items.push( separator );
        this.items.push( new ConstantItem( 'Quit', () => { process.exit(); } ) );
    }
    
    protected message(): string {
        return chalk.bgRed( '[Offline]' );
    }
    
    public show( param?: any ): Promise<void> {
        clear();
        this.buildList( this.items );
        // console.log( this.items );
        return this.showAndExecute( param )
        .catch( ( err ) => {
            console.log('------------------------------------------------------------------------------------\n');
            console.log( err );
            console.log('------------------------------------------------------------------------------------\n');
        } ); 
    }
}
