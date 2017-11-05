import { prompt, inquirer } from './cli';
import { View } from './view';

export abstract class InputView extends View {
    constructor() {
        super();
    }
    protected abstract onPreShow(): void;
    protected abstract message(): string;
    protected abstract process( input: string );
    show( param?: any ) {
        this.onPreShow();
        prompt( {
            type: 'input',
            name: 'input',
            message: this.message(),
        } ).then( ( answer: any ) => {
            let input: string = answer.input;
            return this.process( input );
        } );
    }
}

