import { prompt, inquirer } from './cli';
import { View } from './view';
import { Item } from './item';

export abstract class ListView extends View {
    static MAX_PAGE_SIZE: number = 10;
    private nameList: string[] = [];
    private commandMap: { [ name:string ]: () => void } = {};
    
    constructor() { super(); }
    protected abstract message(): string;
    
    public buildList( items: Item[] ): void {
        this.commandMap = {};
        this.nameList = items.map( item => {
            // https://github.com/Microsoft/TypeScript/wiki/%27this%27-in-TypeScript
            // 「インスタンスメソッドのコール」を関数化してから登録する。
            // 不可解な X is not a function で動かなくなる。
            this.commandMap[ item.name ] = ( () => { item.command() } );
            return item.name;
        } );
    }
    
    protected showAndExecute( param?: any ): Promise<void> {
        return this.showPrompt( param )
        .then( ( command ) => {
            this.execute( command );
        } );
    }
    
    protected showPrompt( param?: any ): Promise<string> {
        return inquirer.prompt( {
            type: 'list',
            name: 'chosen',
            choices: this.nameList,
            message: this.message(),
            pageSize: Math.min( this.nameList.length, ListView.MAX_PAGE_SIZE )
        } ).then( answer => {
            return answer.chosen;
        } );
    }
    
    protected execute( name: string ): void {
        let command = this.commandMap[ name ];
        if( command ) {
            command();
        }
    }
}
