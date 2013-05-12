<?php
	// File Name: proxy.php
	if (!isset($_GET['url'])) die();
	$url = urldecode($_GET['url']);
	if(preg_match('/^https?:\/\//', $url))
		echo file_get_contents($url);
?>