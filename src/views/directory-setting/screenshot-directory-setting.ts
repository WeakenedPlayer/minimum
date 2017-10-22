import { View, ViewHost, ViewReference, ListAction, ListActionMap } from '../view';

export class ScreenshotDirectorySettingView extends View {
    private actions = new ListActionMap();
    constructor( private prefs: any ) {
        super( 'screenshot-directory-setting' );
    }
    
    init() {
    }
    
    show( param?: any ): Promise<ViewReference> {
        this.host.clear();
        return this.host.prompt( {
            type: 'input',
            name: 'directory',
            message: 'スクリーンショットのディレクトリを選択',
            prefix: 'current setting: ' + this.prefs.directory.src + '\n', 
        } ).then( answer => {
            let directory = answer.directory;
            if( directory ) {
                this.prefs.directory.src = directory;                
            }
            return this.host.LastViewReference;
        } );
    }
}
