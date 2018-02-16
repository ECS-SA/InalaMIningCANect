<?php

const CLIENT_TZ   = 'Africa/Johannesburg';
const LOG_DB_PATH = '/mnt/internal_storage/db/logDB';

function convert_date($date) {
	$default_tz = new DateTimeZone('UTC');
	$utc_date = DateTime::createFromFormat('Y-m-d H:i:s', $date, $default_tz);

	$sa_date = $utc_date;
	$sa_date->setTimeZone(new DateTimeZone(CLIENT_TZ));

	return $sa_date->format('Y-m-d H:i:s');
}

function is_valid_date($date, $format='Y-m-d') {
    $d = DateTime::createFromFormat($format, $date);
    return $d && $d->format($format) == $date;
}
