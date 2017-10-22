import { View } from './view';

export interface ViewReference {
    readonly id: string;
    readonly param?: any;
}

export class ViewHost {
    private views: { [id:string]: View } = {};
    private lastViewRef: ViewReference = null;
    private readonly inquirer = require('inquirer');
    public readonly chalk = require('chalk');
    public readonly clear = require('clear');
    public readonly clui = require('clui');
    public readonly figlet = require('figlet');
    public readonly prompt = this.inquirer.createPromptModule();
    
    get LastViewReference() { 
        return this.lastViewRef;
    }
    
    register( view: View ) {
        this.views[ view.id ] = view;
        view.setHost( this );
        view.init();
    }
    
    unregister( view: View ) {
        this.views[ view.id ] = null;
    }
    
    open( ref: ViewReference ): Promise<void> {
        if( ref && this.views[ ref.id ] ) {
            return this.views[ ref.id ].show( ref.param ).then( ( nextRef ) => {
                this.lastViewRef = ref;
                this.open( nextRef );
            } );            
        } else {
            return Promise.resolve();
        }
    }
}
