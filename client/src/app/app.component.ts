import { Component, ViewChild } from '@angular/core';
import { Nav } from 'ionic-angular';

// Import application pages
import {
    HomePage,
    LiveDataPage,
    HardwarePage,
    GaugesPage,
    HistoricalDataPage,
    SettingsPage
} from '../pages';

// Import VPCA, CHAT Web Socket interfaces
import { VpcaWebSocket, ChatWebSocket, SettingsProvider } from '../providers';

// Page interface
interface Page
{
    title: string;
    component: any;
}

@Component({
  templateUrl: 'app.html'
})
export class CANectViewApp
{
    // Instance of the navigation in the template
    @ViewChild(Nav) nav: Nav;

    // Define our root page
    public rootPage: any = HomePage;

    // Array of pages to display in the sidemenu
    public sideMenuItems: Array<Page> = [
        { title: 'Home', component: HomePage },
        { title: 'Gauges', component: GaugesPage },
        { title: 'Live Data', component: LiveDataPage },
        { title: 'Hardware Data', component: HardwarePage },
        { title: 'Historical Data', component: HistoricalDataPage}
    ];

    /**
     * App component constructor
     *
     * Called once when the application loads
     */
    public constructor(vpca: VpcaWebSocket, chat: ChatWebSocket, private settingsService: SettingsProvider)
    {
        // Open the connection to VPCA Web Socket
        vpca.connect();
        // Open the connection to CHAT Web Socket
        chat.connect();

        this.settingsService.load();
    }

    public openSettingsPage()
    {
        this.nav.push(SettingsPage);
    }

    /**
     * openPage
     *
     * Called from app.html whenever a user clicks a sidemenu item
     */
    public openPage(page:Page)
    {
        this.nav.setRoot(page.component);
    }
}
