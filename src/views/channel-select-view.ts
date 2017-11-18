import { prompt, inquirer, clear, chalk, clui, ListView, BotController, BotPreference, Channel, Guild, Item, ConstantItem, separator } from '../@modules';
import { Subscription, Subject, Observable } from 'rxjs';

export class ChannelSelectView extends ListView {
    private channels: Channel[] = [];
    private items: Item[] = [];

    constructor( private controller: BotController, private pref: BotPreference  ) {
        super();
    }

    protected message(): string {
        return 'Current guild/channel: ' + this.pref.client.guild.name + '/' + this.pref.client.channel.name + '\n    Select channel...';
    }

    private clearChannel() {
        this.pref.client.channel.id   = '';
        this.pref.client.channel.name = '';
        this.pref.client.channel.guildId = '';
    }
    
    private addChannelCommand( channel: Channel ) {
        this.items.push( new ConstantItem( channel.id + ': ' + channel.name, () => {
            // Memo: 手抜きして色々詰め込んでいる。規模を大きくするなら、設定機能は外部に持たせた方が良い。
            this.pref.client.channel.id   = channel.id;
            this.pref.client.channel.name = channel.name;
            this.pref.client.channel.guildId = channel.guildId;

            this.pref.client.guild.id = this.pref.client.guild.tmpId;
            this.pref.client.guild.name = this.pref.client.guild.tmpName;
            
            this.controller.setChannelId( channel.id );
            this.host.next( 'connected' );
        } ) );
    }
    
    private createMenu(): Promise<void> {
        this.items = [];
        this.items.push( separator );
        this.items.push( new ConstantItem( 'Back', () => { this.host.back() } ) );
        this.items.push( separator );
        
        let guildId = this.pref.client.guild.tmpId;
        return this.controller.channel$.take(1).toPromise()
        .then( channels => {
            for( let id in channels ) {
                let channel = channels[ id ];
                if( channel.guildId === guildId ) {
                    this.addChannelCommand( channels[ id ] );
                } 
            }
            this.buildList( this.items );
        } );
    }
        
    onInit() {}

    public show( param?: string ): Promise<void> {
        clear();
        this.buildList( this.items );
        return this.createMenu()
        .then( () => {
            return this.showAndExecute( param );
        } );
    }
}

