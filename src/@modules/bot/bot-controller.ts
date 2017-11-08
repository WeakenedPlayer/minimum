import { ScreenshotBot, ScreenshotBotOption, JpegOutputOption, ClientState } from '@weakenedplayer/screenshot-bot';
import { Subscription, Observable } from 'rxjs';
import { OAuth2App, Channel, Guild } from './models';

import { BotPreference } from './bot-preference';

export class BotController {
    private bot: ScreenshotBot = new ScreenshotBot();

    private mergedObservables: Observable<any>;

    private appObservable: Observable<OAuth2App>;
    private channelObservable: Observable<{[id: string]: Channel}>;
    private guildObservable: Observable<{[id: string]: Guild}>;
    private stateObservable: Observable<ClientState>;

    get app$() { return this.appObservable; }
    get channel$() { return this.channelObservable; }
    get guild$() { return this.guildObservable; }
    get state$() { return this.stateObservable; } 

    constructor( private pref: BotPreference ) {
        this.appObservable = this.bot.app$.map( app => {
            return new OAuth2App( app.id, app.name, app.description, app.iconURL, app.botPublic );
        } );
        this.channelObservable = this.bot.textChannel$.map( channels => {
            let map: {[id: string]: Channel } = {};
            for( let id in channels ) {
                let tmp: any = channels[ id ];  // to prevent typescript error
                map[ id ] = new Channel( id, tmp.name, tmp.guild.id );
            }
            return map;
        } );
        
        this.guildObservable = this.bot.guild$.map( guilds => {
            let map: {[id: string]: Guild } = {};
            for( let id in guilds ) {
                let tmp: any = guilds[ id ];  // to prevent typescript error
                map[ id ] = new Guild( id, tmp.name );
            }
            return map;
        } );
        
        // 最後の1要素を必ず受け取れる
        this.stateObservable = this.bot.state$;
    }
    
    login(): Promise<string> {
        return this.bot.login( this.pref.client.token );
    }
    
    logout(): Promise<void> {
        return this.bot.logout();
    }
}
