import { prompt, clear, chalk, clui, ListView, BotController } from '../@modules';

export class StartView extends ListView {
    constructor( private controller: BotController ) {
        super();
        this.add( 'Source directory...', ( () => { this.host.next( 'source-input' ); } ) );
        this.add( 'Temporary directory...',  ( () => { this.host.next( 'temporary-input' ); } ) );
        this.add( 'Discord App Token...',  ( () => { this.host.next( 'token-input' ); } ) );
        this.add( 'Login', () => { this.controller.login(); } );
        this.add( 'Quit',() => { process.exit(); } );
    }
    protected message(): string {
        return 'Offline menu:';
    }
}
