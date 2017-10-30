import { prompt, inquirer, View } from '../@modules';

export abstract class InputView extends View {
    constructor() {
        super();
    }
    protected preShow(): void {}
    protected abstract message(): string;
    protected abstract process( input: string ): Promise<void>;
    show( param?: any ): Promise<void> {
        this.preShow();
        return prompt( {
            type: 'input',
            name: 'input',
            message: this.message(),
        } ).then( ( answer: any ) => {
            let input: string = answer.input;
            return this.process( input );
        } );
    }
}

