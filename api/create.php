<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header("Allow: POST");
    http_response_code(405);
    echo json_encode(
        array("message" => "Method Not Allowed")
    );
    return;
}

include_once "../db/Database.php";
include_once "../models/Bookmark.php";

$database = new Database();
$dbConnection = $database->connect();

$bookmark = new Bookmark($dbConnection);

$data = json_decode(file_get_contents("php://input"), true);
if (!$data || !isset($data['title']) || !isset($data['link'])) {
    http_response_code(422);
    echo json_encode(
        array("message" => "Error missing required parameter bookmarks in the JSON body")
    );
    return;
}

// CREATE
$bookmark->setTitle($data["title"]);
$bookmark->setLink($data["link"]);
if ($bookmark->create()) {
    http_response_code(201);
    echo json_encode(
        array("message" => "Bookmark created successfully")
    );
} else {
    http_response_code(500);
    echo json_encode(
        array("message" => "Error creating bookmark")
    );
}
