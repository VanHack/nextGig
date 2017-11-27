<?php
$urlBase= "https://rest.bandsintown.com/artists/";
$appId = "1234";

$method     = isset($_GET["method"]) ? $_GET["method"] : "artist";
$artistName = isset($_POST["txArtistName"]) ? $_POST["txArtistName"] : "";
//$artistName = "jason mraz";

$response = "";
if ($method == 'artist')
	$response = file_get_contents($urlBase.$artistName.'?app_id='.$appId);
else
	$response = file_get_contents('https://rest.bandsintown.com/artists/'.$artistName.'/events?app_id='.$appId);

echo $response;

?>