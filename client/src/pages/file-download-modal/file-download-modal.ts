import { Component } from '@angular/core';

import { ViewController, LoadingController } from 'ionic-angular';

import { RestProvider, SettingsProvider } from '../../providers'

import { saveAs } from 'file-saver';
import { CalendarComponentOptions } from 'ion2-calendar';

const getCalendarStartDate = () => {
	const startDate = new Date();
	startDate.setMonth(startDate.getMonth() - 1);
	return startDate;
};

@Component({
  selector: 'page-file-download-modal',
  templateUrl: 'file-download-modal.html',
})
export class FileDownloadModalPage
{
	// 'string' | 'js-date' | 'moment' | 'time' | 'object'
	public type:string = 'string';

	public dateRange:any = { from: null, to: null };

	public optionsRange: CalendarComponentOptions = {
		pickMode: 'range',
		from: getCalendarStartDate()
	};

	private vehicleSettings:any = {};

	public constructor(
		private viewCtrl: ViewController,
		private loadingCtrl: LoadingController,
		private rest: RestProvider,
		private settingsService: SettingsProvider
	) {

	}

	public ionViewWillEnter()
	{
		this.vehicleSettings = this.settingsService.getAll();
	}

	public dismiss()
	{
		this.viewCtrl.dismiss();
	}

	public downloadLog()
	{
		const loading = this.loadingCtrl.create();
		loading.present();
		this.rest.downloadLog(this.dateRange.from, this.dateRange.to).subscribe((blob:Blob) => {
            saveAs(blob, this.getCsvFileName());
            loading.dismiss();
            this.dismiss();
        }, (err:any) => {
        	loading.dismiss();
            this.dismiss();
        });
	}

	private getCsvFileName()
	{
		if (this.vehicleSettings.id) {
			return this.vehicleSettings.id + '.csv';
		}

		return new Date().toLocaleDateString() + '.csv';
	}
}
