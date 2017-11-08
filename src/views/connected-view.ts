import { prompt, inquirer, clear, chalk, clui, ListView, BotController } from '../@modules';
import { Subscription, Subject, Observable } from 'rxjs';

// 不具合事例…画面が重なることが問題。→画面の遷移を禁止できれば良い

export class ConnectedView extends ListView {
    private spinner = new clui.Spinner( 'Reconnecting...', ['◜','◠','◝','◞','◡','◟'] );
    private disconnected$: Observable<boolean> = null;
    private postDisconnection$: Observable<void> = null;
    private input$: Observable<void>;
    private spinner$: Observable<void> = null;
    private subscription = new Subscription();
    
    constructor( private controller: BotController ) {
        super();
        this.add( 'Activate/Deactivate broadcast...', () => { } );
        this.add( 'Select channel...', () => { this.host.next( 'guild-select' ) } );
        this.add( 'Logout', () => {
            this.controller.logout()
            .then( () => {
                this.host.next( 'home' );
            } );            
        } );
        this.add( 'Quit',() => {
            this.controller.logout()
            .then( () => {
                process.exit();
            } );
        } );
    }

    protected message(): string {
        return 'Online menu:';
    }

    onInit() {}
    
    public show( param?: any): Promise<void> {
        let command: string;
        clear();
        if( param && param.message ) {
            console.log( param.message );
        }
        return this.showPrompt()
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

