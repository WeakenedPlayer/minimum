import { Subject, Observable, Subscription } from 'rxjs';
import { ViewHost } from './view-host';

export abstract class View {
    protected host: ViewHost = null;
    constructor() {}
    
    public registerHost( host: ViewHost ): void {
        this.host = host;
    }
    public abstract onInit(): void;
    public abstract show( param?: string ): Promise<void>;
}
