import { inquirer } from './cli';

export abstract class Item {
    abstract get name(): string;
    abstract command(): void;
}

export class ConstantItem extends Item {
    constructor( private _name: string, private _command: ()=>void ) { 
        super();
        // console.log( this._command );
    }
    get name(): string { return this._name }
    command(): void { this._command() }
}

export class VariableItem extends Item {
    constructor( private generator: ()=>string, private _command: any ) { 
        super();
        // console.log( this._command );
    }
    get name(): string { return this.generator() }
    command(): void { 
        this._command() 
    }
}

export const separator = new ConstantItem( new inquirer.Separator(), null );
