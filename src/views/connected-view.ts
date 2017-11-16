import { prompt, inquirer, clear, chalk, clui, ListView, BotController } from '../@modules';
import { Subscription, Subject, Observable } from 'rxjs';

// 不具合事例…画面が重なることが問題。→画面の遷移を禁止できれば良い

export class ConnectedView extends ListView {
    private spinner = new clui.Spinner( 'Reconnecting...', ['◜','◠','◝','◞','◡','◟'] );
    private isActive: boolean = false;
    
    constructor( private controller: BotController ) {
        super();
        this.add( 'Activate/Deactivate broadcast...', () => { this.toggle() } );
        this.add( 'Select channel...', () => { this.host.next( 'guild-select' ) } );
        this.addSeparator();
        this.add( 'Logout', () => { this.logout() } );
        this.addSeparator();
        this.add( 'Quit',() => { this.quit() } );
    }
    
    private toggle(): void {
        let message = '';
        
        if( this.isActive ) {
            message = 'Inactive';
            this.controller.stop();
            this.isActive = false;
        } else {
            message = 'Active';
            this.controller.start();
            this.isActive = true;
        }
        
        this.host.reopen( { message: message } );
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
        } );      
    }

    protected message(): string {
        return 'Online menu:';
    }

    onInit() {}
    
    public show( param?: any): Promise<void> {
        let command: string;
       clear();
        return this.showPrompt( param )
        .then( result => {
            command = result;
            return this.controller.state$.take(1).toPromise();
        } )
        .then( state => {
            if( state.busy ) {
                this.host.reopen( { message: 'Client is busy...Try again.' } );
            } else if( !state.connected ) {
                this.host.next( 'home', { message: 'Disconnected...' })
            } else {
                this.execute( command );
            }
        } );
    }
}

