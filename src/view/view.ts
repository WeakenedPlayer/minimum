import { ViewHost } from './view-host';

export abstract class View {
    protected _host: ViewHost = null;
    protected get host(): ViewHost { return this._host; }
    constructor() {}
    registerHost( host: ViewHost ) {
        this._host = host;
    }
    public abstract show(): Promise<void>;
}
