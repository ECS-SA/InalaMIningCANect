import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'signal-strength',
  templateUrl: 'signal-strength.html'
})
export class SignalStrengthComponent implements OnChanges
{
	@Input() strength:number = 0;

	public barCount:string = 'one';
	public barColor:string = 'red';

	public ngOnChanges()
	{
		if (this.strength >= 80) {
			this.barColor = 'green';
			this.barCount = 'five';
		} else if (this.strength < 80 && this.strength >= 60) {
			this.barColor = 'green';
			this.barCount = 'four';
		} else if (this.strength < 60 && this.strength >= 40) {
			this.barColor = 'yellow';
			this.barCount = 'three';
		} else if (this.strength < 40 && this.strength >= 20) {
			this.barColor = 'red';
			this.barCount = 'two';
		} else {
			this.barColor = 'red';
			this.barCount = 'one';
		}
	}
}