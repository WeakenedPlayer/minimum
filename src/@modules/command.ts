export abstract class Command {
    public abstract execute( param?: any ): Promise<void>;
}

export class AsyncCommand extends Command {
    constructor( private fnc: ( param?: any ) => Promise<void> ) {
        super();
    }
    public execute( param?: any ): Promise<void> {
        return this.fnc( param );
    }
}

export class SyncCommand extends Command {
    constructor( private fnc: ( param?: any ) => void ) {
        super();
    }
    public execute( param?: any ): Promise<void> {
        this.fnc( param );
        return Promise.resolve();
    }
}

export class CommandMap {
    private names: string[] = [];
    private commandMap: { [ name: string ]: Command } = {};
    
    constructor(){}
    
    add( name: string, command: Command ) {
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
    
    execute( name: string, param?: any ): Promise<void> {
        let command = this.commandMap[ name ];
        if( command ) {
            return command.execute( param );
        } else {
            console.log( '?????' );
            return Promise.resolve();
        }
    }
}
