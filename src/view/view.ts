import { ViewHost, ViewReference } from './view-host';

export abstract class View {
    protected host: ViewHost = null;
    constructor( public readonly id: string ){}
    public setHost( host: ViewHost ) { this.host = host; }
    
    public abstract init();
    public abstract show( param?: any ): Promise<ViewReference>;
}
