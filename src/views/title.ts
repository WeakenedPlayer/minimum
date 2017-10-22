import { View, ViewHost, ViewReference } from '../view';

export class TitleView extends View {
    constructor() {
        super( 'title' );
    }
    
    show( host: ViewHost, param?: any ): Promise<ViewReference> {
        host.clear();
        console.log(
            host.chalk.yellow(
                host.figlet.textSync('Screenbot', { horizontalLayout: 'full' })
            )
        );
        return Promise.resolve( { id: 'main', param: {} } );
    }
}
