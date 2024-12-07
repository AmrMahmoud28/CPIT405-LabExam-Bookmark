<?php

if ($_SERVER['REQUEST_METHOD'] !== 'PUT') {
    header("Allow: PUT");
    http_response_code(405);
    echo json_encode(
        array("message" => "Method Not Allowed")
    );
    return;
}

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: PUT");

include_once "../db/Database.php";
include_once "../models/Bookmark.php";

$database = new Database();
$dbConnection = $database->connect();

$bookmark = new Bookmark($dbConnection);

$data = json_decode(file_get_contents("php://input"), true);
if (!$data || !isset($data['id']) || !isset($data['title'])) {
    http_response_code(422);
    echo json_encode(
        array("message" => "Error missing required parameter bookmarks in the JSON body")
    );
    return;
}

$bookmark->setId($data["id"]);
$bookmark->setTitle($data["title"]);

if ($bookmark->update()) {
    http_response_code(200);
    echo json_encode(
        array("message" => "Bookmark updated successfully")
    );
}
else {
    http_response_code(500);
    echo json_encode(
        array("message" => "Error updating bookmark")
    );
}