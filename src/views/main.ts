import { prompt, clear, chalk, figlet, Command, CommandMap, View } from '../@modules';

export class MainView extends View {
    private commands = new CommandMap();
    constructor() {
        super();
        this.commands.add( 'Directory Setting', new Command( () => { console.log( 'note' ); return Promise.resolve() } ) );
        this.commands.add( 'Token Setting', new Command( () => { this.host.next( 'token-setting' ); return Promise.resolve() } ) );
        this.commands.add( 'Login', new Command( () => { console.log( 'note3' ); this.host.next( 'main' ); return Promise.resolve() } ) );
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
