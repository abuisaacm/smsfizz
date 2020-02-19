<?php
//Parent cronjob for sending SMS to all numbers from SMSFIZZ
$start = microtime(true);
$file = 'sms_log.txt';
  // Open the file to get existing content
  //$current = file_get_contents($file);
  $current = "";
$con = mysqli_connect("localhost","smsfizz","d3v3l0p3r","smsfizz"); 
//$con = mysqli_connect("localhost","root","","smsfizz"); 
if (mysqli_connect_errno())
  {
  $current .="Failed to connect to MySQL: " . mysqli_connect_error();
  }
  

 	$api_id = "OTQ5NjcyODYwNg";
	$senderid = "FMNCOL";
  	$result = mysqli_query($con,"SELECT * FROM numbers INNER JOIN sms ON `numbers`.`sms_id`= `sms`.`id` WHERE `numbers`.`status` = '0' LIMIT 250");
  	while($row = $result->fetch_assoc()){
  	
		$numbers = $row['number'];	
		$mess = $row['message'];
		$message =urlencode("$mess");
		$port = "TA"; 
		$url="https://app.smsbits.in/api/user?id=OTQ5NjcyODYwNg&senderid=$senderid&to=$numbers&msg=$message&port=TA"; 
		echo $url.'<br/>';
		$response = curl($url);
                mysqli_query($con,"UPDATE numbers SET response = $response, status = 1 WHERE `n_id` = '".$row['n_id']."'");
		// Append a new person to the file
		$current .= $url."\n";
		$current .= $response."\n";

		
		
	}
	$time_elapsed_secs = microtime(true) - $start;
        $current .= $time_elapsed_secs;
	// Write the contents back to the file
	file_put_contents($file, $current.PHP_EOL , FILE_APPEND | LOCK_EX);
	fclose($file);
	echo $response;


function curl($url) 
	{
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
	$data = curl_exec($ch);
	curl_close($ch);
	return $data;
	}

?>