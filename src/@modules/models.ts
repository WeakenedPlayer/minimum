export class Channel {
    constructor( 
            public readonly id: string,
            public readonly name: string,
            public readonly guildId: string
    ){}
}

export class Guild {
    constructor( 
            public readonly id: string,
            public readonly name: string
    ){}
}

export class OAuth2App {
    constructor( 
        public readonly id: string,
        public readonly name: string,
        public readonly description: string,
        public readonly iconUrl: string,
        public readonly isPublic: boolean
    ){}
}
