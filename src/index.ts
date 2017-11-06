import { Observable } from 'rxjs';
import { ViewHost, BotController, BotPreference } from './@modules';

import { SourceInputView, TemporaryInputView, TokenInputView, HomeView, ConnectedView, GuildSelectView } from './views';

let host = new ViewHost();
let pref = new BotPreference( 'com.discord-bot.weakenedplayer' );
let controller = new BotController( pref );

host.add( 'home', new HomeView( controller ) );
host.add( 'connected', new ConnectedView( controller ) );
host.add( 'source-input', new SourceInputView( pref ) );
host.add( 'temporary-input', new TemporaryInputView( pref ) );
host.add( 'token-input', new TokenInputView( pref ) );
host.add( 'guild-select', new GuildSelectView( controller, pref ) );

host.start();
host.next( 'home' );
