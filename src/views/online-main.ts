import { prompt, clear, chalk, figlet, Command, CommandMap, View, BotController } from '../@modules';

// 状態を監視して、NGなら消す
export class OnlineMainView extends View {
    private commands = new CommandMap();
    constructor( private controller: BotController ) {
        super();
        this.commands.add( 'Select Channel', new Command( () => {this.host.next( 'main' ); return Promise.resolve() } ) );
        this.commands.add( 'Toggle', new Command( () => { this.host.next( 'main' ); return Promise.resolve() } ) );
        this.commands.add( 'Logout', new Command( () => {
            return this.controller.logout().then( ()=>{
                this.host.next( 'offline-main' );
            } );
        } ) );
        this.commands.add( 'Quit', new Command( () => {
            return this.controller.logout();
        } ) );
    }
    show( param?: any ): Promise<void> {
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
