<?php

date_default_timezone_set('UTC');

require_once './helpers.php';

function query_log_db() {
	$db = new PDO('sqlite:' . LOG_DB_PATH);
	if (!$db) {
		return false;
	}

	$sql = "SELECT datetime, name, value
			FROM log
			WHERE name != 'Cell_str'
			AND name != 'Battery_Voltage_SPN_168'
			AND datetime != '1970-01-01 00:00:00'
			AND value != 'NULL'";

	// Update query with dates
	if (isset($_GET['start_date'])
		&& isset($_GET['end_date'])
		&& is_valid_date($_GET['start_date'])
		&& is_valid_date($_GET['end_date'])
	) {
		$start_date = date('Y-m-d H:i:s', strtotime($_GET['start_date']));
		$end_date   = date('Y-m-d H:i:s', strtotime($_GET['end_date']));

		$sql .= " AND date(datetime) >= date('{$start_date}') AND date(datetime) <= date('{$end_date}')";
	} else {
		// Default to last 24 hours
		$start_date = date('Y-m-d H:i:s', strtotime('now -24 hours'));
		$sql .= " AND date(datetime) >= date('{$start_date}')";
	}
	$sql .= " ORDER BY date(datetime) ASC";

	$result = $db->query($sql);
	if (empty($result)) {
		return [
			'data'		=>	[],
			'labels'	=>	[]
		];
	}

	$parsed = [];
	foreach ($result as $key => $row) {
		$date = convert_date($row['datetime']);
		if (!isset($parsed[$date])) {
			$parsed[$date] = [];
		}

		$parsed[$date][] = [
			'name'		=>	$row['name'],
			'value'		=>	$row['value']
		];
	}

	$data = [];
	$labels = [];
	foreach ($parsed as $datetime => $data_points) {

		$labels[] = $datetime;
		foreach ($data_points as $point) {
			if (!isset($data[$point['name']])) {
				$data[$point['name']] = [];
			}
			$data[$point['name']][] = number_format((float)$point['value'], 1, '.', '');
		}
	}

	return [
		'data'		=>	$data,
		'labels'	=>	$labels
	];
}

$status = false;
$payload = [];
if (file_exists(LOG_DB_PATH)) {
	$result = query_log_db();
	if (!empty($result)) {
		$status = true;
		$payload = $result;
	}
}

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
echo json_encode(['status' => $status, 'payload' => $payload]);