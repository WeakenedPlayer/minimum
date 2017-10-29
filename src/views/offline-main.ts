import { prompt, clear, chalk, figlet, Command, CommandMap, View, BotController } from '../@modules';

export class OfflineMainView extends View {
    private commands = new CommandMap();
    constructor( private controller: BotController ) {
        super();
        this.commands.add( 'Directory Setting', new Command( () => { console.log( 'note' ); return Promise.resolve() } ) );
        this.commands.add( 'Token Setting', new Command( () => { 
            this.host.next( 'token-setting' ); 
            return Promise.resolve(); 
        } ) );
        this.commands.add( 'Login', new Command( () => {
            return this.controller.login().then( ()=>{
                console.log( 'logged in' );
                this.host.next( 'online-main' );
            }, () => {
                console.log( 'failed' );
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
            prefix: chalk.yellow( figlet.textSync('Offline', { horizontalLayout: 'full' } ) ),
        } ).then( ( answer: any ) => {
            return this.commands.execute( answer.selected );
        } );
    }
}
