import { prompt, inquirer, clear, chalk, clui, View, BotController } from '../@modules';
import { Subscription, Subject, Observable } from 'rxjs';
/*
 * 
 * 
            inquirer.ui.close();
            this.subscription.unsubscribe();
            this.host.next( 'start', 'Disconnected from Discord.' );
 * */
export class OnlineView extends View {
    
    constructor( private controller: BotController ) {
        super();
    }

    private logout(): Promise<void> {
        return this.controller.logout()
        .then( () => {
            this.host.next( 'start' );
        } );
    }

    show( param?: any ) {
        clear();
    }
}

