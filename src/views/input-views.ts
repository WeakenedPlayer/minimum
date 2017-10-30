import { prompt, clear, BotPreference, InputView, View } from '../@modules';

export class TokenInputView extends InputView {
    constructor( private pref: BotPreference ) {
        super();
    }
    protected preShow(): void {
        clear();
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
    
    protected process( input: string ): Promise<void> {
        if( input ) {
            this.pref.token = input;            
        }
        this.host.next( 'start' );
        return Promise.resolve();
    }
}

export class SourceInputView extends InputView {
    constructor( private pref: BotPreference ) {
        super();
    }
    protected message(): string {
        return 'Input Source Directory: ';
    }
    protected process( input: string ): Promise<void> {
        if( input ) {
            this.pref.source = input;            
        }
        this.host.next( 'start' );
        return Promise.resolve();
    }
}

export class TemporaryInputView extends InputView {
    constructor( private pref: BotPreference ) {
        super();
    }
    protected message(): string {
        return 'Input Temporary Directory: ';
    }
    protected process( input: string ): Promise<void> {
        if( input ) {
            this.pref.temporary = input;            
        }
        this.host.next( 'start' );
        return Promise.resolve();
    }
}

