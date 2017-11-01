import { prompt, clear, chalk, clui, SyncCommand, AsyncCommand, CommandMap, View, BotController } from '../@modules';

export class StartView extends View {
    private commands = new CommandMap();
    constructor( private controller: BotController ) {
        super();
        this.commands.add( 'Source directory...', new SyncCommand( () => { this.host.next( 'source-input' ); } ) );
        this.commands.add( 'Temporary directory...', new SyncCommand( () => { this.host.next( 'temporary-input' ); } ) );
        this.commands.add( 'Discord App Token...', new SyncCommand( () => { this.host.next( 'token-input' ); } ) );
        this.commands.add( 'Login', new AsyncCommand( () => {
            let spinner = new clui.Spinner( 'Logging in...', ['◜','◠','◝','◞','◡','◟'] );
            clear();
            spinner.start();
            return this.controller.login()
            .then( () => {
                spinner.stop();
                this.host.next( 'online' );
            }, ( err ) => {
                spinner.stop();
                this.host.next( 'start', err );
            } );
        } ) );
        // error?
        this.commands.add( 'Quit', new SyncCommand( () => {
            this.host.close();
            process.exit();
        } ) );
    }
    show( param?: any ): Promise<void> {
        clear();
        if( param ) {
            console.log( param );
        }
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

