import { prompt, clear, chalk, clui, SyncCommand, AsyncCommand, CommandMap, View, BotController } from '../@modules';

export class StartView extends View {
    private commands = new CommandMap();
    constructor( private controller: BotController ) {
        super();
        this.commands.add( 'Source directory...', new SyncCommand( () => { this.host.next( 'source-input' ); } ) );
        this.commands.add( 'Temporary directory...', new SyncCommand( () => { this.host.next( 'temporary-input' ); } ) );
        this.commands.add( 'Discord App Token...', new SyncCommand( () => { this.host.next( 'token-input' ); } ) );
        this.commands.add( 'Logout', new AsyncCommand( () => {
            return this.controller.logout()
            .then( () => {
                this.host.next( 'start' );
            } );
        } ) );
        this.commands.add( 'Login', new AsyncCommand( () => {
            let spinner = new clui.Spinner( 'Logging in...', ['◜','◠','◝','◞','◡','◟'] );
            spinner.start();
            return this.controller.login()
            .then( () => {
                spinner.stop();
                this.host.next( 'start' );
            } );
        } ) );
        // error?
        this.commands.add( 'Quit', new SyncCommand( () => {
            this.host.close();
            process.exit();
        } ) );
    }
    show( param?: any ): Promise<void> {
        return prompt( {
            type: 'list',
            name: 'choice',
            message: 'Select Guild',
            choices: this.commands.list
        } ).then( ( answer: any ) => {
            return this.commands.execute( answer.choice );
        } );
    }
}

