<?php
/**
 * ============================================================================
 * BELLYBAND (SPANDAN) — HINDSIGHT AI MEMORY CONFIGURATION & CONNECTION
 * Hackathon Track: Hindsight AI Memory Integration (Vectorize)
 * ============================================================================
 *
 * 🎯 Hackathon Problem Statement & Solution:
 * In maternal healthcare, data is fragmented across clinics, rural ASHA visits,
 * wearable BLE Doppler sensors, and mother symptom logs. A doctor seeing a mother
 * today at 138/88 mmHg often misses that this is her 3rd week-over-week BP spike
 * following a Week 24 fetal tachycardia episode.
 *
 * Hindsight AI Memory (https://hindsight.vectorize.io/) bridges this episodic
 * blind spot. It acts as a longitudinal memory bank that ingests, cross-correlates,
 * and semantically recalls health context across all maternal stages.
 *
 * 🛡️ Resilience & Fallback Architecture:
 * - Reads credentials from $_ENV, getenv(), $_SERVER, or local .env file.
 * - If HINDSIGHT_API_KEY is missing, the app NEVER crashes: it switches to a
 *   resilient local fallback mode, indexing memories in MySQL `hindsight_memories`.
 * - Auto-detects Windows/WAMP CA bundles (cacert.pem) and resolves IPv4 to avoid
 *   DNS timeout pitfalls on local development machines.
 * ============================================================================
 */

// Prevent direct unauthenticated web access
if (php_sapi_name() !== 'cli' && basename($_SERVER['SCRIPT_FILENAME'] ?? '') === 'hindsight_config.php') {
    $allowed = isset($_GET['test_connection']) && defined('HINDSIGHT_ALLOW_WEB_TEST') && HINDSIGHT_ALLOW_WEB_TEST === true;
    if (!$allowed) {
        http_response_code(403);
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode([
            'success' => false,
            'message' => 'Direct access to configuration file is forbidden.'
        ]);
        exit;
    }
}

/**
 * Lightweight .env file parser to load environment variables without external dependencies.
 * Searches for .env in project root or custom path.
 *
 * @param string|null $filePath Path to .env file
 * @return bool True if loaded, false otherwise
 */
