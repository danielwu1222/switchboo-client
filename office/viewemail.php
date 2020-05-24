<?php
require_once ('includes/db.php');
if(!isset($_SESSION['email'])) {
  header("Location: login.php");
}

if (!isset($_GET['id']) || empty($_GET['id'])) {
    header("Location: users.php");
}

$ID = $_GET['id'];

$switch = DB::queryFirstRow("SELECT * FROM tblswitchhistory WHERE ID=%i", $ID);

if ($switch == null) {
    header("Location: users.php");
}

$template = $switch['template'];
echo utf8_encode($template);





?>


