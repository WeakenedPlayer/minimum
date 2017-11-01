import { navigationReducer, NavigationState, navigationInitialState } from '../navigation';

export interface State {
    navigation: NavigationState;
}

export const initialState = {
    navigation: navigationInitialState
}

export const reducers = {
    navigation: navigationReducer
};