function loadHindsightEnv(?string $filePath = null): bool {
    static $loaded = false;
    if ($loaded) {
        return true;
    }

    if ($filePath === null) {
        $projectRoot = dirname(__DIR__);
        $candidatePaths = [
            $projectRoot . DIRECTORY_SEPARATOR . '.env',
            __DIR__ . DIRECTORY_SEPARATOR . '.env',
        ];
        foreach ($candidatePaths as $path) {
            if (file_exists($path) && is_readable($path)) {
                $filePath = $path;
                break;
            }
        }
    }

    if (!$filePath || !file_exists($filePath) || !is_readable($filePath)) {
        return false;
    }

    $lines = file($filePath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    if ($lines === false) {
        return false;
    }

    foreach ($lines as $line) {
        $line = trim($line);
        // Skip comment lines
        if ($line === '' || strpos($line, '#') === 0) {
            continue;
        }

        // Parse KEY=VALUE
        $parts = explode('=', $line, 2);
        if (count($parts) === 2) {
            $key = trim($parts[0]);
            $val = trim($parts[1]);

            // Strip surrounding quotes if present
            if ((strpos($val, '"') === 0 && substr($val, -1) === '"') ||
                (strpos($val, "'") === 0 && substr($val, -1) === "'")) {
                $val = substr($val, 1, -1);
            }

            // Only set if not already set in environment
            if (getenv($key) === false) {
                putenv("{$key}={$val}");
            }
            if (!isset($_ENV[$key])) {
                $_ENV[$key] = $val;
            }
            if (!isset($_SERVER[$key])) {
                $_SERVER[$key] = $val;
            }
        }
    }

    $loaded = true;
    return true;
}

// Attempt to load .env on file include
loadHindsightEnv();

/**
 * Helper to fetch an environment variable from multiple global sources.
 *
 * @param string $key Variable name
 * @param mixed $default Fallback value
 * @return mixed
 */
function getHindsightEnvVar(string $key, $default = null) {
    $val = getenv($key);
    if ($val !== false && $val !== '') {
        return $val;
    }
    if (isset($_ENV[$key]) && $_ENV[$key] !== '') {
        return $_ENV[$key];
    }
    if (isset($_SERVER[$key]) && $_SERVER[$key] !== '') {
        return $_SERVER[$key];
    }
    return $default;
}

/**
 * Auto-detect a valid CA bundle on Windows/WAMP environments if PHP curl.cainfo is unset.
 *
 * @return string|null Path to cacert.pem if available
 */
function findHindsightCaBundle(): ?string {
    $custom = getHindsightEnvVar('HINDSIGHT_CA_BUNDLE');
    if (!empty($custom) && file_exists($custom)) {
        return $custom;
    }

    $iniCurl = ini_get('curl.cainfo');
    if (!empty($iniCurl) && file_exists($iniCurl)) {
        return $iniCurl;
    }

    $iniSsl = ini_get('openssl.cafile');
    if (!empty($iniSsl) && file_exists($iniSsl)) {
        return $iniSsl;
    }

    // Common WAMP / Windows certificate locations
    $candidates = [
        'C:/wamp64/apps/phpmyadmin5.2.1/vendor/composer/ca-bundle/res/cacert.pem',
        'C:/wamp64/bin/php/cacert.pem',
        'C:/wamp/bin/php/cacert.pem',
        dirname(__DIR__) . '/config/cacert.pem',
    ];

    foreach ($candidates as $candidate) {
        if (file_exists($candidate)) {
            return $candidate;
        }
    }

    return null;
}

/**
 * Retrieve the Hindsight AI configuration array.
 * Values are resolved from environment variables first, falling back to secure defaults.
 *
 * @return array
 */
function getHindsightConfig(): array {
    // Secure configuration array fallback
    // In production, prioritize setting credentials via environment variables or .env
    $secureDefaults = [
        'api_key'         => '',                                   // Fallback API key if not using environment variables
        'base_url'        => 'https://hindsight.vectorize.io',     // Hindsight API base URL
        'project_id'      => '',                                   // Optional project / collection ID
        'timeout'         => 15,                                   // cURL timeout in seconds
        'connect_timeout' => 10,                                   // cURL connect timeout in seconds
        'ssl_verify'      => true,                                 // Verify SSL certificate
    ];

    $apiKey = getHindsightEnvVar('HINDSIGHT_API_KEY', $secureDefaults['api_key']);
    $baseUrl = rtrim(getHindsightEnvVar('HINDSIGHT_BASE_URL', $secureDefaults['base_url']), '/');
    $projectId = getHindsightEnvVar('HINDSIGHT_PROJECT_ID', $secureDefaults['project_id']);
    $timeout = (int) getHindsightEnvVar('HINDSIGHT_TIMEOUT', $secureDefaults['timeout']);
    $connectTimeout = (int) getHindsightEnvVar('HINDSIGHT_CONNECT_TIMEOUT', $secureDefaults['connect_timeout']);
    
    $sslVerifyVar = getHindsightEnvVar('HINDSIGHT_SSL_VERIFY');
    $sslVerify = ($sslVerifyVar !== null)
        ? filter_var($sslVerifyVar, FILTER_VALIDATE_BOOLEAN)
        : $secureDefaults['ssl_verify'];

    return [
        'api_key'         => $apiKey,
        'base_url'        => $baseUrl,
        'project_id'      => $projectId,
        'timeout'         => $timeout > 0 ? $timeout : 15,
        'connect_timeout' => $connectTimeout > 0 ? $connectTimeout : 10,
        'ssl_verify'      => $sslVerify,
        'ca_bundle'       => findHindsightCaBundle(),
    ];
}

/**
 * Get Hindsight API Key securely.
 *
 * @return string
 */
function getHindsightApiKey(): string {
    $config = getHindsightConfig();
    return (string) ($config['api_key'] ?? '');
}

/**
 * Get Hindsight Base URL.
 *
 * @return string
 */
function getHindsightBaseUrl(): string {
    $config = getHindsightConfig();
    return (string) ($config['base_url'] ?? 'https://hindsight.vectorize.io');
}

/**
 * Perform a cURL connection test to the Hindsight API.
 *
 * @param string|null $apiKey Optional override for API key
 * @param string|null $baseUrl Optional override for Base URL
 * @param string $endpoint Specific endpoint path to test (e.g. '' or '/health')
 * @return array Test results containing status, HTTP code, timing, and response
 */
function testHindsightConnection(?string $apiKey = null, ?string $baseUrl = null, string $endpoint = ''): array {
    if (!function_exists('curl_init')) {
        return [
            'success'   => false,
            'http_code' => 0,
            'message'   => 'PHP cURL extension is not enabled on this server.',
            'error'     => 'cURL extension missing',
            'response'  => null,
            'endpoint'  => '',
        ];
    }

    $config = getHindsightConfig();
    $key = $apiKey !== null ? $apiKey : $config['api_key'];
    $base = rtrim($baseUrl !== null ? $baseUrl : $config['base_url'], '/');
    $url = $base . ($endpoint !== '' ? '/' . ltrim($endpoint, '/') : '/');

    $headers = [
        'Accept: application/json',
        'User-Agent: Bellyband-Spandan-Hindsight/1.0',
    ];

    if (!empty($key)) {
        $headers[] = 'Authorization: Bearer ' . $key;
        $headers[] = 'x-api-key: ' . $key;
    }

    $ch = curl_init();
    $options = [
        CURLOPT_URL            => $url,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER     => $headers,
        CURLOPT_TIMEOUT        => $config['timeout'],
        CURLOPT_CONNECTTIMEOUT => $config['connect_timeout'],
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_MAXREDIRS      => 3,
        CURLOPT_NOSIGNAL       => 1,
        CURLOPT_IPRESOLVE      => defined('CURL_IPRESOLVE_V4') ? CURL_IPRESOLVE_V4 : 1,
    ];

    if ($config['ssl_verify']) {
        $options[CURLOPT_SSL_VERIFYPEER] = true;
        $options[CURLOPT_SSL_VERIFYHOST] = 2;
        if (!empty($config['ca_bundle'])) {
            $options[CURLOPT_CAINFO] = $config['ca_bundle'];
        }
    } else {
        $options[CURLOPT_SSL_VERIFYPEER] = false;
        $options[CURLOPT_SSL_VERIFYHOST] = 0;
    }

    curl_setopt_array($ch, $options);

    $startTime = microtime(true);
    $responseBody = curl_exec($ch);
    $durationMs = round((microtime(true) - $startTime) * 1000, 2);

    $curlErrorNo = curl_errno($ch);
    $curlErrorMsg = curl_error($ch);
    $httpCode = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    // Network / cURL level failure
    if ($curlErrorNo !== 0) {
        return [
            'success'     => false,
            'http_code'   => 0,
            'duration_ms' => $durationMs,
            'message'     => "cURL connection error ({$curlErrorNo}): {$curlErrorMsg}",
            'error'       => $curlErrorMsg,
            'response'    => null,
            'endpoint'    => $url,
            'api_key_set' => !empty($key),
        ];
    }

    // Attempt to decode JSON response
    $decodedResponse = null;
    if ($responseBody !== false && $responseBody !== '') {
        $decodedResponse = json_decode($responseBody, true);
        if (json_last_error() !== JSON_ERROR_NONE) {
            $decodedResponse = $responseBody; // fallback to raw string preview
        }
    }

    // Determine status:
    // 2xx = Connection & Request successful
    // 401 / 403 = Connection established to API, but auth failed (bad or missing key)
    // 404 = Reached server, endpoint not found
    $isSuccess = ($httpCode >= 200 && $httpCode < 300);

    if ($isSuccess) {
        $message = "Successfully connected to Hindsight API (HTTP {$httpCode}).";
    } elseif ($httpCode === 401 || $httpCode === 403) {
        $message = "Connected to Hindsight API, but authentication failed (HTTP {$httpCode}). Please verify HINDSIGHT_API_KEY.";
    } elseif ($httpCode >= 400 && $httpCode < 500) {
        $message = "Connected to Hindsight API server, received client error (HTTP {$httpCode}).";
    } elseif ($httpCode >= 500) {
        $message = "Connected to Hindsight API server, received server error (HTTP {$httpCode}).";
    } else {
        $message = "Received HTTP code {$httpCode} from {$url}.";
    }

    return [
        'success'     => $isSuccess,
        'http_code'   => $httpCode,
        'duration_ms' => $durationMs,
        'message'     => $message,
        'error'       => $isSuccess ? null : "HTTP status {$httpCode}",
        'response'    => $decodedResponse,
        'endpoint'    => $url,
        'api_key_set' => !empty($key),
    ];
}

/**
 * Generic Hindsight API request helper (GET, POST, PUT, DELETE).
 * Ready for storing, querying, or recalling AI memory items in Hindsight.
 *
 * @param string $method HTTP method (GET, POST, PUT, DELETE)
 * @param string $endpoint API endpoint path (e.g. '/memories' or '/query')
 * @param array $payload Request payload data
 * @param array|null $customConfig Optional custom config overrides
 * @return array Structured response ['success' => bool, 'http_code' => int, 'data' => mixed, 'error' => ?string]
 */
function hindsightApiRequest(string $method, string $endpoint, array $payload = [], ?array $customConfig = null): array {
    $config = $customConfig ?? getHindsightConfig();

    if (empty($config['api_key'])) {
        return [
            'success'   => false,
            'http_code' => 0,
            'data'      => null,
            'error'     => 'Hindsight API Key is not configured. Set HINDSIGHT_API_KEY in environment or .env file.'
        ];
    }

    $url = rtrim($config['base_url'], '/') . '/' . ltrim($endpoint, '/');
    $ch = curl_init();

    $headers = [
        'Authorization: Bearer ' . $config['api_key'],
        'x-api-key: ' . $config['api_key'],
        'Accept: application/json',
        'User-Agent: Bellyband-Spandan-Hindsight/1.0',
    ];

    $method = strtoupper($method);
    $options = [
        CURLOPT_URL            => $url,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT        => $config['timeout'],
        CURLOPT_CONNECTTIMEOUT => $config['connect_timeout'],
        CURLOPT_CUSTOMREQUEST  => $method,
        CURLOPT_NOSIGNAL       => 1,
        CURLOPT_IPRESOLVE      => defined('CURL_IPRESOLVE_V4') ? CURL_IPRESOLVE_V4 : 1,
    ];

    if ($config['ssl_verify']) {
        $options[CURLOPT_SSL_VERIFYPEER] = true;
        $options[CURLOPT_SSL_VERIFYHOST] = 2;
        if (!empty($config['ca_bundle'])) {
            $options[CURLOPT_CAINFO] = $config['ca_bundle'];
        }
    } else {
        $options[CURLOPT_SSL_VERIFYPEER] = false;
        $options[CURLOPT_SSL_VERIFYHOST] = 0;
    }

    if (in_array($method, ['POST', 'PUT', 'PATCH']) && !empty($payload)) {
        $jsonData = json_encode($payload);
        $headers[] = 'Content-Type: application/json';
        $options[CURLOPT_POSTFIELDS] = $jsonData;
    }

    $options[CURLOPT_HTTPHEADER] = $headers;
    curl_setopt_array($ch, $options);

    $responseBody = curl_exec($ch);
    $curlErrorNo = curl_errno($ch);
    $curlErrorMsg = curl_error($ch);
    $httpCode = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($curlErrorNo !== 0) {
        return [
            'success'   => false,
            'http_code' => 0,
            'data'      => null,
            'error'     => "cURL error ({$curlErrorNo}): {$curlErrorMsg}"
        ];
    }

    $decoded = json_decode($responseBody, true);
    $data = (json_last_error() === JSON_ERROR_NONE) ? $decoded : $responseBody;

    return [
        'success'   => ($httpCode >= 200 && $httpCode < 300),
        'http_code' => $httpCode,
        'data'      => $data,
        'error'     => ($httpCode >= 200 && $httpCode < 300) ? null : "HTTP Error {$httpCode}"
    ];
}

// CLI test runner: execute with `php config/hindsight_config.php`
if (php_sapi_name() === 'cli' && basename(__FILE__) === basename($_SERVER['PHP_SELF'] ?? '')) {
    echo "=========================================================\n";
    echo "  BellyBand (Spandan) - Hindsight AI Connection Test\n";
    echo "=========================================================\n";

    $config = getHindsightConfig();
    echo "Target URL   : " . $config['base_url'] . "\n";
    echo "API Key Set  : " . (!empty($config['api_key']) ? 'YES (' . substr($config['api_key'], 0, 4) . '...' . substr($config['api_key'], -4) . ')' : 'NO (Empty/Not Configured)') . "\n";
    echo "Project ID   : " . (!empty($config['project_id']) ? $config['project_id'] : '(None)') . "\n";
    echo "CA Bundle    : " . (!empty($config['ca_bundle']) ? $config['ca_bundle'] : '(System Default)') . "\n";
    echo "Testing connection...\n";

    $result = testHindsightConnection();

    echo "Result Status: " . ($result['success'] ? "SUCCESS" : "NOTICE / FAILED") . "\n";
    echo "HTTP Code    : " . $result['http_code'] . "\n";
    echo "Response Time: " . ($result['duration_ms'] ?? 0) . " ms\n";
    echo "Message      : " . $result['message'] . "\n";
    if (!empty($result['error'])) {
        echo "Details/Error: " . $result['error'] . "\n";
    }
    echo "=========================================================\n";
}
