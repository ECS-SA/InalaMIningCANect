export const NULL:string = 'NULL';
export const MAX_RATE:number = 100;
export const MIN_RATE:number = 1000;
export const PARAM_GROUP:string = 'J1939_Data';

export const OIL_PRESS_CONFIG:any = {
	renderTo: 'oil-press',
	width: 250,
	height: 250,
	glow: false,
	units: 'kPa',
	title: 'Oil Press',
	minValue: 0,
	maxValue: 1000,
	majorTicks: ['0', '100', '200', '300', '400', '500', '600', '700', '800', '900', '1000'],
	minorTicks: 5,
	strokeTicks: true,
	highlights: [{from: 0, to: 100, color: '#d10606'}],
	colors: {
		plate: '#ffffff',
		majorTicks: '#000000',
		minorTicks: '#343434',
		title: '#343434',
		units: '#343434',
		numbers: 'rgb(0, 0, 0)',
		needle: {
			start: 'rgba(200, 50, 50, .75)',
			end: 'rgba(200, 50, 50, .75)',
			circle: {
				outerStart: 'rgba(0, 0, 0, 1)',
				outerEnd: 'rgba(0, 0, 0, 1)'
			},
			shadowUp: true,
			shadowDown: false
		}
	},
	needle: {
		type: 'arrow',
		width: 2,
		end: 72,
		circle: {
			size: 7,
			inner: false,
			outer: true
		}
	},
	animation: {
		delay: 10,
		duration: 600,
		fn: 'linear'
	}
};

export const ENGINE_TEMP_CONFIG:any = {
	renderTo: 'engine-temp',
	width: 250,
	height: 250,
	glow: false,
	units: 'C',
	title: 'Eng Temp',
	minValue: 0,
	maxValue: 140,
	majorTicks: ['0', '20', '40', '60', '80', '100', '120', '140'],
	minorTicks: 4,
	strokeTicks: true,
	highlights: [{from: 105, to: 140, color: '#d10606'}],
	colors: {
		plate: '#ffffff',
		majorTicks: '#000000',
		minorTicks: '#343434',
		title: '#343434',
		units: '#343434',
		numbers: 'rgb(0, 0, 0)',
		needle: {
			start: 'rgba(200, 50, 50, .75)',
			end: 'rgba(200, 50, 50, .75)',
			circle: {
				outerStart: 'rgba(0, 0, 0, 1)',
				outerEnd: 'rgba(0, 0, 0, 1)'
			},
			shadowUp: true,
			shadowDown: false
		}
	},
	needle: {
		type: 'arrow',
		width: 2,
		end: 72,
		circle: {
			size: 7,
			inner: false,
			outer: true
		}
	},
	animation: {
		delay: 10,
		duration: 600,
		fn: 'linear'
	}
}

export const BATTERY_VOLT_CONFIG:any = {
	renderTo: 'battery-volt',
	width: 250,
	height: 250,
	glow: false,
	units: 'V',
	title: 'Battery Volt',
	minValue: 0,
	maxValue: 36,
	majorTicks: ['6', '12', '18', '24', '30', '36'],
	// minorTicks: 4,
	strokeTicks: true,
	highlights: [{from: 30, to: 36, color: '#d10606'}],
	colors: {
		plate: '#ffffff',
		majorTicks: '#000000',
		minorTicks: '#343434',
		title: '#343434',
		units: '#343434',
		numbers: 'rgb(0, 0, 0)',
		needle: {
			start: 'rgba(200, 50, 50, .75)',
			end: 'rgba(200, 50, 50, .75)',
			circle: {
				outerStart: 'rgba(0, 0, 0, 1)',
				outerEnd: 'rgba(0, 0, 0, 1)'
			},
			shadowUp: true,
			shadowDown: false
		}
	},
	needle: {
		type: 'arrow',
		width: 2,
		end: 72,
		circle: {
			size: 7,
			inner: false,
			outer: true
		}
	},
	animation: {
		delay: 10,
		duration: 600,
		fn: 'linear'
	}
};

export const HYDR_CONFIG:any = {
	renderTo: 'hydr-temp',
	width: 250,
	height: 250,
	glow: false,
	units: 'C',
	title: 'Hydraulic Temp',
	minValue: 20,
	maxValue: 160,
	majorTicks: ['20', '40', '60', '80', '100', '120', '140', '160'],
	minorTicks: 4,
	strokeTicks: true,
	highlights: [{from: 120, to: 160, color: '#d10606'}],
	colors: {
		plate: '#ffffff',
		majorTicks: '#000000',
		minorTicks: '#343434',
		title: '#343434',
		units: '#343434',
		numbers: 'rgb(0, 0, 0)',
		needle: {
			start: 'rgba(200, 50, 50, .75)',
			end: 'rgba(200, 50, 50, .75)',
			circle: {
				outerStart: 'rgba(0, 0, 0, 1)',
				outerEnd: 'rgba(0, 0, 0, 1)'
			},
			shadowUp: true,
			shadowDown: false
		}
	},
	needle: {
		type: 'arrow',
		width: 2,
		end: 72,
		circle: {
			size: 7,
			inner: false,
			outer: true
		}
	},
	animation: {
		delay: 10,
		duration: 600,
		fn: 'linear'
	}
};

export const ENGINE_RPM_CONFIG:any = {
	renderTo: 'engine-rpm',
	width: 550,
	height: 550,
	glow: false,
	units: 'RPM x 100',
	title: 'Engine Speed',
	minValue: 0,
	maxValue: 3000,
	ticksAngle: 275,
	startAngle: 45,
	majorTicks: ['0', '5', '10', '15', '20', '25', '30'],
	minorTicks: 5,
	strokeTicks: true,
	highlights: [{from: 2600, to: 3000, color: '#d10606'}],
	colors: {
		plate: '#ffffff',
		majorTicks: '#000000',
		minorTicks: '#343434',
		title: '#343434',
		units: '#343434',
		numbers: 'rgb(0, 0, 0)',
		needle: {
			start: 'rgba(200, 50, 50, .75)',
			end: 'rgba(200, 50, 50, .75)',
			circle: {
				outerStart: 'rgba(0, 0, 0, 1)',
				outerEnd: 'rgba(0, 0, 0, 1)'
			},
			shadowUp: true,
			shadowDown: false
		}
	},
	needle: {
		type: 'arrow',
		width: 2,
		end: 72,
		circle: {
			size: 6,
			inner: false,
			outer: true
		}
	},
	animation: {
		delay: 0,
		duration: 1,
		fn: 'linear'
	}
};