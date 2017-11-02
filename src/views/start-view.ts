import { prompt, clear, chalk, clui, SyncCommand, AsyncCommand, CommandMap, View, BotController } from '../@modules';


export class Menu {
    private names: string[] = [];
    private commandMap: { [ name: string ]: ( param?: any ) => void } = {};
    
    constructor(){}
    
    add( name: string, command: ( param?: any ) => void ) {
        if( name && !this.commandMap[ name ] ) {
            this.names.push( name );
        }
        this.commandMap[ name ] = command;
    }
    
    clear() {
        this.names = [];
        this.commandMap = {};
    }

    get list(): string[] {
        return this.names;
    }
    
    execute( name: string, param?: any ): void {
        let command = this.commandMap[ name ];
        if( command ) {
            command( param );
        }
    }
}


/*        this.commands.add( 'Login', new AsyncCommand( () => {
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
    }*/
export class StartView extends View {
    private commands = new Menu();
    constructor( private controller: BotController ) {
        super();
        this.commands.add( 'Source directory...', ( () => { this.host.next( 'source-input' ); } ) );
        this.commands.add( 'Temporary directory...',  ( () => { this.host.next( 'temporary-input' ); } ) );
        this.commands.add( 'Discord App Token...',  ( () => { this.host.next( 'token-input' ); } ) );
    }
    show( param?: any ): void {
        clear();
        if( param ) {
            console.log( param );
        }
        prompt( {
            type: 'list',
            name: 'choice',
            message: 'Select Guild',
            choices: this.commands.list
        } ).then( ( answer: any ) => {
            this.commands.execute( answer.choice );
        } );
    }
}

