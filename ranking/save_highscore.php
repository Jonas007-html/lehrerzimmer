<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = file_get_contents('php://input');
    $player = json_decode($data, true);

    if (json_last_error() === JSON_ERROR_NONE) {
        $file = 'highscore.json';

        if (file_exists($file)) {
            $json = file_get_contents($file);
            $rankings = json_decode($json, true);
        } else {
            $rankings = [];
        }

        $rankings[] = $player;
        usort($rankings, function($a, $b) {
            return $b['score'] - $a['score'];
        });

        file_put_contents($file, json_encode($rankings, JSON_PRETTY_PRINT));
        echo 'Highscore erfolgreich gespeichert!';
    } else {
        echo 'Invalid JSON';
    }
} else {
    echo 'Invalid request method';
}
?>