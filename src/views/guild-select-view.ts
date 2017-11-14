import { prompt, inquirer, clear, chalk, clui, ListView, BotController, BotPreference, Guild } from '../@modules';
import { Subscription, Subject, Observable } from 'rxjs';

export class GuildSelectView extends ListView {
    
    constructor( private controller: BotController, private pref: BotPreference  ) {
        super();
    }

    protected message(): string {
        return 'Current guild/channel: ' + this.pref.client.guild.name + '/' + this.pref.client.channel.name + '\n    Select guild...';
    }

    private addGuildCommand( guild: Guild ): void {
        this.add( guild.id + ': ' + guild.name, () => {
            this.host.next( 'channel-select', { guild: guild } );
        } );
    }
    
    private createMenu(): Promise<void> {
        this.clear();
        this.addSeparator();
        this.add( 'Back', () => { this.host.next( 'connected' ) } );
        this.addSeparator();
        
        return this.controller.guild$.take(1).toPromise()
        .then( guilds => {
            for( let id in guilds ) {
                this.addGuildCommand( guilds[ id ] );
            }
        } );
    }
        
    onInit() {}

    public show( param?: any ): Promise<void> {
       // clear();
        return this.createMenu()
        .then( () => {
            return this.showAndExecute( param );
        } );
    }
}

