<?php
/**
 * ============================================================================
 * BELLYBAND (SPANDAN) — HINDSIGHT AI MEMORY SERVICE BRIDGE MODULE
 * Hackathon Track: Continuous Maternal Intelligence with Vectorize Hindsight
 * ============================================================================
 *
 * 🧠 Role in Hackathon Architecture:
 * This service acts as the central ingestion and retrieval nerve center.
 * It transforms raw, isolated maternal data into persistent long-term memories:
 * 
 * 1. PATIENT INTERACTIONS: Q&A queries, anxiety disclosures, daily symptom logs.
 * 2. TELEMETRY SENSOR ALERTS: BLE Fetal Doppler heart rate spikes, kick counters.
 * 3. CLINICAL DOCUMENTATION: Ultrasound biometry, OB-GYN consult notes, e-Rx.
 * 4. LONGITUDINAL RECALL: Semantic memory querying with instant local fallback,
 *    outputting pre-formatted prompt context for clinical LLM agents.
 *
 * 🛡️ Graceful Degradation:
 * - Operates seamlessly both with and without active external internet/API keys.
 * - When Hindsight cloud is available, synchronizes via Bearer/x-api-key headers.
 * - When offline or in local dev, records into MySQL `hindsight_memories` table,
 *   guaranteeing zero clinical disruption.
 * ============================================================================
 */

// Load dependencies
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../config/hindsight_config.php';

startAppSession();

/**
 * Class HindsightService
 * Core bridge between BellyBand and Hindsight AI Memory.
 */
class HindsightService {

    /**
     * Ensure the hindsight_memories table exists in the database.
     *
     * @param PDO $db
     * @return void
     */
    public static function ensureTableExists(PDO $db): void {
        static $checked = false;
        if ($checked) {
            return;
        }

        try {
            $db->query("SELECT 1 FROM `hindsight_memories` LIMIT 1");
        } catch (Throwable $e) {
            $migrationFile = __DIR__ . '/../database_hindsight_migration.sql';
            if (file_exists($migrationFile)) {
                $sql = file_get_contents($migrationFile);
                if ($sql) {
                    $db->exec($sql);
                }
            }
        }
        $checked = true;
    }

    /**
     * 1. Store a Patient Interaction Log.
     *
     * @param int $patientId BellyBand user/patient ID
     * @param string $interactionText Full text of interaction (chat, question, or note)
     * @param string $interactionType Channel/type ('chat', 'symptom', 'kick_log', 'general')
     * @param array $extraMetadata Additional contextual metadata
     * @param string|null $timestamp Custom timestamp or null for current time
     * @return array Result containing status, memory ID, and sync details
     */
    public static function logPatientInteraction(
        int $patientId,
        string $interactionText,
        string $interactionType = 'chat',
        array $extraMetadata = [],
        ?string $timestamp = null
    ): array {
        $timestamp = $timestamp ?? date('Y-m-d H:i:s');
        $summary = self::createSummary($interactionText, 250);

        $payload = [
            'content'    => $interactionText,
            'summary'    => $summary,
            'user_id'    => "patient_{$patientId}",
            'patient_id' => $patientId,
            'type'       => $interactionType,
            'timestamp'  => $timestamp,
            'metadata'   => array_merge([
                'category'   => 'patient_interaction',
                'source'     => 'bellyband_patient_app',
                'life_stage' => $extraMetadata['life_stage'] ?? 'pregnant',
            ], $extraMetadata)
        ];

        return self::persistMemory(
            $patientId,
            $payload,
            $interactionType,
            $summary,
            $timestamp
        );
    }

