import { Subject, Observable } from 'rxjs';
import { inquirer } from './cli';

export abstract class View {
    protected host: ViewHost = null;
    public init( host: ViewHost ): void {
        this.host = host;
    }
    public abstract show( param?: any );
}

class ViewReference {
    constructor( public readonly id, public readonly param?: any ) {}
}

export class ViewHost {
    private views: { [id:string]: View } = {};
    constructor() {}

    next( id: string, param?: any ): void {
        let view = this.views[ id ];
        console.log( id );
        console.log( view );
        if( view ) {
            view.show( param );            
        }
    }
    
    close(): void {
        // inquirer.ui.close();
    }
    
    add( name: string, view: View ): void {
        if( name ) {
            this.views[ name ] = view;            
        }
    }
}