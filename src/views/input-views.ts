import { prompt, BotPreference, InputView } from '../@modules';

export class TokenInputView extends InputView {
    constructor( private pref: BotPreference ) {
        super();
    }
    protected message(): string {
        let message = 'Input token: ';
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

