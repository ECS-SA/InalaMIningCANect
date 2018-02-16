import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

import { SettingsProvider } from '../../providers';

const ECS_PASSWORD:string = 'test1234';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage
{
	public password:string;
	public authenticated:boolean = false;

	public vehicleSettings:any = {
		id: '',
		make: '',
		model: ''
	};

	public constructor(
		private nav: NavController,
		private settingsService: SettingsProvider,
		private toastCtrl: ToastController
	) {

	}

	public ionViewWillEnter()
	{
		this.vehicleSettings = this.settingsService.getAll();
	}

	public login()
	{
		if (this.password == ECS_PASSWORD) {
			this.authenticated = true;
		}
	}

	public saveSettings()
	{
		this.settingsService.update(this.vehicleSettings)
			.subscribe((response:any) => {
				console.log('response', response);
				if (response.status) {
					let toast = this.toastCtrl.create({
						message: response.message,
						showCloseButton : true,
						position: 'bottom'
					});

					toast.onDidDismiss(() => {
						this.nav.pop();
					});

					toast.present();
				}
			}, (error:any) => {

			});
	}
}
