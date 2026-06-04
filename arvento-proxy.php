<?php
/**
 * HEYU - Arvento API Proxy
 * e-nak.com.tr/arvento-proxy.php
 * 
 * Kurulum: Bu dosyayı e-nak.com.tr web kök dizinine atın.
 * Arvento, sunucu IP'nizi whitelist'e eklemeli (destek@arvento.com)
 */

// CORS - sadece kendi domain'inden istek kabul et
header('Access-Control-Allow-Origin: https://e-nak.com.tr');
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-cache, max-age=30'); // 30 saniye cache

// Arvento kimlik bilgileri
define('ARVENTO_USERNAME', 'emakyapi');
define('ARVENTO_PIN1', 'Ea240685*');
define('ARVENTO_PIN2', 'Ea240685*');
define('ARVENTO_BASE', 'https://ws.arvento.com/api/report');

$action = $_GET['action'] ?? 'vehicles';

switch($action) {
    case 'vehicles':
        echo getVehicles();
        break;
    case 'location':
        $id = $_GET['id'] ?? '';
        echo getVehicleLocation($id);
        break;
    default:
        echo json_encode(['error' => 'unknown_action']);
}

function callArvento($endpoint, $params = []) {
    $baseParams = [
        'username' => ARVENTO_USERNAME,
        'pin1'     => ARVENTO_PIN1,
        'pin2'     => ARVENTO_PIN2,
    ];
    $allParams = array_merge($baseParams, $params);
    $url = ARVENTO_BASE . $endpoint . '?' . http_build_query($allParams);

    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT        => 10,
        CURLOPT_SSL_VERIFYPEER => false,
        CURLOPT_HTTPHEADER     => ['Accept: application/json'],
        CURLOPT_USERAGENT      => 'HEYU-Lojistik/1.0 (e-nak.com.tr)',
    ]);
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error    = curl_error($ch);
    curl_close($ch);

    if ($error) return null;
    if ($httpCode !== 200) return null;
    return $response;
}

function getVehicles() {
    $raw = callArvento('/GetLastLocations');
    if (!$raw) {
        return json_encode(['error' => 'arvento_unreachable', 'hint' => 'IP whitelist gerekli']);
    }

    $data = json_decode($raw, true);
    if (!$data || !is_array($data)) {
        return json_encode(['error' => 'invalid_response', 'raw' => substr($raw, 0, 200)]);
    }

    // Arvento response → HEYU formatı
    $vehicles = array_map(function($v, $i) {
        $speed = floatval($v['Speed'] ?? $v['Hiz'] ?? 0);
        return [
            'id'       => $v['VehicleId'] ?? $v['DeviceId'] ?? ('V' . $i),
            'plaka'    => $v['Plate'] ?? $v['LicensePlate'] ?? $v['VehicleName'] ?? ('Plaka-' . $i),
            'sofor'    => $v['DriverName'] ?? $v['Driver'] ?? ('Sürücü ' . ($i + 1)),
            'arac'     => $v['VehicleModel'] ?? $v['Model'] ?? $v['VehicleType'] ?? 'Araç',
            'tip'      => (stripos($v['VehicleType'] ?? '', 'kamyon') !== false) ? 'Kamyon' : 'TIR',
            'kapasite' => intval($v['Capacity'] ?? 20),
            'lat'      => floatval($v['Latitude'] ?? $v['Lat'] ?? 39.0),
            'lng'      => floatval($v['Longitude'] ?? $v['Lon'] ?? $v['Lng'] ?? 35.0),
            'hiz'      => $speed,
            'durum'    => ($speed > 5) ? 'seferde' : 'musait',
            'puan'     => round(4.5 + (($i % 5) * 0.1), 1),
            'mesafe'   => floatval($v['Distance'] ?? 0),
            'guncelleme' => $v['LastUpdateTime'] ?? $v['UpdateTime'] ?? date('H:i'),
        ];
    }, $data, array_keys($data));

    return json_encode(['ok' => true, 'vehicles' => $vehicles, 'count' => count($vehicles)]);
}

function getVehicleLocation($vehicleId) {
    if (!$vehicleId) return json_encode(['error' => 'no_id']);
    $raw = callArvento('/GetVehicleLocation', ['vehicleId' => $vehicleId]);
    if (!$raw) return json_encode(['error' => 'unreachable']);
    return $raw;
}
