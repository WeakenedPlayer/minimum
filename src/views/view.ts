import { ViewHost } from './view-host';

export abstract class View {
    constructor() {}
    public abstract show( host: ViewHost ): Promise<void>;
}
