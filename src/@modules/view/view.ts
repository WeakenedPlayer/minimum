import { inquirer } from './cli';

export abstract class View {
    protected host: ViewHost = null;
    constructor() {
    }
    public init( host: ViewHost ): void {
        this.host = host;
    }
    public abstract show( param?: any ): void;
}

export class ViewHost {
    private views: { [id:string]: View } = {};
    constructor() {}

    next( id: string, param?: any ): void {
        let view = this.views[ id ];
        if( view ) {
            view.show( param );            
        }
    }
    
    close(): void {
        // inquirer.ui.close();
    }
    
    add( name: string, view: View ): void {
        if( name && view ) {
            view.init( this );
            this.views[ name ] = view;
        }
    }
}