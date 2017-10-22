import { View, ViewHost, ViewReference, ListAction, ListActionMap } from '../view';

export class TemporaryDirectorySettingView extends View {
    private actions = new ListActionMap();
    constructor( private prefs: any ) {
        super( 'temporary-directory-setting' );
    }
    
    init() {
    }
    
    show( param?: any ): Promise<ViewReference> {
        this.host.clear();
        return this.host.prompt( {
            type: 'input',
            name: 'directory',
            message: '一時ファイル用ディレクトリを選択',
            prefix: 'current setting: ' + this.prefs.directory.tmp + '\n', 
        } ).then( answer => {
            let directory = answer.directory;
            if( directory ) {
                this.prefs.directory.tmp = directory;                
            }
            return this.host.LastViewReference;
        } );
    }
}

