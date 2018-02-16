export const NULL:string = 'NULL';
export const MAX_RATE:number = 100;
export const MIN_RATE:number = 1000;
export const PARAM_GROUP:string = 'Hardware_Data';

export const enum PARAM_LABELS {
	GSM_CONNECTED = 'Cell_connect',
	GSM_STRENGTH = 'Cell_str',
	GPS_SATELITTES = 'GPS_sat',
	GPS_GROUNDSPEED = 'GPS_gs',
	CAN_1_ERROR = 'CAN1_bus_err',
	CAN_2_ERROR = 'CAN2_bus_err',
	GSP_HEADING = 'GPS_head',
	GPS_LOCATION = 'Location',
	VRN = 'VRN',
	ESN = 'ESN',
	SIM_ID = 'Sim_Id',
	CAN_1_RX_CNT = 'CAN1_RX_cnt',
	CAN_2_RX_CNT = 'CAN2_RX_cnt'
};

export const GSM_STATUS_CONNECTED = 1;
export const CAN_BUS_OK = 0;
export const INTERVAL_RATE = 5000;