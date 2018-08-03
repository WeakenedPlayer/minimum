import { prompt, inquirer } from './cli';
import { View } from './view';
import { ViewHost } from './view-host';

export abstract class InputView extends View {

    protected abstract message(): string;
    protected preShow( host: ViewHost ): Promise<void> {
        return Promise.resolve();
    }
    
    protected abstract execute( answer: string, host: ViewHost ): Promise<void>;
    
    show( host: ViewHost ): Promise<void> {
        return this.preShow( host ).then( () => {
            let message = this.message();
            return prompt( {
                type: 'input',
                name: 'input',
                message: message
            } );
        } ).then( ( answer ) => {
            return this.execute( answer[ 'input' ], host );
        } )
    }
}

