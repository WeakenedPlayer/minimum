import { prompt, inquirer, clear, chalk, clui, ListView, BotController, BotPreference, Channel } from '../@modules';
import { Subscription, Subject, Observable } from 'rxjs';

export class ChannelSelectView extends ListView {
    constructor( private controller: BotController, private pref: BotPreference  ) {
        super();
    }

    protected message(): string {
        return 'Select channel...\n Current channel: ' + this.pref.client.channel.name;
    }

    private clearChannel() {
        this.pref.client.channel.id   = '';
        this.pref.client.channel.name = '';
        this.pref.client.channel.guildId = '';
    }
    
    private addChannelCommand( channel: Channel ) {
        this.add( channel.id + ': ' + channel.name, () => {
            this.pref.client.channel.id   = channel.id;
            this.pref.client.channel.name = channel.name;
            this.pref.client.channel.guildId = channel.guildId;
            this.host.next( 'connected' );
        } );
    }
    
    private createMenu( guildId: string ): Promise<void> {
        this.clear();
        this.add( 'Back', () => { this.host.back() } );
        this.add( new inquirer.Separator(), ()=>{} );
        return this.controller.channel$.take(1).toPromise()
        .then( channels => {
            for( let id in channels ) {
                let channel = channels[ id ];
                if( channel.guildId === guildId ) {
                    this.addChannelCommand( channels[ id ] );
                } 
            }
        } );
    }
        
    onInit() {
    }

    public show( param?: any ): Promise<void> {
        if( param && param.guildId ) {
            clear();
            
            // guildId が変わっていたら、既に選択していたのを削除する
            if( param.guildId !== this.pref.client.channel.guildId ) {
                this.clearChannel();
            }
            
            return this.createMenu( param.guildId )
            .then( () => {
                return this.showAndExecute( param );
            } ); 
        } else {
            this.host.next( 'connected' );
            return Promise.resolve();
        }
    }
}

