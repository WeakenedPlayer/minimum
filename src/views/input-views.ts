import { prompt, clear, BotPreference, InputView, View } from '../@modules';

export class TokenInputView extends InputView {
    constructor( private pref: BotPreference ) {
        super();
    }
    
    protected message( param?: string ): string {
        let token = this.pref.client.app.token;
        let message: string;
        if( token ) {
            message = 'Token\n  Current value: ' + token + '\n  New value    :'; 
        } else {
            message = 'Token: '; 
        }
        return message;
    }

    public show( param?: any ): Promise<void> {
        clear();
        return this.showPrompt()
        .then( (input) => {
            // 本当はUI側にロジックを入れるのは良くないが、ここだけなので許容
            if( input ) {
                if( input !== this.pref.client.app.token ) {
                    this.pref.client.app.name = '';
                }
                this.pref.client.app.token = input;            
            }
            this.host.back();
        } );
    }

    public onInit(): void {}
}

export class SourceInputView extends InputView {
    constructor( private pref: BotPreference ) {
        super();
    }
    
    protected message( param?: string ): string {
        let dir = this.pref.directory.src;
        let message: string;
        if( dir ) {
            message = 'Source Directory... \n  Current value: ' + dir + '\n  New value    :'; 
        } else {
            message = 'Source Directory: ';
        }
        return message;
    }
    
    public show( param?: any ): Promise<void> {
        clear();
        return this.showPrompt()
        .then( (input) => {
            if( input ) {
                this.pref.directory.src = input;            
            }
            this.host.back();
        } );
    }
    
    public onInit(): void {}
}

export class TemporaryInputView extends InputView {
    constructor( private pref: BotPreference ) {
        super();
    }
    
    protected message( param?: string ): string {
        let dir = this.pref.directory.tmp;
        let message: string;
        if( dir ) {
            message = 'Temporary Directory... \n  Current value: ' + dir + '\n  New value    :'; 
        } else {
            message = 'Temporary Directory: ';
        }
        return message;
    }
    
    public show( param?: any ): Promise<void> {
        clear();
        return this.showPrompt()
        .then( (input) => {
            if( input ) {
                this.pref.directory.tmp = input;            
            }
            this.host.back();
        } );
    }

    public onInit(): void {}
}

