import { Component, Input, OnInit } from '@angular/core';

import { SettingsProvider } from '../../providers'

@Component({
  selector: 'app-header',
  templateUrl: 'app-header.html'
})
export class AppHeaderComponent implements OnInit
{
	@Input() title:string = '';
	@Input() showLogo:boolean = false;
	@Input() showSettings:boolean = true;

	public settings:any;

	public constructor(private settingsService: SettingsProvider) { }

	public ngOnInit()
	{
		this.settings = this.settingsService.getAll();
	}
}
