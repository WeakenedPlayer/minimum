import { prompt, inquirer, clear, chalk, clui, ListView, BotController, BotPreference, Guild } from '../@modules';
import { Subscription, Subject, Observable } from 'rxjs';

export class GuildSelectView extends ListView {
    private spinner = new clui.Spinner( 'Reconnecting...', ['◜','◠','◝','◞','◡','◟'] );
    private guildObservable: Observable<void>;
    private spinnerObservable: Observable<void> = null;
    private subscription = new Subscription();

    private unsubscribe() {
        if( !this.subscription.closed ) {
            this.subscription.unsubscribe();
            this.subscription = new Subscription();
        }
    }
    
    constructor( private controller: BotController, private pref: BotPreference  ) {
        super();
        this.add( 'Logout', () => { this.controller.logout() } );
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
        return 'Online menu: ' + this.pref.guild;
    }

    onInit() {
        /*
        let disconnectObservable = this.controller
        let test = Observable.fromPromise( this.showAndExecute() )
        .takeUntil 
        this.guildObservable = this.controller.guild$.map( guilds => {
            let guild: Guild;
            this.clear();
            
            for( let id in guilds ) {
                guild = guilds[ id ];
                this.add( guild.id + ': ' + guild.name, () => {
                    this.pref.guild = guild.id;
                    this.host.next( 'connected', 'Selected: ' + guild.name );
                } );
            }
        } );
        */
    }

    public show( param?: any ): Promise<void> {
        return this.showAndExecute( param );
    }
}

