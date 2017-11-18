import { prompt, inquirer, clear, chalk, clui, ListView, BotController, BotPreference, Guild, Item, ConstantItem, separator } from '../@modules';
import { Subscription, Subject, Observable } from 'rxjs';

export class GuildSelectView extends ListView {
    private guilds: Guild[] = [];
    private items: Item[] = [];
    
    constructor( private controller: BotController, private pref: BotPreference  ) {
        super();
    }

    protected message(): string {
        return 'Current guild/channel: ' + this.pref.client.guild.name + '/' + this.pref.client.channel.name + '\n    Select guild...';
    }

    private addGuildCommand( guild: Guild ): void {
        this.items.push( new ConstantItem( guild.id + ': ' + guild.name, () => {
            this.pref.client.guild.tmpId = guild.id;
            this.pref.client.guild.tmpName = guild.name;
            this.host.next( 'channel-select' );
        } ) );
    }
    
    private createMenu(): Promise<void> {
        this.items = [];
        this.items.push( separator );
        this.items.push( new ConstantItem( 'Back', () => { this.host.next( 'connected' ) } ) );
        this.items.push( separator );
        
        return this.controller.guild$.take(1).toPromise()
        .then( guilds => {
            for( let id in guilds ) {
                let guild = guilds[ id ];
                this.addGuildCommand( guild );;
            }
            this.buildList( this.items );
        } );
    }
        
    onInit() {}

    public show( param?: any ): Promise<void> {
        clear();
        return this.createMenu()
        .then( () => {
            return this.showAndExecute( param );
        } );
    }
}
