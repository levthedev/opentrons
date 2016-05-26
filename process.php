<?php

//stuff form vals into vars
$name = trim($_GET['name']);
$email = trim($_GET['email']);
$message = trim($_GET['message']);

// Don't process if the form is empty.
if ($from=='' && $name=='' && $message=='') {
  die();
}

//construct html email
$to = "info@opentrons.com";
$from = "$name <$email>";
$subject = "You have a new OpenTrons message";
$message = '
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head></head>
<body>
<table>
  <tr>
    <td>'
      . $message .
    '</td>
  </tr>
</table>
</body>
</html>';

$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= "Content-type:text/html;charset=iso-8859-1" . "\r\n";
$headers .= "From: " . $from . "\r\n";
$headers .= "X-Mailer: PHP/".phpversion();

//send it
mail($to,$subject,$message,$headers);

?>
