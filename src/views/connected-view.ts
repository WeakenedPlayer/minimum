import { prompt, inquirer, clear, chalk, clui, ListView, BotController } from '../@modules';
import { Subscription, Subject, Observable } from 'rxjs';

export class ConnectedView extends ListView {
    private spinner = new clui.Spinner( 'Logging in...', ['◜','◠','◝','◞','◡','◟'] );
    private subscription = new Subscription();
    
    constructor( private controller: BotController ) {
        super();
        this.add( 'Logout', () => { 
            this.controller.logout()
            .then( () => {
                this.host.next( 'start' );
            } );
        } );
        this.add( 'Quit',() => {
            this.controller.logout()
            .then( () => {
                this.unsubscribe();
                process.exit();
            } );
        } );
    }

    private unsubscribe() {
        if( !this.subscription.closed ) {
            this.subscription.unsubscribe();
            this.subscription = new Subscription();
        }
    }
    
    protected message(): string {
        return 'Online menu:';
    }
    
    onInit() {}
    onPreShow() {}
    onDestroy() {}
}