    /**
     * 2. Store a Sensor Alert Summary.
     *
     * @param int $patientId BellyBand user/patient ID
     * @param string $alertType Type of sensor alert ('fetal_heart_rate', 'kick_count', 'blood_pressure', 'contractions')
     * @param string $severity Alert severity ('info', 'mild', 'warning', 'critical')
     * @param string $readingValue Metric reading (e.g. '175 bpm', '140/92 mmHg', '2 kicks/2hr')
     * @param string $description Description or clinical alert narrative
     * @param array $sensorMetadata Hardware, wearable, or threshold data
     * @return array Result containing status, memory ID, and sync details
     */
    public static function logSensorAlert(
        int $patientId,
        string $alertType,
        string $severity,
        string $readingValue,
        string $description,
        array $sensorMetadata = []
    ): array {
        $timestamp = date('Y-m-d H:i:s');
        $headline = "[SENSOR ALERT - " . strtoupper($severity) . "] {$alertType}: {$readingValue}. {$description}";
        $summary = self::createSummary($headline, 250);

        $payload = [
            'content'    => $headline,
            'summary'    => $summary,
            'user_id'    => "patient_{$patientId}",
            'patient_id' => $patientId,
            'type'       => 'sensor_alert',
            'timestamp'  => $timestamp,
            'metadata'   => array_merge([
                'category'      => 'sensor_telemetry',
                'alert_type'    => $alertType,
                'severity'      => strtolower($severity),
                'reading_value' => $readingValue,
                'source'        => 'bellyband_telemetry',
            ], $sensorMetadata)
        ];

        return self::persistMemory(
            $patientId,
            $payload,
            'sensor_alert',
            $summary,
            $timestamp
        );
    }

    /**
     * 3. Store a Clinical Note.
     *
     * @param int $patientId BellyBand user/patient ID
     * @param string $noteContent Comprehensive clinical notes or doctor assessment
     * @param string $providerName Name or role of the healthcare provider
     * @param string $clinicalCategory ('ultrasound', 'consultation', 'diet_plan', 'lab_report', 'prescription')
     * @param array $clinicalMetadata Diagnosis codes, flags, or trimester
     * @return array Result containing status, memory ID, and sync details
     */
    public static function logClinicalNote(
        int $patientId,
        string $noteContent,
        string $providerName = 'Healthcare Provider',
        string $clinicalCategory = 'consultation',
        array $clinicalMetadata = []
    ): array {
        $timestamp = date('Y-m-d H:i:s');
        $headline = "[CLINICAL NOTE - " . ucfirst($clinicalCategory) . " by {$providerName}]\n{$noteContent}";
        $summary = self::createSummary("Clinical assessment by {$providerName}: {$noteContent}", 250);

        $payload = [
            'content'    => $headline,
            'summary'    => $summary,
            'user_id'    => "patient_{$patientId}",
            'patient_id' => $patientId,
            'type'       => 'clinical_note',
            'timestamp'  => $timestamp,
            'metadata'   => array_merge([
                'category'          => 'clinical_documentation',
                'provider_name'     => $providerName,
                'clinical_category' => $clinicalCategory,
                'source'            => 'bellyband_clinical_portal',
            ], $clinicalMetadata)
        ];

        return self::persistMemory(
            $patientId,
            $payload,
            'clinical_note',
            $summary,
            $timestamp
        );
    }

