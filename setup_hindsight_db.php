<?php
/**
 * BellyBand (Spandan) - Hindsight AI Database Migrator Runner
 * 
 * Executes database_hindsight_migration.sql to create the `hindsight_memories` table
 * while maintaining 100% backward compatibility with existing tables.
 * 
 * Can be run via CLI (`php setup_hindsight_db.php`) or web browser.
 */

require_once __DIR__ . '/config/db.php';

$isCli = (php_sapi_name() === 'cli');

if (!$isCli) {
    header('Content-Type: application/json; charset=utf-8');
}

try {
    $db = getDBConnection();

    $migrationFile = __DIR__ . '/database_hindsight_migration.sql';
    if (!file_exists($migrationFile)) {
        throw new RuntimeException("Migration file not found: {$migrationFile}");
    }

    $sqlContent = file_get_contents($migrationFile);
    if ($sqlContent === false) {
        throw new RuntimeException("Unable to read migration file: {$migrationFile}");
    }

    // Execute the migration script
    $db->exec($sqlContent);

    // Verify table creation
    $checkStmt = $db->query("SHOW TABLES LIKE 'hindsight_memories'");
    $tableExists = ($checkStmt->fetchColumn() !== false);

    $count = 0;
    if ($tableExists) {
        $countStmt = $db->query("SELECT COUNT(*) FROM `hindsight_memories`");
        $count = (int)$countStmt->fetchColumn();
    }

    $response = [
        'success'      => true,
        'message'      => 'Hindsight AI database migration completed successfully.',
        'table'        => 'hindsight_memories',
        'table_exists' => $tableExists,
        'row_count'    => $count,
        'timestamp'    => date('Y-m-d H:i:s')
    ];

    if ($isCli) {
        echo "=========================================================\n";
        echo "  BellyBand - Hindsight Database Migration Runner\n";
        echo "=========================================================\n";
        echo "Status      : SUCCESS\n";
        echo "Table       : hindsight_memories\n";
        echo "Confirmed   : " . ($tableExists ? "Yes (Table is active in MySQL)" : "No") . "\n";
        echo "Row Count   : {$count}\n";
        echo "Message     : " . $response['message'] . "\n";
        echo "=========================================================\n";
    } else {
        echo json_encode($response, JSON_PRETTY_PRINT);
    }
} catch (Throwable $e) {
    $errorResponse = [
        'success'   => false,
        'message'   => 'Migration failed: ' . $e->getMessage(),
        'timestamp' => date('Y-m-d H:i:s')
    ];

    if ($isCli) {
        echo "ERROR: " . $e->getMessage() . "\n";
    } else {
        http_response_code(500);
        echo json_encode($errorResponse, JSON_PRETTY_PRINT);
    }
}
