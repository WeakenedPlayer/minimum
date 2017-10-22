import { View, ViewHost, ViewReference, ListAction, ListActionMap } from '../view';
import { ClientState } from '@weakenedplayer/screenshot-bot';

export class MainView extends View {
    private actions = new ListActionMap();
    constructor() {
        super( 'main' );
        this.actions.add( new ListAction( 'Directory setting', ( param: any )=>{
            return Promise.resolve( { id: 'main' } );
        } ) );
        this.actions.add( new ListAction( 'Token setting', ( param: any )=>{ 
            return Promise.resolve( { id: 'main' } );
        } ) );
        this.actions.add( new ListAction( 'Login', ( param: any )=>{ 
            return Promise.resolve( { id: 'main' } );
        } ) );
        this.actions.add( new ListAction( 'Quit', ( param: any )=>{ 
            return Promise.resolve( null );
        } ) );
    }
    
    show( host: ViewHost, param?: any ): Promise<ViewReference> {
        const title = host.chalk.yellow( host.figlet.textSync('Screenbot\n', { horizontalLayout: 'full' } ) );
        host.clear();
        return host.prompt( {
            type: 'list',
            name: 'selected',
            message: '操作を選択',
            choices: this.actions.asChoices(),
            prefix: title
        } ).then( answer => {
            let next = this.actions.dispatch( answer.selected, param );
            return next;
        } );
    }
}

