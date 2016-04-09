/// <reference path="../node_modules/angular2/typings/browser.d.ts" />

import { bootstrap } from 'angular2/platform/browser';
import { AppComponent } from './app.component/app.component';
import { AppService } from "./app.service/app.service";

bootstrap(AppComponent, [AppService]);