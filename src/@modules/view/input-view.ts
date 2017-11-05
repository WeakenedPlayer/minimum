import { prompt, inquirer } from './cli';
import { View } from './view';

export abstract class InputView extends View {
    constructor() {
        super();
    }
    protected abstract message(): string;
    show( param?: any ): Promise<any> {
        let message = this.message();
        return prompt( {
            type: 'input',
            name: 'input',
            message: message,
        } ).then( ( answer ) => {
            return answer.input;
        } );
    }
}

