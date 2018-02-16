import { Component } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ChatWebSocket, VpcaWebSocket } from '../../providers';

import { interval } from 'rxjs/observable/interval';

import {
	PARAM_GROUP,
	MIN_RATE,
	MAX_RATE,
	PARAM_LABELS,
	INTERVAL_RATE,
	GSM_STATUS_CONNECTED,
} from './hardware.constants';

@Component({
  selector: 'page-hardware',
  templateUrl: 'hardware.html',
})
export class HardwarePage
{
	public gsmSignalStrength:any = 0;
	public gsmConnected:boolean = false;

	public gpsSatNum:number = 0;
	public gpsConnected:boolean = false;
	public gpsLocation:any = {lat: '', long: ''};

	public can1Error:boolean = true;
	public can2Error:boolean = true;

	private can1RxCnt:number = 0;
	private can2RxCnt:number = 0;

	private subs:Array<Subscription> = [];

	public constructor(private chat: ChatWebSocket, private vpca:VpcaWebSocket) {}

	public ionViewWillEnter()
	{
		let chatSub = this.chat.messages.subscribe((message:any) => {
			if (message.MGP) {
				this.parseMessage(message.MGP);
			}
		});
		this.subs.push(chatSub);
		this.chat.requestPushGroupValues(PARAM_GROUP, MAX_RATE, MIN_RATE);

		let vpcaSub = this.vpca.messages.subscribe((message:any) => {
			if (message.MGP) {
				this.parseMessage(message.MGP);
			}
		});
		this.subs.push(vpcaSub);
		this.vpca.requestPushGroupValues(PARAM_GROUP, MAX_RATE, MIN_RATE);

		this.initCanBusObservers();
	}

	private initCanBusObservers()
	{
		let lastCan1Cnt = null;
		let can1Sub = interval(INTERVAL_RATE).subscribe(() => {
			if (lastCan1Cnt == null) {
				lastCan1Cnt = this.can1RxCnt;
			} else {
				if (lastCan1Cnt == this.can1RxCnt) {
					this.can1Error = true;
				} else {
					this.can1Error = false;
					lastCan1Cnt = this.can1RxCnt;
				}
			}
		});
		this.subs.push(can1Sub);

		let lastCan2Cnt = null;
		let can2Sub = interval(INTERVAL_RATE).subscribe(() => {
			if (lastCan2Cnt == null) {
				lastCan2Cnt = this.can2RxCnt;
			} else {
				if (lastCan2Cnt == this.can2RxCnt) {
					this.can2Error = true;
				} else {
					this.can2Error = false;
					lastCan2Cnt = this.can2RxCnt;
				}
			}
		});
		this.subs.push(can2Sub);
	}

	public ionViewWillLeave()
	{
		this.subs.forEach(sub => sub.unsubscribe());
	}

	private parseGpsLocationMessage(gpsArray:Array<any>)
	{
		let lat;
		let long;
		gpsArray.forEach((param) => {
			if (param.Lat) {
				lat = param.Lat;
			}
			if (param.Long) {
				long = param.Long;
			}
		});
		return {lat, long};
	}

	private parseMessage(msg:any)
	{
		switch (msg.MGPLabel) {
			case PARAM_LABELS.GSM_STRENGTH:
				this.gsmSignalStrength = msg.ParamVal;
				break;
			case PARAM_LABELS.GSM_CONNECTED:
				let gsmConnected = false;
				if (msg.ParamVal == GSM_STATUS_CONNECTED) {
					gsmConnected = true;
				}
				this.gsmConnected = gsmConnected;
				break;
			case PARAM_LABELS.GPS_LOCATION:
				let gpsConnected = false;
				let latLong = {lat: '', long: ''};

				const gpsVals = this.parseGpsLocationMessage(msg.MGPVals);
				if (gpsVals.lat && gpsVals.lat != 'nan'
					&& gpsVals.long && gpsVals.long != 'nan'
				) {
					gpsConnected = true;
					latLong = {
						lat : Number(gpsVals.lat).toFixed(2),
						long : Number(gpsVals.long).toFixed(2)
					};
				}
				this.gpsLocation = latLong;
				this.gpsConnected = gpsConnected;

				break;
			case PARAM_LABELS.GPS_SATELITTES:
				let satNum = 0;
				if (!isNaN(Number(msg.ParamVal))) {
					satNum = Number(msg.ParamVal);
				}
				this.gpsSatNum = satNum;
				break;
			case PARAM_LABELS.CAN_1_RX_CNT:
				this.can1RxCnt = Number(msg.ParamVal);
				break;
			case PARAM_LABELS.CAN_2_RX_CNT:
				this.can2RxCnt = Number(msg.ParamVal);
				break;
			default:
				break;
		}
	}
}
