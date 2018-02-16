<?php

date_default_timezone_set('UTC');

require_once './helpers.php';

function query_log_db() {
	$db = new PDO('sqlite:' . LOG_DB_PATH);
	if (!$db) {
		return false;
	}

	// Get a distinct array of parameter names
	$sql = "SELECT DISTINCT name FROM log";
	$result = $db->query($sql);
	if (empty($result)) {
		return false;
	}

	$names = [];
	foreach ($result as $r) {
		$names[] = $r['name'];
	}

	$sql = "SELECT datetime, name, value
			FROM log
			WHERE datetime != '1970-01-01 00:00:00'
			AND value != 'NULL'";

	// Update query with dates
	if (isset($_GET['start_date'])
		&& isset($_GET['end_date'])
		&& is_valid_date($_GET['start_date'])
		&& is_valid_date($_GET['end_date'])
	) {
		$start_date = $_GET['start_date'];
		$end_date   = $_GET['end_date'];
		$sql .= " AND datetime >= '{$start_date}' AND datetime <= '{$end_date}'";
	}

	$sql .= " ORDER BY datetime ASC";
	$result = $db->query($sql);
	if (empty($result)) {
		return false;
	}

	// Group by 'datetime'
	$parsed = [];
	foreach ($result as $key => $row) {
		$date = convert_date($row['datetime']);
		if (!isset($parsed[$date])) {
			$parsed[$date] = [];
		}
		$parsed[$date][$row['name']] = $row['value'];
	}

	// Validate all parameters exist for each datetime
	$rows = [];
	foreach ($parsed as $datetime => $params) {
		// Sort by the distinct params name array
		$row = [$datetime];

		// Iterate over each parameter name and check if it exists
		foreach ($names as $name) {
			$value = null;
			if (isset($params[$name])) {
				$value = $params[$name];
			}
			$row[] = $value;
		}
		$rows[] = $row;
	}
	// Add datetime to CSV headers
	array_unshift($names, 'datetime');

	// Add the CSV headers to the rows
	array_unshift($rows, $names);

	return $rows;
}

header('Access-Control-Allow-Origin: *');

$rows = query_log_db();
if (!empty($rows)) {
	header('Content-Type: application/csv');
	header('Content-Disposition: attachment');

	$fp = fopen('php://output', 'w');
	foreach ($rows as $line) {
	    fputcsv($fp, $line);
	}
	fclose($fp);
}