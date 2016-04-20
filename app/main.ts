/// <reference path="../node_modules/angular2/typings/browser.d.ts" />

import { bootstrap } from 'angular2/platform/browser';
import { AppComponent } from './app.component/app.component';

bootstrap(AppComponent, [])
    .then(success => console.log(`Bootstrap success`))
    .catch(error => console.log(error));

