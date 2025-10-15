<?php
header('Content-Type: application/json');

$csvFile = 'events.csv';
$events = [];

if (($handle = fopen($csvFile, "r")) !== FALSE) {
    $headers = fgetcsv($handle, 1000, "|",'"',"\\");
    while (($data = fgetcsv($handle, 1000, "|",'"',"\\")) !== FALSE) {
        $event = array_combine($headers, $data);
        $events[] = $event;
    }
    fclose($handle);
}

echo json_encode($events);
?>
