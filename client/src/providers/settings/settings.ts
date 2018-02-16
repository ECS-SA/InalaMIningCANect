import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { RestProvider } from '../';

interface Settings
{
	id:string;
	make:string;
	model:string;
}

@Injectable()
export class SettingsProvider
{
	private settings:Settings = {
		id : '',
		make: '',
		model: ''
	};

	public constructor(private rest: RestProvider) {}

	public load()
	{
		this.rest.getSettings().subscribe((response:any) => {
			const settings = response.payload;
			if (settings.id) {
				this.settings.id = settings.id;
			}
			if (settings.make) {
				this.settings.make = settings.make;
			}
			if (settings.model) {
				this.settings.model = settings.model;
			}
		});
	}

	public getAll()
	{
		return this.settings;
	}

	public update(newSettings:Settings):Observable<any>
	{
		return this.rest.updateSettings(newSettings);
	}
}
