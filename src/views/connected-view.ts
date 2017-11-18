import { prompt, inquirer, clear, chalk, clui, ListView, BotController, BotPreference, Item, VariableItem, ConstantItem, separator } from '../@modules';
import { Subscription, Subject, Observable } from 'rxjs';

export class ConnectedView extends ListView {
    private spinner = new clui.Spinner( 'Reconnecting...', ['◜','◠','◝','◞','◡','◟'] );
    private isActive: boolean = false;
    private items: Item[] = [];
    
    constructor( private controller: BotController, private pref: BotPreference ) {
        super();
    }
    
    public onInit(){}
    
    private toggle(): void {
        if( this.isActive ) {
            this.controller.stop();
            this.isActive = false;
        } else {
            this.controller.start();
            this.isActive = true;
        }
        this.host.reopen();
    }
    
    private quit(): void {
        this.controller.logout()
        .then( () => {
            process.exit();
        } );
    }
    
    private logout(): void {
        this.controller.logout()
        .then( () => {
            this.host.next( 'home' );
        }, (err) => {
            this.host.reopen();
        } );
    }

    protected message( param?: string): string {
        return chalk.bgBlue( '[Online/' + ( this.isActive ? 'Active' : 'Inactive' )+'] ' + ( param ? param : '' ) );
    }

    private createMenu() {
        this.items = [];
        this.items.push( separator );
        this.items.push( new VariableItem( ()=>{ 
            if( this.isActive ) {
                return 'Deactivate Broadcast';
            } else {
                return 'Activate Broadcast';
            }
        }, () => { this.toggle() } ) );
        this.items.push( separator );
        this.items.push( new VariableItem( () => {
            let guild = this.pref.client.guild;
            let channel = this.pref.client.channel;
            if( guild && guild.name && channel && channel.name ) {
                return 'Select channel... (' + this.pref.client.guild.name + '/' + this.pref.client.channel.name + ')';
            } else {
                return 'Select channel...';
            }
        }, () => { this.host.next( 'guild-select' ) } ) );
        this.items.push( separator );
        this.items.push( new ConstantItem( 'Logout', () => { this.logout() } ) );
        this.items.push( separator );
        this.items.push( new ConstantItem( 'Quit', () => { this.quit() } ) );
    }
    
    public show( param?: any): Promise<void> {
        let command: string;
        clear();
        this.createMenu();
        this.buildList( this.items );
        return this.showPrompt( param )
        .then( result => {
            command = result;
            return this.controller.state$.take(1).toPromise();
        } )
        .then( state => {
            if( state.busy ) {
                this.host.reopen( 'Client is busy...Try again.' );
            } else if( !state.connected ) {
                this.host.next( 'home', 'Disconnected...' )
            } else {
                this.execute( command );
            }
        } );
    }
}

