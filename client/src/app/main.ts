import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';

import 'chartjs-plugin-zoom';

platformBrowserDynamic().bootstrapModule(AppModule);
