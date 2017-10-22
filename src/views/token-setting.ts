import { View, ViewHost, ViewReference, ListAction, ListActionMap } from '../view';

export class TokenSettingView extends View {
    private actions = new ListActionMap();
    constructor( private prefs: any ) {
        super( 'token-setting' );
    }
    
    init() {
    }
    
    show( param?: any ): Promise<ViewReference> {
        this.host.clear();
        return this.host.prompt( {
            type: 'input',
            name: 'token',
            message: 'Discordアプリのトークンを入力: (' + this.prefs.client.token + ')',
        } ).then( answer => {
            let token = answer.token;
            if( token ) {
                this.prefs.client.token = token;                
            }
            return this.host.LastViewReference;
        } );
    }
}

