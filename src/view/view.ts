import { ViewHost, ViewReference } from './view-host';

export abstract class View {
    constructor( public readonly id: string ){}
    public abstract show( host: ViewHost, param?: any ): Promise<ViewReference>;
}
