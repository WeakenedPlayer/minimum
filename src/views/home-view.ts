import { prompt, clear, chalk, clui, ListView, BotController, BotPreference, Item, ConstantItem, VariableItem, separator, OAuth2App } from '../@modules';
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
            this.host.next( 'connected', chalk.bgBlue('Login Succeeded.') );
        }, ( err ) => {
            this.spinner.stop();
            this.host.reopen( chalk.bgRed('Login failed.' ) );
        } );
    }
    
    public onInit(): void {}
    
    private createMenu() {
        let src = this.pref.directory.src;
        let tmp = this.pref.directory.tmp;
        
        this.items = [];
        this.items.push( separator );
        this.items.push( new ConstantItem( 'Login', () => { this.login(); } ) );
        this.items.push( separator );
        this.items.push( new VariableItem( ()=> 'Source directory...    ' + ( src ? '(' + src + ')' : '' ), () => { this.host.next( 'source-input'    ); } ) );
        this.items.push( new VariableItem( ()=> 'Temporary directory... ' + ( tmp ? '(' + tmp + ')' : '' ), () => { this.host.next( 'temporary-input' ); } ) );
        this.items.push( separator );
        this.items.push( new ConstantItem( 'Discord token...' , () => { this.host.next( 'token-input' ); } ) );
        this.items.push( separator );
        this.items.push( new ConstantItem( 'Quit', () => { process.exit(); } ) );
    }
    
    protected message( param?: string ): string {
        return chalk.bgRed( '[Offline] ' + ( param ? param : '' ) );
    }
    
    public show( param?: any ): Promise<void> {
        clear();
        this.createMenu();
        this.buildList( this.items );
        return this.showAndExecute( param )
        .catch( ( err ) => {
            console.log('------------------------------------------------------------------------------------\n');
            console.log( err );
            console.log('------------------------------------------------------------------------------------\n');
        } ); 
    }
}
