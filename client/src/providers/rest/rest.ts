/* tslint:disable */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, RequestOptions, ResponseContentType, URLSearchParams } from '@angular/http';

import { ENV } from '@app/env';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';

// Enumeration of API endpoints
const enum API_ENDPOINTS
{
	DEMO = 'demo.php',
	HISTORICAL_DATA = 'historical-data.php',
	LOG_DOWNLOAD = 'download-log.php',
	SETTINGS = 'settings.php'
}

@Injectable()
export class RestProvider
{
	public constructor(private http: Http) {}

	public getHistoricalData(startDate?:string, endDate?:string)
	{
		let opts = new RequestOptions();
		if (startDate && endDate) {
			let query = this.buildDateSearchParams(startDate, endDate);
			opts.params = query;
		}

		return this.getRequest(this.buildUrl(API_ENDPOINTS.HISTORICAL_DATA), opts);
	}

	public downloadLog(startDate?:string, endDate?:string)
	{
		// The return value will be a blob
	    let options = new RequestOptions({ responseType: ResponseContentType.Blob });

	    // Check if start and end dates are provided
	    if (startDate && endDate) {
	    	// Build query string parameters
	    	options.params = this.buildDateSearchParams(startDate, endDate);
	    }

	    let url = this.buildUrl(API_ENDPOINTS.LOG_DOWNLOAD);
	    return this.http.get(url, options)
	        .map(res => res.blob())
	        .catch((error:any) => Observable.throw(this.handleRequestError(error)));
	}

	public getSettings()
	{
		return this.getRequest(this.buildUrl(API_ENDPOINTS.SETTINGS));
	}

	public updateSettings(settings:any):Observable<any>
	{
		return this.http.post(this.buildUrl(API_ENDPOINTS.SETTINGS), {settings})
			.map(res => res.json())
			.catch((error:any) => Observable.throw(this.handleRequestError(error)));
	}

	private buildDateSearchParams(startDate:string, endDate:string)
	{
		// Build query string parameters
		let params = new URLSearchParams();
		params.set('start_date', startDate);
		params.set('end_date', endDate);
		return params;
	}

	private getRequest(url:string, options?:any):Observable<any>
	{
		let opts = options || {};
		return this.http.get(url, opts)
			.map(res => res.json())
			.catch((error:any) => Observable.throw(this.handleRequestError(error)));
	}

	private handleRequestError(error)
	{
		console.warn(`RestProvider.handleRequestError: ${error}`);
		return error;
	}

	private buildUrl(path:string)
	{
		return ENV.API_URL + path;
	}
}