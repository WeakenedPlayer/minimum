import { ViewHost } from './@modules';
import { State, initialState, reducers } from './@store';
import { NavigationEffects } from './@store';
import { NodeRx } from 'node-rx';

export class Store extends NodeRx<State>{
    private _host = new ViewHost();
    get host(): ViewHost { return this._host }
    constructor( init: State = initialState ){
        super( reducers, init );
        this.effectSubscription.addEffects( [ new NavigationEffects( this.store, this.actions, this._host ) ] );
    }
}
