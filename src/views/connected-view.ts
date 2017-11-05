import { prompt, inquirer, clear, chalk, clui, ListView, BotController } from '../@modules';
import { Subscription, Subject, Observable } from 'rxjs';

export class ConnectedView extends ListView {
    private spinner = new clui.Spinner( 'Logging in...', ['◜','◠','◝','◞','◡','◟'] );
    private connectionObservable: Observable<void>;
    private subscription = new Subscription();
    
    constructor( private controller: BotController ) {
        super();
        this.add( 'Logout', () => { this.controller.logout(); } );
        this.add( 'Quit',() => {
            this.controller.logout()
            .then( () => {
                process.exit();
            } );
        } );
    }
    
    protected onPreShow() {
        this.subscription.add( this.connectionObservable.subscribe() );
    }
    
    protected message(): string {
        return 'Online menu:';
    }

    onInit() {
        this.connectionObservable = this.controller.state$
        .map( state => state.connected )
        .distinctUntilChanged()
        .map( ( connected ) => {
            if( !connected ) {
                this.subscription.unsubscribe();
                this.host.next( 'start' );
            }
        } );
    }
    
    onDestroy() {
        if( !this.subscription.closed ) {
            this.subscription.unsubscribe();
        }
    }
}

