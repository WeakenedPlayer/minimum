import { ViewReference } from './view-host';
export class ListAction {
    constructor( public readonly name: string, public readonly execute: ( param?: any ) => Promise<ViewReference> ) {}
}


export class ListActionMap {
    private actions: ListAction[] = [];
    private actionMap: { [ name: string ]: ListAction } = {};
    add( action: ListAction ) {
        if( !this.actionMap[ action.name ] ) {
            this.actions.push( action );
        }
        this.actionMap[ action.name ] = action;
    }
    clear() {
        this.actions = [];
        this.actionMap = {};
    }
    asChoices(): string[] {
        return this.actions.map( action => action.name );
    }
    dispatch( name: string, param?: any ): Promise<ViewReference> {
        let action = this.actionMap[ name ];
        console.log( name );
        if( action ) {
            return action.execute( param );
        } else {
            return Promise.resolve( null );
        }
    }
}