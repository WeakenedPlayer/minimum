import { ScreenshotBot, JpegConverterOption, ClientState } from '@weakenedplayer/screenshot-bot';
import { Subscription, Observable, Subject } from 'rxjs';
import { OAuth2App, Channel, Guild } from './models';

import { BotPreference } from './bot-preference';

export class BotController {
    private bot: ScreenshotBot = new ScreenshotBot();

    private appObservable: Observable<OAuth2App>;
    private channelObservable: Observable<{[id: string]: Channel}>;
    private guildObservable: Observable<{[id: string]: Guild}>;
    private stateObservable: Observable<ClientState>;

    get app$() { return this.appObservable; }
    get channel$() { return this.channelObservable; }
    get guild$() { return this.guildObservable; }
    get state$() { return this.stateObservable; } 
    
    private subscription: Subscription = new Subscription();
    
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
        
        this.stateObservable = this.bot.state$.shareReplay();
        
        // configure(initial)
        this.subscription = this.bot.post$.subscribe();
        this.bot.filter = this.pref.directory.src;
        this.bot.option = new JpegConverterOption( this.pref.directory.tmp );
        
        this.bot.post$.subscribe();
    }
    
    private update() {
        this.bot.channelId = this.pref.client.channel.id;
        this.bot.filter = this.pref.directory.src;
        this.bot.option = new JpegConverterOption( this.pref.directory.tmp );
    }
    
    login(): Promise<string> {
        let token = this.pref.client.app.token;
        if( token ) {
            return this.bot.login( this.pref.client.app.token );
        } else {
            return Promise.reject( 'Token is empty. ');
        }
    }
    
    logout(): Promise<void> {
        return this.bot.logout();
    }
    
    start(): void {
        this.update();
        this.bot.startPosting();
    }
    
    stop(): void {
        this.bot.stopPostiong();
    }
    
    setChannelId( channelId: string ) {
        this.bot.channelId = channelId;
    }
}
