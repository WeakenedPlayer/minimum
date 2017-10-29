export class Command {
    constructor( private fnc: ( param: any ) => Promise<void> ) {}
    public execute( param: any ): Promise<void> {
        return this.fnc( param );
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
    
    execute( name: string, param?: any ) {
        let command = this.commandMap[ name ];
        if( command ) {
            return command.execute( param );
        }
    }
}
