export const NULL:string = 'NULL';
export const PARAM_GROUP:string = 'Historical_Data';
export const HOURS_MAX:string = '999999999.000000';

export const CHART_COLORS:any = {
	yellow: '#f0bc2f',
	navy: 'rgb(49, 95, 123)',
	gold: '#9c760f',
	purple: '#921d69',
	red: '#b72432',
	aqua: '#c3d4dd',
	black: '#000000'
};

export const POSSIBLE_DATASETS:Array<any> = [
    {
    	param: 'Engine_RPM_SPN_190',
        label: 'Engine RPM',
        yAxisID: 'y-axis-1',
        fill: false,
        backgroundColor: CHART_COLORS.yellow,
        borderColor: CHART_COLORS.yellow,
        data: []
    },
    {
		param : 'Engine_Coolant_Temperature_SPN_110',
		label: 'Engine Temp',
		yAxisID: 'y-axis-1',
		fill: false,
		backgroundColor: CHART_COLORS.gold,
		borderColor: CHART_COLORS.gold,
		data: []
    },
    {
    	param : 'Engine_Oil_Pressure_SPN_100',
		label: 'Oil Pressure',
		yAxisID: 'y-axis-1',
		fill: false,
		backgroundColor: CHART_COLORS.navy,
		borderColor: CHART_COLORS.navy,
		data: []
    },
    {
    	param : 'Hydraulic_Temperature_SPN_1638',
		label: 'Hydraulic Temp',
		yAxisID: 'y-axis-1',
		fill: false,
		backgroundColor: CHART_COLORS.purple,
		borderColor: CHART_COLORS.purple,
		data: []
    },
    {
    	param : 'Engine_Hours_SPN_247',
		label: 'Engine Hours',
		yAxisID: 'y-axis-1',
		fill: false,
		backgroundColor: CHART_COLORS.red,
		borderColor: CHART_COLORS.red,
		data: []
    },
    {
    	param : 'Transmission_Temperature_SPN_177',
		label: 'Trans Temp',
		yAxisID: 'y-axis-1',
		fill: false,
		backgroundColor: CHART_COLORS.aqua,
		borderColor: CHART_COLORS.aqua,
		data: []
    }
];

export function getChartDataSets(labels:Array<any>):Array<any> {
	let dataSets = [];

	POSSIBLE_DATASETS.forEach((obj) => {
		if (labels.indexOf(obj.param) != -1) {
			dataSets.push(obj);
		}
	});

	return dataSets;
}

export function getChartConfig(labels:Array<any>) {
	return {
		plugins: [
			{
				beforeDraw: (chart) => {
					let ticks = chart.scales['x-axis-0'].ticks.length;

					let time = chart.options.scales.xAxes[0].time;
					if (ticks <= 50) {
						time.unit = 'minute';
						time.unitStepSize = 1;
					} else {
						time.unit = 'hour';
						time.unitStepSize = 60;
					}
				}
			}
		],
	    type: 'line',
	    data: {
	    	labels : [],
	        datasets: getChartDataSets(labels)
	    },
	    options: {
	    	spanGaps: false,
        	tooltips: {
                enabled: true,
				mode: 'index',
				axis: 'x'
            },
	        animation : false,
	        maintainAspectRatio: false,
	        legend : {
	        	position: 'bottom'
	        },
	        pan: {
	            enabled: true,
	            mode: 'xy'
	        },
	        zoom: {
	            enabled: true,
	            mode: 'xy',
	        },
	        scales: {
	            xAxes: [{
					type: 'time',
					time : {
				        unit: 'hour',
				        unitStepSize: 60,
				        displayFormats: {
							'millisecond': 'SSS [ms]',
							'second': 'h:mm:ss a', // 11:20:01 AM
							'minute': 'h:mm:ss a', // 11:20:01 AM
							'hour': 'MMM D, hA', // Sept 4, 5PM
							'day': 'MMM Do', // Sep 4 2015
							'week': 'll', // Week 46, or maybe '[W]WW - YYYY' ?
							'month': 'MMM YYYY', // Sept 2015
							'quarter': '[Q]Q - YYYY', // Q3
							'year': 'YYYY', // 2015
				        }
					},
					ticks: {
						source: 'labels',
		                autoSkip : true,
					},
	                scaleLabel: {
	                    display: false
	                }
	            }],
	            yAxes: [
					{
						display: true,
						position: 'left',
						id: 'y-axis-1',
						scaleLabel: {
							display: true,
						},
						ticks: {
							suggestedMin: 0,
							suggestedMax: 1000,
						}
					}
	          	]
	        }
	    }
	};
}