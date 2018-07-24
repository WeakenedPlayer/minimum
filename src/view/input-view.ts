import { prompt, inquirer } from './cli';
import { View } from './view';

export abstract class InputView extends View {

    protected abstract message(): string;
    protected preShow(): Promise<void> {
        return Promise.resolve();
    }
    protected abstract execute( answer: string ): Promise<void>;
    
    show(): Promise<void> {
        return this.preShow().then( () => {
            let message = this.message();
            return prompt( {
                type: 'input',
                name: 'input',
                message: message
            } );
        } ).then( ( answer ) => {
            return this.execute( answer[ 'input' ] );
        } )
    }
}

