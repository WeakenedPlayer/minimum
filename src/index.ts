
//Init preference file with an unique identifier and an optional default data
/*
import { ViewHost, BotPreference, BotController } from './@modules';
import { OnlineMainView, OfflineMainView, TokenSettingView, GuildSettingView } from './views';

let pref = new BotPreference( 'com.discord-bot.weakenedplayer' );
let controller = new BotController( pref );
let host = new ViewHost();

host.add( 'online-main', new OnlineMainView( controller ) );
host.add( 'offline-main', new OfflineMainView( controller ) );
host.add( 'token-setting', new TokenSettingView( pref ) );
host.add( 'guild-setting', new GuildSettingView( pref, controller ) );
host.show$.subscribe();
host.next( 'offline-main' );
*/
import { Observable } from 'rxjs';
import { ViewHost, BotController, BotPreference } from './@modules';

import { SourceInputView, TemporaryInputView, TokenInputView, StartView } from './views';

let host = new ViewHost();
let pref = new BotPreference( 'com.discord-bot.weakenedplayer' );
let controller = new BotController( pref );

host.add( 'start', new StartView( controller ) );
host.add( 'source-input', new SourceInputView( pref ) );
host.add( 'temporary-input', new TemporaryInputView( pref ) );
host.add( 'token-input', new TokenInputView( pref ) );

let i = 0;
let s = host.show$.subscribe( ()=>{}, (err)=>{console.log(err), ()=>{
    s.unsubscribe();
}});
host.next( 'start' );
/*
import { View, ViewHost, MainView } from './host';

let host = new ViewHost();
host.register( new MainView() );
host.start();

host.goto( 'main');
import { View, ViewHost, ViewReference } from './view';
import { 
    TitleView, 
    MainView, 
    DirectorySettingView, 
    ScreenshotDirectorySettingView,
    TemporaryDirectorySettingView,
    TokenSettingView,
    LoginView,
} from './views';

let host = new ViewHost();
host.register( new TitleView() );
host.register( new MainView() );
host.register( new DirectorySettingView() );
host.register( new TokenSettingView( prefs ) );
host.register( new LoginView( bot, prefs ) );
host.register( new TemporaryDirectorySettingView( prefs ) );
host.register( new ScreenshotDirectorySettingView( prefs ) );
host.open( {id: 'title'} );

function confirmReuse(): Promise<boolean> {
    return prompt( {
        type: 'confirm',
        name: 'reuse',
        message: 'Do you want to use previous token:' + prefs.client.token,
    } ).then( ( answer ) => {
        return answer.reuse as boolean;
    } );
}

function inputToken(): Promise<string> {
    return prompt( {
        type: 'input',
        name: 'token',
        message: 'Token plz.'
    } ).then( ( answer ) => { 
        if( answer.token ) {
            console.log( answer.token );
            return Promise.resolve( answer.token );
        } else {
            clear();
            return inputToken();
        }
    } );
}

function checkToken( token: string ): Promise<void> {
    return this.bot.login( token ).then( () => {
        console.log( 'login succeeded' );
    } );
}

let token = '';
confirmReuse()
.then( ( answer ) => {
    if( !answer ) {
        return inputToken().then( token => {
            prefs.client.token = token;
            return Promise.resolve( token );
        } );
    } else {
        return Promise.resolve( prefs.client.token );
    }
} )
.then( token => {
    bot.login( token ).then( () => {
        bot.logout();
    } );
} );
*/