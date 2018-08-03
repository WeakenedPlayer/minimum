export class Router<T> {
    private data: T[];
    private idx: number;

    constructor() {
        this.data= [];
        this.idx = 0;
    }
    
    open( data: T ): void {
        if( this.idx < this.data.length - 1 ) {
            this.data.splice( this.idx + 1 );
        }
        this.data.push( data );
        this.idx = this.data.length - 1;
    }
    
    goBack(): T {
        let tmp = undefined;
        if( this.idx > 0 ) {
            this.idx--;
            tmp = this.data[ this.idx ];
        }
        return tmp;
    }
    
    goNext(): T {
        let tmp = undefined;
        if( this.data.length - this.idx > 1 ) {
            this.idx++;
            tmp = this.data[ this.idx ];
        }
        return tmp;
    }

    get current(): T {
        return this.data[ this.idx ];
    }
}