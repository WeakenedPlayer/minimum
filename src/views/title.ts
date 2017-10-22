import { View, ViewHost, ViewReference } from '../view';

export class TitleView extends View {
    constructor() {
        super( 'title' );
    }
    init() {}
    show( param?: any ): Promise<ViewReference> {
        this.host.clear();
        console.log(
                this.host.chalk.yellow(
                this.host.figlet.textSync('Screenbot', { horizontalLayout: 'full' })
            )
        );
        return Promise.resolve( { id: 'main', param: {} } );
    }
}
