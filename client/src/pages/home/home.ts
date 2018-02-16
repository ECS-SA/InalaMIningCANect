import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

// Import Subscription class from RxJS
import { Subscription } from 'rxjs/Subscription';

// Import page components
import { LiveDataPage, HardwarePage, GaugesPage, HistoricalDataPage } from '../';

// Import Web Socket providers
import { VpcaWebSocket, ChatWebSocket, SettingsProvider } from '../../providers';

// Local PageLink interface
interface PageLink
{
	icon: string;
	name: string;
	component: any;
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage
{
	public vehicleSettings:any = {};

	// Web Socket connected flags
	public vpcaConnected:boolean = false;
	public chatConnected:boolean = false;

	// Local attribute to store subscriptions
	private subs:Array<Subscription> = [];

	// Array of pages to list on the home page
	// Each page could have an icon
	public pages:Array<PageLink> = [
		{
			icon: 'analytics',
			name: 'Live Data Page',
			component : LiveDataPage
		},
		{
			icon: 'move',
			name: 'Hardware Page',
			component: HardwarePage
		},
		{
			icon: 'options',
			name: 'Gauges Page',
			component: GaugesPage
		},
		{
			icon: 'md-calendar',
			name: 'Historical Data',
			component: HistoricalDataPage
		}
	];

	public constructor(
		private navCtrl: NavController,
		private chat: ChatWebSocket,
		private vpca: VpcaWebSocket,
		private settingsService: SettingsProvider
	) {

	}

	public ionViewWillEnter()
	{
		this.vehicleSettings = this.settingsService.getAll();

		this.listenToWebSocketsStatus();
	}

	private listenToWebSocketsStatus()
	{
		// Subscribe to CHAT connected subject
		let chatSub = this.chat.connected.subscribe((connected:boolean) => this.chatConnected = connected);

		// Subscribe to VPCA connected subject
		let vpcaSub = this.vpca.connected.subscribe((connected:boolean) => this.vpcaConnected = connected);

		// Push subscriptions onto array to unsubscribe when leaving page
		this.subs.push(vpcaSub, chatSub);
	}

	public openPage(page:any)
	{
		if (page != null) {
			this.navCtrl.setRoot(page);
		}
	}

	public ionViewWillLeave()
	{
		// Unsubscribe from each subscription
		this.subs.forEach(sub => sub.unsubscribe());
	}
}
