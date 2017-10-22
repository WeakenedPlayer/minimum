import { View, ViewHost, ViewReference, ListAction, ListActionMap } from '../view';

export class DirectorySettingView extends View {
    private actions = new ListActionMap();
    constructor() {
        super( 'directory-setting' );
        this.actions.add( new ListAction( 'Screenshot directory', ( param: any )=>{
            return Promise.resolve( { id: 'screenshot-directory-setting' } );
        } ) );
        this.actions.add( new ListAction( 'Temporary directory', ( param: any )=>{
            return Promise.resolve( { id: 'temporary-directory-setting' } );
        } ) );
        this.actions.add( new ListAction( 'Back', ( param: any )=>{ 
            return Promise.resolve( { id: 'main', param: {} } );
        } ) );
    }
    
    init() {
    }
    
    show( param?: any ): Promise<ViewReference> {
        this.host.clear();
        return this.host.prompt( {
            type: 'list',
            name: 'selected',
            message: '操作を選択',
            choices: this.actions.asChoices(),
            prefix: '',
        } ).then( answer => {
            let next = this.actions.dispatch( answer.selected, param );
            return next;
        } );
    }
}

