import { Observable } from 'rxjs';
import { Effect, Actions, Store } from 'node-rx';
import { NavigationActions } from './actions';
import { State } from '../root';
import { ViewHost } from '../../@modules';

export class NavigationEffects {
    constructor(
            private store$: Store<State>,
            private actions$: Actions,
            private host: ViewHost
    ) {
    }
    @Effect( { dispatch: false } )
    moveTo$ = this.actions$
    .ofType( NavigationActions.MOVE_TO )
    .withLatestFrom( this.store$ )
    .map( ( [ action, store ] ) => {
        this.host.next( store.navigation.id, store.navigation.param );
    } );
}
