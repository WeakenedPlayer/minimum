import { Action } from 'node-rx';



export class NavigationActions {
    static MOVE_TO = 'NAVIGATION_MOVE_TO';
    static moveTo( id: string, param?: any ): Action { return { type: NavigationActions.MOVE_TO, payload: { id: id, param: param } } }
}