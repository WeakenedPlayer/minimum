import { inquirer } from './cli';
import { BehaviorSubject } from 'rxjs';

export abstract class View {
    protected host: ViewHost = null;
    
    constructor() {
    }
    public registerHost( host: ViewHost ): void {
        this.host = host;
    }
    public abstract onInit(): void;
    public abstract onDestroy(): void;
    public abstract show( param?: any ): void;
}

export class ViewHost {
    private views: { [id:string]: View } = {};
    private lastView: View = null;
    constructor() {}

    next( id: string, param?: any ): void {
        let view = this.views[ id ];
        if( this.lastView ) {
            this.lastView.onDestroy();
        }
        if( view ) {
            view.show( param );
            this.lastView = view;
        }
    }
    
    close(): void {
        if( this.lastView ) {
            this.lastView.onDestroy();
        }
        // inquirer.ui.close();
    }
    
    add( name: string, view: View ): void {
        if( name && view ) {
            view.registerHost( this );
            this.views[ name ] = view;
            view.onInit();
        }
    }
}