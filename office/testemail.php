<?php
require("includes/sendgrid-php/sendgrid-php.php");

$email = $_GET['email'];

$Semail = new \SendGrid\Mail\Mail(); 
$Semail->setFrom("hello@switchboo.com", "Switchboo");
$Semail->setSubject("Switch confirmation");
$Semail->addTo($email, $email);
$Semail->addContent("text/plain", "Please update your email client to support html.");
$Semail->addContent("text/html", "test content");
$sendgrid = new \SendGrid("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");
try {
    $response = $sendgrid->send($Semail);
    var_dump($response);
} catch (Exception $e) {
    echo 'Caught exception: '. $e->getMessage() ."\n";
}
?>