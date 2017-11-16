import { prompt, inquirer, clear, chalk, clui, ListView, BotController, BotPreference, Channel, Guild } from '../@modules';
import { Subscription, Subject, Observable } from 'rxjs';

export class ChannelSelectView extends ListView {
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
    
    private addChannelCommand( channel: Channel, guild: Guild ) {
        this.add( channel.id + ': ' + channel.name, () => {
            // TODO: もう少しまとめる
            this.pref.client.channel.id   = channel.id;
            this.pref.client.channel.name = channel.name;
            this.pref.client.channel.guildId = channel.guildId;
            this.pref.client.guild.id = guild.id;
            this.pref.client.guild.name = guild.name;
            
            this.controller.setChannelId( channel.id );
            this.host.next( 'connected' );
        } );
    }
    
    private createMenu( guild: Guild ): Promise<void> {
        this.clear();
        this.addSeparator();
        this.add( 'Back', () => { this.host.back() } );
        this.addSeparator();
        return this.controller.channel$.take(1).toPromise()
        .then( channels => {
            for( let id in channels ) {
                let channel = channels[ id ];
                if( channel.guildId === guild.id ) {
                    this.addChannelCommand( channels[ id ], guild );
                } 
            }
        } );
    }
        
    onInit() {
    }

    public show( param?: any ): Promise<void> {
        if( param && param.guild ) {
            clear();
            
            return this.createMenu( param.guild )
            .then( () => {
                return this.showAndExecute( param );
            } ); 
        } else {
            this.host.next( 'connected' );
            return Promise.resolve();
        }
    }
}

