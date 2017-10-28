import { prompt, clear, chalk, figlet } from './cli';
import { Command, CommandMap } from './command';

export class MainView {
    private commands = new CommandMap();
    constructor() {
        this.commands.add( 'Directory Setting', new Command( ( param: any ) => { console.log( 'note' ); return Promise.resolve() } ) );
        this.commands.add( 'Token Setting', new Command( ( param: any ) => { console.log( 'note2' ); return Promise.resolve() } ) );
        this.commands.add( 'Login', new Command( ( param: any ) => { console.log( 'note3' ); return Promise.resolve() } ) );
    }
    show( param?: any ): Promise<void> {
        clear();
        console.log(  );
        return prompt( {
            type: 'list',
            name: 'selected',
            message: '操作を選択',
            choices: this.commands.list,
            prefix: chalk.yellow( figlet.textSync('Screenbot', { horizontalLayout: 'full' } ) ),
        } ).then( ( answer: any ) => {
            return this.commands.execute( answer.selected );
        } );
    }
}