    /**
     * 4. Retrieve Past Context for AI Recall.
     *
     * Queries Hindsight memory API for semantic recall, with seamless local DB fallback/enrichment.
     *
     * @param int $patientId BellyBand user/patient ID
     * @param string|null $query Natural language query (e.g. "Does the patient have blood pressure or gestational diabetes issues?")
     * @param string|null $typeFilter Optional type filter ('chat', 'sensor_alert', 'clinical_note', or null for all)
     * @param int $limit Maximum number of memories to return (default 10, max 50)
     * @param int|null $daysLookback Optional filter for last N days
     * @return array Consolidated context, memory list, and formatted AI prompt snippet
     */
    public static function retrieveContext(
        int $patientId,
        ?string $query = null,
        ?string $typeFilter = null,
        int $limit = 10,
        ?int $daysLookback = null
    ): array {
        $limit = max(1, min(50, $limit));
        $db = getDBConnection();
        self::ensureTableExists($db);

        $remoteMemories = [];
        $hindsightConfig = getHindsightConfig();

        // 1. Attempt remote Hindsight query if API Key is configured and a search query is present
        if (!empty($hindsightConfig['api_key'])) {
            $remotePayload = [
                'user_id' => "patient_{$patientId}",
                'query'   => $query ?? 'recent interactions, symptoms, and alerts',
                'limit'   => $limit,
            ];

            $apiResult = hindsightApiRequest('POST', '/memories/query', $remotePayload);
            if ($apiResult['success'] && !empty($apiResult['data'])) {
                $rawList = $apiResult['data']['memories'] ?? $apiResult['data']['results'] ?? $apiResult['data'] ?? [];
                if (is_array($rawList)) {
                    $remoteMemories = $rawList;
                }
            }
        }

        // 2. Fetch local memories from MySQL table for high speed and offline reliability
        $where = ["`patient_id` = :patient_id"];
        $params = [':patient_id' => $patientId];

        if (!empty($typeFilter) && $typeFilter !== 'all') {
            $where[] = "`interaction_type` = :type";
            $params[':type'] = $typeFilter;
        }

        if (!empty($daysLookback) && $daysLookback > 0) {
            $where[] = "`interaction_timestamp` >= DATE_SUB(NOW(), INTERVAL :days DAY)";
            $params[':days'] = $daysLookback;
        }

        if (!empty($query)) {
            $where[] = "(`summary` LIKE :q1 OR `metadata` LIKE :q2)";
            $params[':q1'] = '%' . $query . '%';
            $params[':q2'] = '%' . $query . '%';
        }

        $sql = "SELECT `id`, `patient_id`, `hindsight_memory_id`, `interaction_timestamp`, `interaction_type`, `summary`, `metadata` 
                FROM `hindsight_memories` 
                WHERE " . implode(' AND ', $where) . " 
                ORDER BY `interaction_timestamp` DESC 
                LIMIT " . (int)$limit;

        $localMemories = [];
        try {
            $stmt = $db->prepare($sql);
            $stmt->execute($params);
            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

            foreach ($rows as $row) {
                $decodedMeta = json_decode($row['metadata'] ?? '', true);
                $localMemories[] = [
                    'id'                    => (int)$row['id'],
                    'patient_id'            => (int)$row['patient_id'],
                    'hindsight_memory_id'   => $row['hindsight_memory_id'],
                    'interaction_timestamp' => $row['interaction_timestamp'],
                    'interaction_type'      => $row['interaction_type'],
                    'summary'               => $row['summary'],
                    'metadata'              => $decodedMeta ?? $row['metadata'],
                    'source'                => 'local_database'
                ];
            }
        } catch (Throwable $e) {
            error_log("Error retrieving local hindsight memories: " . $e->getMessage());
        }

        // 3. Consolidate results (prefer local full records + remote annotations)
        $consolidated = $localMemories;

        // If local had fewer results, append remote items
        if (count($consolidated) < $limit && !empty($remoteMemories)) {
            $knownIds = array_column($consolidated, 'hindsight_memory_id');
            foreach ($remoteMemories as $rm) {
                $rmId = $rm['id'] ?? $rm['memory_id'] ?? null;
                if ($rmId && !in_array($rmId, $knownIds, true)) {
                    $consolidated[] = [
                        'patient_id'            => $patientId,
                        'hindsight_memory_id'   => $rmId,
                        'interaction_timestamp' => $rm['timestamp'] ?? date('Y-m-d H:i:s'),
                        'interaction_type'      => $rm['type'] ?? 'remote',
                        'summary'               => $rm['summary'] ?? $rm['content'] ?? 'Memory item',
                        'metadata'              => $rm['metadata'] ?? [],
                        'source'                => 'hindsight_cloud'
                    ];
                    $knownIds[] = $rmId;
                    if (count($consolidated) >= $limit) {
                        break;
                    }
                }
            }
        }

        // 4. Build a pre-formatted context prompt ready for LLM consumption
        $promptLines = [
            "=== PATIENT HISTORICAL MEMORY CONTEXT (Patient ID #{$patientId}) ==="
        ];

        if (empty($consolidated)) {
            $promptLines[] = "No prior recorded interactions or clinical alerts found.";
        } else {
            foreach ($consolidated as $idx => $m) {
                $num = $idx + 1;
                $time = $m['interaction_timestamp'] ?? 'Unknown date';
                $type = strtoupper($m['interaction_type'] ?? 'INFO');
                $sum = $m['summary'] ?? '';
                $promptLines[] = "{$num}. [{$time}] [{$type}]: {$sum}";
            }
        }
        $promptLines[] = "=== END CONTEXT ===";

        return [
            'success'                 => true,
            'patient_id'              => $patientId,
            'total_count'             => count($consolidated),
            'memories'                => $consolidated,
            'formatted_context_prompt'=> implode("\n", $promptLines),
            'remote_synced'           => !empty($hindsightConfig['api_key']),
        ];
    }

