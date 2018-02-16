/* Angular/Ionic imports */
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

/* -----------------Application imports----------------- */
// App component
import { CANectViewApp } from './app.component';

// App pages
import {
    HardwarePage,
    HomePage,
    LiveDataPage,
    GaugesPage,
    HistoricalDataPage,
    FileDownloadModalPage,
    SettingsPage
} from '../pages';

// App components
import { ComponentsModule } from '../components/components.module';

// App service providers
import { RestProvider, VpcaWebSocket, ChatWebSocket, SettingsProvider } from '../providers';

/* ------------------3rd Party imports------------------ */
// https://github.com/VadimDez/ngx-order-pipe
import { OrderModule } from 'ngx-order-pipe';
// https://github.com/HsuanXyz/ion2-calendar
import { CalendarModule } from "ion2-calendar";

// Application pages
export const PAGES:Array<any> = [
    CANectViewApp,
    HardwarePage,
    HomePage,
    LiveDataPage,
    GaugesPage,
    HistoricalDataPage,
    FileDownloadModalPage,
    SettingsPage
];

// Application directives
export const DIRECTIVES:Array<any> = [
    // Define any application directives here
];

// Application pipes
export const PIPES:Array<any> = [
    // Define any application pipes here
];

// Define our service providers
export const PROVIDERS:Array<any> = [
    RestProvider,
    VpcaWebSocket,
    ChatWebSocket,
    SettingsProvider,
    {
        provide: ErrorHandler,
        useClass: IonicErrorHandler
    }
];

// Helper for declarations
// This will be page components and directives, pipes, common components
export function getDeclarations() {
    // Unpack each array into single array
    // See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
    return [...PAGES, ...DIRECTIVES, ...PIPES];
}

// Helper for entry components
// This will only be application pages
export function getEntryComponents() {
    return [...PAGES];
}

// Helper for service providers
// This will be application service providers
export function getProviders() {
    return [...PROVIDERS];
}

/* -----------------App Module Definition----------------- */
@NgModule({
    declarations: getDeclarations(),
    imports: [
        BrowserModule,
        HttpModule,
        OrderModule,
        CalendarModule,
        ComponentsModule,
        IonicModule.forRoot(CANectViewApp),
    ],
    bootstrap: [ IonicApp ],
    entryComponents: getEntryComponents(),
    providers: getProviders()
})
export class AppModule {}
