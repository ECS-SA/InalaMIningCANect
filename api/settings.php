<?php

const SETTINGS_FILE_LOCATION = '/mnt/internal_storage/vehicle_settings.json';

function get_settings() {
	if (file_exists(SETTINGS_FILE_LOCATION)) {
		return json_decode(file_get_contents(SETTINGS_FILE_LOCATION), true);
	}
	return false;
}

function update_settings() {
	$data = json_decode(file_get_contents('php://input'), true);
	if (isset($data['settings'])) {
		// Validate all keys exist
		$settings = $data['settings'];
		if (!isset($settings['make'])) {
			$settings['make'] = null;
		}
		if (!isset($settings['model'])) {
			$settings['model'] = null;
		}
		if (!isset($settings['id'])) {
			$settings['id'] = null;
		}
		if (!file_exists(SETTINGS_FILE_LOCATION)) {
			touch(SETTINGS_FILE_LOCATION);
		}

		$retval = file_put_contents(SETTINGS_FILE_LOCATION, json_encode($settings));
		return is_int($retval);
	}

	return false;
}


header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
	echo json_encode(['status' => true, 'payload' => get_settings()]);
	die();
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
	$status = false;
	$message = 'Unable to update settings';
	if (update_settings()) {
		$status = true;
		$message = 'Settings updated';
	}

	echo json_encode(['status' => $status, 'message' => $message]);
	die();
}

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
    // header('Access-Control-Allow-Headers: *');
    header("Content-Length: 0");
    header("Content-Type: text/plain");
	die();
}

echo json_encode(['status' => false, 'message' => 'Unknown request']);
