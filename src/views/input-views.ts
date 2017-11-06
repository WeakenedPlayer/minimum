import { prompt, clear, BotPreference, InputView, View } from '../@modules';

export class TokenInputView extends InputView {
    constructor( private pref: BotPreference ) {
        super();
    }
    
    protected message(): string {
        let token = this.pref.token;
        let message: string;
        if( token ) {
            message = 'Input token\n  Current value: ' + token + '\n  New value    :'; 
        } else {
            message = 'Input token:'; 
        }
        return message;
    }

    public show( param?: any ): Promise<void> {
        // clear();
        console.log( 'TokenInputView/show')
        return this.showPrompt()
        .then( (input) => {
            if( input ) {
                this.pref.token = input;            
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
    
    protected message(): string {
        return 'Input Source Directory: \n';
    }
    
    public show( param?: any ): Promise<void> {
        // clear();
        return this.showPrompt()
        .then( (input) => {
            if( input ) {
                this.pref.source = input;            
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
    
    protected message(): string {
        return 'Input Temporary Directory: ';
    }
    
    public show( param?: any ): Promise<void> {
        // clear();
        return this.showPrompt()
        .then( (input) => {
            if( input ) {
                this.pref.temporary = input;            
            }
            this.host.back();
        } );
    }

    public onInit(): void {}
}

