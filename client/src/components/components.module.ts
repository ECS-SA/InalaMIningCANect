import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { AppHeaderComponent } from './app-header/app-header';
import { SignalStrengthComponent } from './signal-strength/signal-strength';

@NgModule({
	declarations: [AppHeaderComponent, SignalStrengthComponent],
	imports: [IonicModule],
	exports: [AppHeaderComponent, SignalStrengthComponent]
})
export class ComponentsModule {}
