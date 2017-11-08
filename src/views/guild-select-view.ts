import { prompt, inquirer, clear, chalk, clui, ListView, BotController, BotPreference, Guild } from '../@modules';
import { Subscription, Subject, Observable } from 'rxjs';

export class GuildSelectView extends ListView {
    
    constructor( private controller: BotController, private pref: BotPreference  ) {
        super();
    }

    protected message(): string {
        return 'Select guild...\n Current guild: ' + this.pref.client.guild.name;
    }

    private addGuildCommand( guild: Guild ) {
        this.add( guild.id + ': ' + guild.name, () => {
            this.pref.client.guild.id = guild.id;
            this.pref.client.guild.name = guild.name;
            this.host.next( 'channel-select', { guildId: guild.id });
        } );
    }
    
    private createMenu(): Promise<void> {
        this.clear();
        this.add( 'Back', () => { this.host.next( 'connected' ) } );
        this.add( new inquirer.Separator(), ()=>{} );
        return this.controller.guild$.take(1).toPromise()
        .then( guilds => {
            for( let id in guilds ) {
                this.addGuildCommand( guilds[ id ] );
            }
        } );
    }
        
    onInit() {
    }

    public show( param?: any ): Promise<void> {
        clear();
        return this.createMenu()
        .then( () => {
            return this.showAndExecute();
        } );
    }
}

