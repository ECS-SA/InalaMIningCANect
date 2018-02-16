import { Component, HostListener } from '@angular/core';

import { VpcaWebSocket } from '../../providers';

import { Subscription } from 'rxjs/Subscription';

import Gauge from 'canvas-gauges';

import {
	OIL_PRESS_CONFIG,
	ENGINE_RPM_CONFIG,
	ENGINE_TEMP_CONFIG,
	BATTERY_VOLT_CONFIG,
	HYDR_CONFIG,
	PARAM_GROUP,
	MIN_RATE,
	MAX_RATE
} from './gauges.constants';

@Component({
  selector: 'page-gauges',
  templateUrl: 'gauges.html',
})
export class GaugesPage
{
	// Window resize event
	@HostListener('window:resize', ['$event'])
	public onResize(event) {
		//
	}

	// Left column gauges
	private oilPressGauge:any;
	private engineTempGauge:any;

	// Center gauge
	private engineRpmGauge:any;

	// Right column gauges
	private batteryVoltGauge:any;
	private hydrTempGauge:any;

	private vpcaSubscription:Subscription;

	public engineHours:number = 0;

	public constructor(private vpca: VpcaWebSocket)
	{
	}

	public ionViewWillEnter()
	{
		this.initGauges();

		this.vpcaSubscription = this.vpca.messages.subscribe((message:any) => {
			if (message.MGP) {
				this.parseParameterValueMessage(message.MGP);
			}
		});

		this.vpca.requestPushGroupValues(PARAM_GROUP, MAX_RATE, MIN_RATE);
	}

	private initGauges()
	{
		this.oilPressGauge = new Gauge.RadialGauge(OIL_PRESS_CONFIG);
		this.oilPressGauge.draw();
		console.log(this.oilPressGauge);

		this.batteryVoltGauge = new Gauge.RadialGauge(BATTERY_VOLT_CONFIG);
		this.batteryVoltGauge.draw();

		this.engineTempGauge = new Gauge.RadialGauge(ENGINE_TEMP_CONFIG);
		this.engineTempGauge.draw();

		this.engineRpmGauge = new Gauge.RadialGauge(ENGINE_RPM_CONFIG);
		this.engineRpmGauge.draw();

		this.hydrTempGauge = new Gauge.RadialGauge(HYDR_CONFIG);
		this.hydrTempGauge.draw();
	}

	private parseParameterValueMessage(msg:any)
	{
		let paramLabel = msg.MGPLabel;
		let paramValue = msg.ParamVal;

		if (isNaN(paramValue)) {
			return;
		}

		paramValue = Number(paramValue);

		switch (paramLabel) {
			case 'Battery_Voltage_SPN_168':
				if (this.batteryVoltGauge) {
					this.batteryVoltGauge.value = paramValue;
					this.batteryVoltGauge.draw();
				}
				break;
			case 'Engine_RPM_SPN_190':
				if (this.engineRpmGauge) {
					this.engineRpmGauge.value = paramValue;
					this.engineRpmGauge.draw();
				}
				break;
			case 'Engine_Coolant_Temperature_SPN_110':
				if (this.engineTempGauge) {
					this.engineTempGauge.value = paramValue;
					this.engineTempGauge.draw();
				}
				break;
			case 'Engine_Oil_Pressure_SPN_100':
				if (this.oilPressGauge) {
					this.oilPressGauge.value = paramValue;
					this.oilPressGauge.draw();
				}
				break;
			case 'Hydraulic_Temperature_SPN_1638':
				if (this.hydrTempGauge) {
					this.hydrTempGauge.value = paramValue;
					this.hydrTempGauge.draw();
				}
				break;

			case 'Engine_Hours_SPN_247':
				this.engineHours = paramValue;

			default:
				break;
		}
	}

	public ionViewWillLeave()
	{
		this.vpcaSubscription.unsubscribe();
	}
}