    /**
     * Core persistence method: transmits memory to Hindsight API and indexes into local database.
     *
     * @param int $patientId
     * @param array $hindsightPayload
     * @param string $interactionType
     * @param string $summary
     * @param string $timestamp
     * @return array
     */
    private static function persistMemory(
        int $patientId,
        array $hindsightPayload,
        string $interactionType,
        string $summary,
        string $timestamp
    ): array {
        $db = getDBConnection();
        self::ensureTableExists($db);

        $hindsightConfig = getHindsightConfig();
        $memoryId = null;
        $remoteSuccess = false;
        $remoteError = null;

        // Step 1: Send to Hindsight API if credentials are provided
        if (!empty($hindsightConfig['api_key'])) {
            $apiResult = hindsightApiRequest('POST', '/memories', $hindsightPayload);
            if ($apiResult['success']) {
                $remoteSuccess = true;
                $data = $apiResult['data'];
                if (is_array($data)) {
                    $memoryId = $data['id'] ?? $data['memory_id'] ?? $data['data']['id'] ?? null;
                }
            } else {
                $remoteError = $apiResult['error'] ?? 'API request failed';
            }
        }

        // Step 2: Fallback deterministic ID if offline or API key not yet set
        if (empty($memoryId)) {
            $memoryId = 'mem_bb_' . $patientId . '_' . substr(md5($summary . microtime(true)), 0, 16);
        }

        // Step 3: Record into MySQL `hindsight_memories` table
        $localInserted = false;
        try {
            $metadataJson = json_encode(array_merge(
                $hindsightPayload['metadata'] ?? [],
                [
                    'remote_synced' => $remoteSuccess,
                    'remote_error'  => $remoteError,
                    'full_content'  => $hindsightPayload['content'] ?? null,
                ]
            ), JSON_UNESCAPED_UNICODE);

            $stmt = $db->prepare("
                INSERT INTO `hindsight_memories` 
                  (`patient_id`, `hindsight_memory_id`, `interaction_timestamp`, `interaction_type`, `summary`, `metadata`)
                VALUES 
                  (:patient_id, :memory_id, :ts, :type, :summary, :metadata)
                ON DUPLICATE KEY UPDATE 
                  `interaction_timestamp` = VALUES(`interaction_timestamp`),
                  `summary` = VALUES(`summary`),
                  `metadata` = VALUES(`metadata`),
                  `updated_at` = CURRENT_TIMESTAMP
            ");

            $stmt->execute([
                ':patient_id' => $patientId,
                ':memory_id'  => $memoryId,
                ':ts'         => $timestamp,
                ':type'       => $interactionType,
                ':summary'    => mb_substr($summary, 0, 500),
                ':metadata'   => $metadataJson,
            ]);

            $localInserted = true;
        } catch (Throwable $e) {
            error_log("Failed to insert memory mapping into database: " . $e->getMessage());
            return [
                'success'    => false,
                'message'    => 'Database error while saving memory mapping: ' . $e->getMessage(),
                'memory_id'  => $memoryId,
                'patient_id' => $patientId
            ];
        }

        return [
            'success'             => $localInserted,
            'message'             => $remoteSuccess 
                                     ? 'Memory successfully ingested into Hindsight and local database.' 
                                     : 'Memory saved to local database (Hindsight remote sync pending API key/connection).',
            'hindsight_memory_id' => $memoryId,
            'patient_id'          => $patientId,
            'interaction_type'    => $interactionType,
            'timestamp'           => $timestamp,
            'remote_synced'       => $remoteSuccess,
            'remote_notice'       => $remoteError
        ];
    }

    /**
     * Helper to create a clean preview snippet/summary.
     */
    private static function createSummary(string $text, int $maxLength = 250): string {
        $clean = trim(preg_replace('/\s+/', ' ', strip_tags($text)));
        if (mb_strlen($clean) <= $maxLength) {
            return $clean;
        }
        return mb_substr($clean, 0, $maxLength - 3) . '...';
    }
}

// ── HTTP API REST ENDPOINT ROUTER ───────────────────────────────────────────
// Execute only when this file is requested directly via HTTP
if (php_sapi_name() !== 'cli' && basename($_SERVER['SCRIPT_FILENAME'] ?? '') === 'hindsight_service.php') {
    header('Content-Type: application/json; charset=utf-8');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit;
    }

