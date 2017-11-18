import { Subject, Subscription, Observable } from 'rxjs';
var Preferences = require("preferences");

export interface BotPreference {
    client: {
        // 不使用
        app: {
            token: string;
            name: string;
        },
        guild: {
            id: string;
            name: string;
            tmpId: string;      // TENTATIVE: Guild -> Channelの順に設定するので、一時置き (良くないやり方)
            tmpName: string;
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
        app: {
            token: '',
            name: '',
        },
        guild: {
            id: '',
            name: '',
            tmpId: '',
            tmpName: '',
        },
        channel: {
            id: '',
            name: '',
            guildId: '',
        }
    },
    directory: {
        src: '',
        tmp: ''
    }
};

export function createPreference( id: string ): BotPreference {
    return new Preferences( id, initValue );
}
