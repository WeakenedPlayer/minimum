import { prompt, inquirer } from './cli';
import { View } from './view';

export abstract class InputView extends View {
    constructor() {
        super();
    }
    
    protected abstract message( param?: string ): string;
    
    protected showPrompt( param?: string ): Promise<string> {
        let message = this.message( param );
        return prompt( {
            type: 'input',
            name: 'input',
            message: message,
        } ).then( ( answer ) => {
            return answer.input;
        } );
    }
}

