import { View, ViewHost, ViewReference, ListAction, ListActionMap } from '../view';

import { ClientState } from '@weakenedplayer/screenshot-bot';

export class MainView extends View {
    private actions = new ListActionMap();
    constructor() {
        super( 'main' );
        this.actions.add( new ListAction( 'Directory setting', ( param: any )=>{
            return Promise.resolve( { id: 'directory-setting' } );
        } ) );
        this.actions.add( new ListAction( 'Token setting', ( param: any )=>{ 
            return Promise.resolve( { id: 'token-setting' } );
        } ) );
        this.actions.add( new ListAction( 'Login', ( param: any )=>{ 
            return Promise.resolve( { id: 'main' } );
        } ) );
        this.actions.add( new ListAction( 'Quit', ( param: any )=>{ 
            return Promise.resolve( null );
        } ) );
    }
    
    init() {
        console.log( 'init' );
    }
    
    show( param?: any ): Promise<ViewReference> {
        this.host.clear();
        return this.host.prompt( {
            type: 'list',
            name: 'selected',
            message: '操作を選択',
            choices: this.actions.asChoices(),
            prefix: this.host.chalk.yellow( this.host.figlet.textSync('Screenbot\n', { horizontalLayout: 'full' } ) ),
        } ).then( answer => {
            let next = this.actions.dispatch( answer.selected, param );
            return next;
        } );
    }
}

