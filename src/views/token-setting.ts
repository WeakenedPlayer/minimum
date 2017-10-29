import { prompt, clear, chalk, figlet, Command, CommandMap, View, BotPreference } from '../@modules';

export class TokenSettingView extends View {
    constructor( private pref: BotPreference ) {
        super();
    }
    show( param?: any ): Promise<void> {
        clear();
        return prompt( {
            type: 'input',
            name: 'token',
            message: 'Input token:',
            suffix: this.pref.token,
        } ).then( ( answer: any ) => {
            let token: string = answer.token;
            this.pref.token = token;
            this.host.next( 'main' );
        } );
    }
}

