import { prompt, inquirer } from './cli';
import { View } from './view';

export abstract class ListView extends View {
    static MAX_PAGE_SIZE: number = 10;
    private nameList: string[] = [];
    private commandMap: { [ name:string ]: () => void } = {};

    protected preShow(): Promise<void> {
        return Promise.resolve();
    }
    protected abstract message(): string;
    
    protected addMenu( name: string, command: () => void ) {
        this.commandMap[ name ] = () => { command() };
        this.nameList.push( name );
    }
    
    protected clearMenu(): void {
        this.nameList = [];
        this.commandMap = {};
    }
    
    show(): Promise<void> {
        return this.preShow()
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
