import { Action, nextState } from 'node-rx';
import { NavigationActions } from './actions';

export interface NavigationState {
    id: string;
    param: any;
}

export const navigationInitialState: NavigationState = {
    id: '',
    param: '',
};

export function navigationReducer( state: NavigationState = navigationInitialState, action: any ): NavigationState {
    let newState = state;
    if( action.type ) {
        newState = nextState( state, { id: action.type, param: action.payload } );
    }
    return newState;
}
