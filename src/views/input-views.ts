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
    
    processAnswer( input: string ): void  {
        console.log( input );
        if( input ) {
            this.pref.token = input;            
        }
        this.host.next( 'start' );
    }

    onInit(){}
    onClose(){
        console.log( 'TokenInputView/close' );
    }
    onOpen(){
        // clear();
        console.log( 'TokenInputView/open' );
    }
}

export class SourceInputView extends InputView {
    constructor( private pref: BotPreference ) {
        super();
    }
    protected message(): string {
        return 'Input Source Directory: ';
    }
    processAnswer( input: string ): void  {
        if( input ) {
            this.pref.source = input;            
        }
        this.host.next( 'start' );
    }
    onInit(){}
    onClose(){
        console.log( 'SourceInputView/close' );
    }
    onOpen(){
        // clear();
        console.log( 'SourceInputView/open' );
    }
}

export class TemporaryInputView extends InputView {
    constructor( private pref: BotPreference ) {
        super();
    }
    protected message(): string {
        return 'Input Temporary Directory: ';
    }
    processAnswer( input: string ): void  {
        if( input ) {
            this.pref.temporary = input;            
        }
        this.host.next( 'start' );
    }
    onInit(){}
    onClose(){
        console.log( 'TemporaryInputView/close' );
    }
    onOpen(){
        // clear();
        console.log( 'TemporaryInputView/open' );
    }
}

