import { Component, ViewChild, HostListener } from '@angular/core';

import { LoadingController, ModalController, AlertController } from 'ionic-angular';

import { RestProvider, VpcaWebSocket, SettingsProvider } from '../../providers';

import { Subscription } from 'rxjs/Subscription';

import { FileDownloadModalPage } from '../';

import Chart from 'chart.js';

import { CalendarModal, CalendarModalOptions, CalendarResult } from 'ion2-calendar';

import { getChartConfig, PARAM_GROUP } from './historical-data.constants';

const getCalendarStartDate = () => {
	const startDate = new Date();
	startDate.setMonth(startDate.getMonth() - 1);
	return startDate;
};

@Component({
  selector: 'page-historical-data',
  templateUrl: 'historical-data.html',
})
export class HistoricalDataPage
{
	@ViewChild('lineCanvas') lineCanvas;

	// Window resize event
	@HostListener('window:resize', ['$event'])
	public onResize(event) {
		// Resize the line chart
		if (this.lineChart) {
			this.lineChart.resize();
		}
	}

	public vehicleSettings:any = {};

	private lineChart: Chart;
	private chartConfig:any;

	private subs:Array<Subscription> = [];

	public constructor(
		private rest: RestProvider,
		private vpca: VpcaWebSocket,
		private loadingCtrl: LoadingController,
		private modalCtrl: ModalController,
		private alertCtrl: AlertController,
		private settingsService:SettingsProvider
	) {

	}

	public ionViewWillEnter()
	{
		// Initialize VPCA to fetch parameter meta data
		this.initWebSocket();

		// Fetch vehicle settings
		this.vehicleSettings = this.settingsService.getAll();
	}

	private initWebSocket()
	{
		let sub = this.vpca.messages.subscribe((message:any) => {
			// Handle meta data response
			if (message.MGPMG && message.MGPMG == PARAM_GROUP) {
				this.parseParameterMeta(message.Values);
			}
		});
		this.subs.push(sub);
		this.vpca.requestPushGroupMeta(PARAM_GROUP);
	}

	private parseParameterMeta(values:Array<any>)
	{
		// Create array of parameter labels
		let paramLabels = values.map((v) => v.MGPM.MGPMLabel);
		if (paramLabels.length) {
			// Create the chart config
			this.chartConfig = getChartConfig(paramLabels);
			// Create the Chart
			this.lineChart = new Chart(this.lineCanvas.nativeElement, this.chartConfig);
			// Make the API request, load the data
			this.loadHistoricalData();
		} else {
			this.showErrorAlert('Unable to get parameter list');
		}
	}

	public openDownloadModal()
	{
		this.modalCtrl.create(FileDownloadModalPage).present();
	}

	public resetZoom()
	{
		this.lineChart.resetZoom();
	}

	public openCalendar()
	{
		const options: CalendarModalOptions = {
			pickMode: 'range',
			title: 'Select Date Range',
			from: getCalendarStartDate()
		};

		let myCalendar = this.modalCtrl.create(CalendarModal, {
			options: options
		});

		myCalendar.present();

		myCalendar.onDidDismiss((date: { from: CalendarResult; to: CalendarResult }, type: string) => {
			if (date != null) {
				this.loadHistoricalData(date.from.string, date.to.string);
			}
		});
	}

	public loadHistoricalData(startDate?:string, endDate?:string)
	{
		let loading = this.loadingCtrl.create();
		loading.present();

		let sub = this.rest.getHistoricalData(startDate, endDate).subscribe((result:any) => {
			if (result.status && result.payload && Object.keys(result.payload).length) {
				this.parseHistoricalData(result.payload);
			} else {
				this.showErrorAlert('Unable to fetch historical data');
			}

			loading.dismiss();
		}, (error:any) => {
			this.showErrorAlert('CANect module error');
			loading.dismiss();
		});

		this.subs.push(sub);
	}

	private showErrorAlert(msg:string)
	{
		this.alertCtrl.create({
			title: 'Error',
			subTitle: msg,
			buttons: ['Ok']
		}).present();
	}

	private parseHistoricalData(payload:any)
	{
		if (payload.data) {
			let dataPoints = payload.data;

			// Get an array of the object keys that are the param labels -> iterate over each
			Object.keys(dataPoints).forEach((key) => {
				// Find the dataset by the param label
				let dataSet = this.chartConfig.data.datasets.find((obj) => obj.param == key);
				// Update the dataset
				if (dataSet) {
					dataSet.data = dataPoints[key];
				}
			});
		}

		if (payload.labels) {
			this.chartConfig.data.labels = payload.labels;
		}

		this.lineChart.resetZoom();
		this.lineChart.update();
	}

	public ionViewWillLeave()
	{
		this.subs.forEach(sub => sub.unsubscribe());
	}
}
