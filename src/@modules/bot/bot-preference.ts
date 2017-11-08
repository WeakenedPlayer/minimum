import { Subject, Subscription, Observable } from 'rxjs';
var Preferences = require("preferences");

export interface BotPreference {
    client: {
        token: string;
        guild: { 
            id: string;
            name: string;
        };
        channel: {
            id: string;
            name: string;
            guildId: string;
        };
    };
    directory: {
        src: string;
        tmp: string;
    }
}

const initValue = {
    client: {
        token: '',
        guild: {
            id: '',
            name: '',
        },
        channel: {
            id: '',
            name: '',
            guildId: '',
        }
    },
    directory: {
        src: 'screen-shot directory',
        tmp: 'temporary directory'
    }
};

export function createPreference( id: string ): BotPreference {
    return new Preferences( id, initValue );
}
