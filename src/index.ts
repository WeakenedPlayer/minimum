const SharpDlls = require( './sharp-dlls' );

import { Observable } from 'rxjs';
import { ViewHost, BotController, createPreference } from './@modules';
import { SourceInputView, TemporaryInputView, TokenInputView, HomeView, ConnectedView, GuildSelectView, ChannelSelectView } from './views';

let host = new ViewHost();
let pref = createPreference( 'com.discord-bot.weakenedplayer' );

// TODO: ScreenshotBotのパラメータも変更できるようにする。(ファイル追加の検知、Jpeg変換のリトライ条件がマシンによって差が出るため)
let controller = new BotController( pref );

host.add( 'home', new HomeView( controller, pref ) );
host.add( 'connected', new ConnectedView( controller, pref ) );
host.add( 'source-input', new SourceInputView( pref ) );
host.add( 'temporary-input', new TemporaryInputView( pref ) );
host.add( 'token-input', new TokenInputView( pref ) );
host.add( 'guild-select', new GuildSelectView( controller, pref ) );
host.add( 'channel-select', new ChannelSelectView( controller, pref ) );

host.start();
host.next( 'home' );
