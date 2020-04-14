import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './src/AppModule';

enableProdMode();
platformBrowserDynamic().bootstrapModule(AppModule);
