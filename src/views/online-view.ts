import { prompt, inquirer, clear, chalk, clui, SyncCommand, AsyncCommand, CommandMap, View, BotController } from '../@modules';
import { Subscription, Subject, Observable } from 'rxjs';
/*
 * 
 * 
            inquirer.ui.close();
            this.subscription.unsubscribe();
            this.host.next( 'start', 'Disconnected from Discord.' );
 * */
export class OnlineView extends View {
    private commands = new CommandMap();
    private subscription;
    private disconnecion$: Observable<boolean>;
    private answer$: Observable<string>;
    
    constructor( private controller: BotController ) {
        super();
        
        // commands
        this.commands.add( 'Logout', new AsyncCommand( () => {
            return this.logout();
        } ) );
        this.commands.add( 'Quit', new AsyncCommand( () => {
            this.host.close();
            return this.logout().then( () => {
                process.exit();
            } );
        } ) );
        
        // observable
        this.disconnecion$ = this.controller.state$.map( state => state.connected ).filter( connected => !connected );
        this.answer$ = Observable.fromPromise( prompt( {
            type: 'list',
            name: 'choice',
            message: 'Select Guild',
            choices: this.commands.list
        } ) )
        .map( ( answer: any ) => {
            console.log(answer);
            return answer.choice;
        } );
        
    }

    private logout(): Promise<void> {
        return this.controller.logout()
        .then( () => {
            this.host.next( 'start' );
        } );
    }

    show( param?: any ): Promise<void> {
        clear();

        return new Promise( ( resolve, reject ) => {
            this.answer$.map( choice => {
                return this.commands.execute( choice ).then( () => { 
                    resolve(); 
                } );
            } ).subscribe();
        } );
    }
}

