<?php
header('Content-type:text/html;charset=utf-8');
$images=array('2.png','3.png','1.png','3.png','2.png');
foreach($images as $image){
    $image_fh=fopen($image,'r');
    $image_data=fread($image_fh,filesize($image));
    fclose($image_fh);
    $payloads[]=base64_encode($image_data);
  
}
  $newline=chr(1);
  echo implode($newline,$payloads);
?>