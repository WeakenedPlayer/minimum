import { prompt, inquirer } from './cli';
import { View } from './view';

export abstract class InputView extends View {
    constructor() {
        super();
    }
    protected abstract message(): string;
    show( param?: any ): Promise<any> {
        return prompt( {
            type: 'input',
            name: 'input',
            message: this.message(),
        } ).then( ( answer ) => {
            return answer.input;
        } );
    }
}

