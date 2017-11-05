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

    protected abstract message(): string;
    show( param?: any ): Promise<any> {
        return prompt( {
            type: 'list',
            name: 'chosen',
            choices: this.choices,
            message: this.message(),
        } ).then( ( answer ) => {
            return answer.chosen;
        } );
    }
    
    processAnswer( answer: string ): void {
        console.log( answer );
        let action = this.actions[ answer ];
        if( action ) {
            console.log( 'ListView/action' );
            action();
        }
        console.log( 'ListView/processAnswer' );
    }
}
