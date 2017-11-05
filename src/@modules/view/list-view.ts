import { prompt, inquirer } from './cli';
import { View } from './view';

export abstract class ListView extends View {
    private choices: string[] = [];
    private actions: { [ name: string ]: () => void } = {};

    constructor() {
        super();
    }
    
    protected add( choice: string, action: () => void ) {
        if( choice && !this.actions[ choice ] ) {
            this.choices.push( choice );
        }
        this.actions[ choice ] = action;
    }
    
    protected clear() {
        this.choices = [];
        this.actions = {};
    }

    protected abstract onPreShow(): void;
    protected abstract message(): string;
    protected process( input: string ) {
        let action = this.actions[ input ];
        if( action ) {
            action();
        }
    }
    show( param?: any ) {
        this.onPreShow();
        prompt( {
            type: 'list',
            name: 'chosed',
            choices: this.choices,
            message: this.message(),
        } ).then( ( answer: any ) => {
            let chosed: string = answer.chosed;
            return this.process( chosed );
        } );
    }
}
