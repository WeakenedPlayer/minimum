import { prompt, inquirer, clear, chalk, clui, ListView, BotController } from '../@modules';
import { Subscription, Subject, Observable } from 'rxjs';

export class ConnectedView extends ListView {
    private spinner = new clui.Spinner( 'Reconnecting...', ['◜','◠','◝','◞','◡','◟'] );
    private disconnected$: Observable<boolean> = null;
    private input$: Observable<void>;
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
        this.add( 'Activate/Deactivate broadcast...', () => { } );
        this.add( 'Select channel...', () => { this.host.next( 'guild-select' ) } );
        this.add( 'Logout', () => this.logout() );
        this.add( 'Quit',() => {
            this.unsubscribe();
            this.controller.logout()
            .then( () => {
                process.exit();
            } );
        } );
    }

    private logout() {
        this.controller.logout().then( () => {
            this.host.next( 'home' );
        } );
    }
    
    protected message(): string {
        return 'Online menu:';
    }

    onInit() {
        
        this.disconnected$ = this.controller.state$
        .map( state => !state.busy && !state.connected )
        .distinctUntilChanged()
        .filter( disconnected => disconnected )
        .publish()
        .refCount();
        
        let userInput$ = Observable.of(1).flatMap( () => {
            return Observable.fromPromise( this.showPrompt() );
        } )
        .takeUntil( this.disconnected$ )
        .take( 1 )
        .map( ( command ) => {
            this.execute( command );
        } );
        

        let postDisconnection$ = this.disconnected$
        .take( 1 )
        .map( () => {
            this.host.next( 'home', 'Disconnected ;_;' );
        } );
        
        this.input$ = Observable.merge( userInput$, postDisconnection$ );
    }

    public show( param?: any): Promise<void> {
        //        return this.showAndExecute( param );
        return this.input$.toPromise();
    }
}

