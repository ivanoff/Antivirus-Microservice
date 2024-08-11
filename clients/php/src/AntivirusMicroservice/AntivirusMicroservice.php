<?php

class AntivirusMicroservice {
    private $baseUrl;

    public function __construct($baseUrl = 'http://localhost:3000') {
        $this->baseUrl = $baseUrl;
    }

    public function checkFile($filePath) {
        if (!file_exists($filePath)) {
            return ['ok' => false, 'viruses' => ['File not found']];
        }

        $curl = curl_init();
        $postFields = [
            'file' => new CURLFile($filePath)
        ];

        curl_setopt_array($curl, [
            CURLOPT_URL => $this->baseUrl,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => $postFields
        ]);

        $response = curl_exec($curl);
        $httpCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);

        if ($httpCode !== 200) {
            curl_close($curl);
            return ['ok' => false, 'viruses' => ['Error checking file']];
        }

        curl_close($curl);
        return json_decode($response, true);
    }
}