    try {
        $method = $_SERVER['REQUEST_METHOD'];
        $action = $_GET['action'] ?? $_POST['action'] ?? '';

        // Read JSON input body if present
        $rawInput = file_get_contents('php://input');
        $jsonData = json_decode($rawInput, true) ?? [];
        if (!empty($jsonData['action'])) {
            $action = $jsonData['action'];
        }

        // Helper to resolve patient ID from request or authenticated session
        $resolvePatientId = function() use ($jsonData): int {
            $raw = $_GET['patient_id'] ?? $_POST['patient_id'] ?? $jsonData['patient_id'] ?? $_SESSION['user_id'] ?? 1;
            if (is_numeric($raw) && (int)$raw > 0) {
                return (int)$raw;
            }
            // For string patient codes like 'FP-101' or names, map to default user 1 while preserving raw in metadata
            return !empty($_SESSION['user_id']) ? (int)$_SESSION['user_id'] : 1;
        };

        switch ($action) {
            // Diagnostic connection test: GET /api/hindsight_service.php?action=test_connection
            case 'test_connection':
            case 'ping':
                $connTest = testHindsightConnection();
                $db = getDBConnection();
                HindsightService::ensureTableExists($db);
                $stmt = $db->query("SELECT COUNT(*) FROM `hindsight_memories`");
                $localCount = (int)$stmt->fetchColumn();

                echo json_encode([
                    'success'            => true,
                    'service'            => 'Bellyband Hindsight AI Memory Service',
                    'hindsight_api_test' => $connTest,
                    'local_table'        => 'hindsight_memories',
                    'local_memory_count' => $localCount,
                    'timestamp'          => date('Y-m-d H:i:s')
                ], JSON_PRETTY_PRINT);
                exit;

            // 1. Log Patient Interaction: POST /api/hindsight_service.php?action=log_interaction
            case 'log_interaction':
            case 'store_interaction':
                if ($method !== 'POST') {
                    throw new InvalidArgumentException("Action '{$action}' requires POST method.");
                }

                $patientId = $resolvePatientId();
                $content = $jsonData['content'] ?? $_POST['content'] ?? $jsonData['message'] ?? $_POST['message'] ?? '';
                if (empty($content)) {
                    throw new InvalidArgumentException("Missing 'content' parameter for patient interaction log.");
                }

                $type = $jsonData['interaction_type'] ?? $_POST['interaction_type'] ?? 'chat';
                $meta = $jsonData['metadata'] ?? [];
                $timestamp = $jsonData['timestamp'] ?? $_POST['timestamp'] ?? null;

                $res = HindsightService::logPatientInteraction($patientId, $content, $type, $meta, $timestamp);
                echo json_encode($res, JSON_PRETTY_PRINT);
                exit;

            // 2. Log Sensor Alert: POST /api/hindsight_service.php?action=log_sensor_alert
            case 'log_sensor_alert':
            case 'store_sensor_alert':
                if ($method !== 'POST') {
                    throw new InvalidArgumentException("Action '{$action}' requires POST method.");
                }

                $patientId = $resolvePatientId();
                $alertType = $jsonData['alert_type'] ?? $_POST['alert_type'] ?? 'general_telemetry';
                $severity = $jsonData['severity'] ?? $_POST['severity'] ?? 'warning';
                $readingValue = $jsonData['reading_value'] ?? $_POST['reading_value'] ?? 'N/A';
                $description = $jsonData['description'] ?? $_POST['description'] ?? $jsonData['summary'] ?? 'Sensor threshold anomaly detected';
                $meta = $jsonData['metadata'] ?? [];

                $res = HindsightService::logSensorAlert($patientId, $alertType, $severity, $readingValue, $description, $meta);
                echo json_encode($res, JSON_PRETTY_PRINT);
                exit;

            // 3. Log Clinical Note: POST /api/hindsight_service.php?action=log_clinical_note
            case 'log_clinical_note':
            case 'store_clinical_note':
                if ($method !== 'POST') {
                    throw new InvalidArgumentException("Action '{$action}' requires POST method.");
                }

                $patientId = $resolvePatientId();
                $content = $jsonData['content'] ?? $_POST['content'] ?? $jsonData['note'] ?? $_POST['note'] ?? '';
                if (empty($content)) {
                    throw new InvalidArgumentException("Missing 'content' or 'note' for clinical documentation.");
                }

                $providerName = $jsonData['provider_name'] ?? $_POST['provider_name'] ?? 'Attending Clinician';
                $category = $jsonData['category'] ?? $_POST['category'] ?? 'consultation';
                $meta = $jsonData['metadata'] ?? [];

                $res = HindsightService::logClinicalNote($patientId, $content, $providerName, $category, $meta);
                echo json_encode($res, JSON_PRETTY_PRINT);
                exit;

            // 4. Retrieve Context: GET /api/hindsight_service.php?action=get_context
            case 'get_context':
            case 'retrieve_context':
                $patientId = $resolvePatientId();
                $query = $_GET['query'] ?? $jsonData['query'] ?? null;
                $typeFilter = $_GET['type'] ?? $jsonData['type'] ?? null;
                $limit = (int)($_GET['limit'] ?? $jsonData['limit'] ?? 10);
                $days = !empty($_GET['days']) ? (int)$_GET['days'] : (!empty($jsonData['days']) ? (int)$jsonData['days'] : null);

                $res = HindsightService::retrieveContext($patientId, $query, $typeFilter, $limit, $days);
                echo json_encode($res, JSON_PRETTY_PRINT);
                exit;

            default:
                http_response_code(400);
                echo json_encode([
                    'success'           => false,
                    'message'           => 'Invalid or missing action parameter.',
                    'available_actions' => [
                        'GET  ?action=ping (or test_connection)',
                        'POST ?action=log_interaction (requires: content, optional: patient_id, interaction_type, metadata)',
                        'POST ?action=log_sensor_alert (requires: alert_type, severity, reading_value, description, optional: patient_id)',
                        'POST ?action=log_clinical_note (requires: content, optional: provider_name, category, patient_id)',
                        'GET  ?action=get_context (optional: patient_id, query, type, limit, days)',
                    ]
                ], JSON_PRETTY_PRINT);
                exit;
        }
    } catch (Throwable $e) {
        http_response_code(400);
        echo json_encode([
            'success'   => false,
            'message'   => $e->getMessage(),
            'timestamp' => date('Y-m-d H:i:s')
        ], JSON_PRETTY_PRINT);
        exit;
    }
}

// ── CLI RUNNER ──────────────────────────────────────────────────────────────
if (php_sapi_name() === 'cli' && basename(__FILE__) === basename($_SERVER['PHP_SELF'] ?? '')) {
    echo "=========================================================\n";
    echo "  BellyBand (Spandan) - Hindsight AI Service Module\n";
    echo "=========================================================\n";
    echo "Service Status: Active & Ready\n";

    $db = getDBConnection();
    HindsightService::ensureTableExists($db);
    $stmt = $db->query("SELECT COUNT(*) FROM `hindsight_memories`");
    $totalMemories = (int)$stmt->fetchColumn();

    echo "Local Table   : hindsight_memories (Total records: {$totalMemories})\n";
    echo "API Endpoints Available:\n";
    echo " - POST ?action=log_interaction\n";
    echo " - POST ?action=log_sensor_alert\n";
    echo " - POST ?action=log_clinical_note\n";
    echo " - GET  ?action=get_context\n";
    echo " - GET  ?action=test_connection\n";
    echo "=========================================================\n";
}
