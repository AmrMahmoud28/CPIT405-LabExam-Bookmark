<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'DELETE') {
    header("Allow: DELETE");
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
if (!$data || !isset($data['id'])) {
    http_response_code(422);
    echo json_encode(
        array("message" => "Error missing required parameter bookmarks in the JSON body")
    );
    return;
}

$bookmark->setId($data["id"]);

if ($bookmark->delete()) {
    http_response_code(200);
    echo json_encode(
        array("message" => "Bookmark deleted successfully")
    );
}
else {
    http_response_code(500);
    echo json_encode(
        array("message" => "Error deleting bookmark")
    );
}