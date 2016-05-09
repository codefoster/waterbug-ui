import { bootstrap } from '@angular/platform-browser-dynamic';
import { AppComponent } from './app.component/app.component';

bootstrap(AppComponent, [])
    .then(success => console.log(`Bootstrap success`))
    .catch(error => console.log(error));

