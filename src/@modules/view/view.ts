import { inquirer } from './cli';
import { Subject } from 'rxjs';

export abstract class View {
    protected host: ViewHost = null;
    
    constructor() {
    }
    public registerHost( host: ViewHost ): void {
        this.host = host;
    }
    public abstract onInit(): void;
    public abstract onOpen(): void;
    public abstract onClose(): void;
    public abstract show( param?: any ): Promise<any>;
    public abstract processAnswer( answer?: any): void;
}

export class ViewHost {
    private views: { [id:string]: View } = {};
    private cancelSubject: Subject<string> = new Subject();
    private lastView: View = null;
    constructor() {}

    cancel() {
        this.cancelSubject.error( false );
    }
    
    next( id: string, param?: any ): void {
        let view = this.views[ id ];
        
        if( view ) {
            view.onOpen();
            Promise.race( [ this.cancelSubject.take(1).toPromise(), view.show( param ) ] )
            .then( ( answer: any ) => {
                view.processAnswer( answer );
                view.onClose();
            }, ( err ) => {
                // キャンセル
                view.onClose();
            } );
            this.lastView = view;
        }
    }
    
    add( name: string, view: View ): void {
        if( name && view ) {
            view.registerHost( this );
            this.views[ name ] = view;
            view.onInit();
        }
    }
}