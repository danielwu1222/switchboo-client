<?php
require_once ('includes/db.php');
if(!isset($_SESSION['email'])) {
  header("Location: login.php");
}

session_destroy();
header("Location: login.php");


?>