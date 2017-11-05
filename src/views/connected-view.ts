import { prompt, inquirer, clear, chalk, clui, ListView, BotController } from '../@modules';
import { Subscription, Subject, Observable } from 'rxjs';

export class ConnectedView extends ListView {
    private spinner = new clui.Spinner( 'Reconnecting...', ['◜','◠','◝','◞','◡','◟'] );
    private disconnectionObservable: Observable<void> = null;
    private spinnerObservable: Observable<void> = null;
    private subscription = new Subscription();

    private unsubscribe() {
        if( !this.subscription.closed ) {
            this.subscription.unsubscribe();
            this.subscription = new Subscription();
        }
    }
    
    constructor( private controller: BotController ) {
        super();
        this.add( 'Activate/Deactivate broadcast...', () => { 
        } );
        
        this.add( 'Select channel...', () => {
        } );
        
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

    protected message(): string {
        return 'Online menu:';
    }

    onInit() {
        this.disconnectionObservable = this.controller.state$
        .map( state => !state.busy && !state.connected )
        .distinctUntilChanged()
        .map( ( disconnected ) => {
            if( disconnected ) {
                this.host.next( 'start' );
            }
        } );
        
        this.spinnerObservable = this.controller.state$
        .map( state => state.busy )
        .distinctUntilChanged()
        .map( ( busy ) => {
            if( busy ) {
                clear();
                this.spinner.start();
            } else {
                this.spinner.stop();
            }
        } );
    }

    onOpen() {
        //clear();
        this.subscription.add( this.disconnectionObservable.subscribe() );
        this.subscription.add( this.spinnerObservable.subscribe() );
    }
    
    onClose() {
        this.spinner.stop();
        this.unsubscribe();
    }
}

