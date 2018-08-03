import { prompt, inquirer } from './cli';
import { View } from './view';
import { ViewHost } from './view-host';

export abstract class ListView extends View {
    static MAX_PAGE_SIZE: number = 10;
    private nameList: string[] = [];
    private commandMap: { [ name:string ]: () => void } = {};

    protected abstract preShow( host: ViewHost ): Promise<void>;
    protected abstract message(): string;
    
    protected addMenu( name: string, command: () => void ) {
        this.commandMap[ name ] = () => { command() };
        this.nameList.push( name );
    }
    
    protected clearMenu(): void {
        this.nameList = [];
        this.commandMap = {};
    }
    
    show( host: ViewHost ): Promise<void> {
        this.clearMenu();
        return this.preShow( host )
        .then( () => {
            return inquirer.prompt( {
                type: 'list',
                name: 'chosen',
                choices: this.nameList,
                message: this.message(),
                pageSize: Math.min( this.nameList.length, ListView.MAX_PAGE_SIZE )
            } );
        } ).then( answer => {
            let command = this.commandMap[ answer[ 'chosen' ] ];
            if( command ) {
                command();
            }
        } );
    }
}
