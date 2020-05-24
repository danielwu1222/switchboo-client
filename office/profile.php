<?php
require_once ('includes/db.php');
require("includes/sendgrid-php/sendgrid-php.php");
if(!isset($_SESSION['email'])) {
  header("Location: login.php");
}

if (!isset($_GET['id']) || empty($_GET['id'])) {
    header("Location: users.php");
}



//updatestatus
//newstatus
if (isset($_POST['updatestatus']) && !empty($_POST['newstatus'])) {
    $val = $_POST['newstatus'];  
    DB::insertUpdate('tblstatus', array(
      'userID' => $_GET['id'], 
      'userStatus' => $val
    ));
}

if (isset($_POST['cancelswitch']) && !empty($_POST['userid'])) {
    $val = $_POST['userid'];  
    $canceledMessage = "switch canceled by " . $_SESSION['email'] . " per customers request";
    DB::insert('tblswitchhistory', array(
    'ID' => 0,
    'userID' => intval($val),
    'switchFailed' => 1,
    'failedReason' => $canceledMessage,
    'entryDate' => DB::sqleval("NOW()")
    ));
    
    DB::update('tblswitch', array(
    'nextSwitchDate' => null
    ), "ID=%i", $_GET['id']);
}


if (isset($_POST['deleteuser']) && !empty($_POST['userid'])) {
    $val = $_POST['userid']; 
    DB::delete('tblswitch', "ID=%i", intval($val));
}



if (isset($_POST['editname']) && !empty($_POST['name'])) {
    $val = $_POST['name'];  
    DB::update('tblcustomercontact', array('contactData' => $val), "contactType=%s AND userID=%i", 'name', $_GET['id']);
}

if (isset($_POST['editnote']) && !empty($_POST['noteid']) && !empty($_POST['notebody'])) {
    $val = $_POST['notebody'];  
    DB::update('tblnotes', array('message' => $val), "ID=%i", intval($_POST['noteid']));
}



if (isset($_POST['editphone']) && !empty($_POST['phoneid'])) {
    $val = $_POST['phone'];  
    DB::update('tblcustomercontact', array('contactData' => $val), "ID=%i", intval($_POST['phoneid']));
}



if (isset($_POST['editaddress']) && !empty($_POST['address'])) {
    $val = $_POST['address'];  
    DB::update('tblcustomercontact', array('contactData' => $val), "contactType=%s AND userID=%i", 'address', $_GET['id']);
}
             
         
if (isset($_POST['deletepost']) && !empty($_POST['noteid'])) {
    $noteid = $_POST['noteid'];
    DB::delete('tblnotes', "ID=%i", $noteid);
}         


if (isset($_POST['note']) && !empty($_POST['message'])) {
    $message = $_POST['message'];
    
    $admin = DB::queryFirstRow("SELECT * FROM tblusers WHERE email=%s", $_SESSION['email']);
    if ($admin != null) {
    $adminID = $admin['ID'];
        
        
    DB::insert('tblnotes', array(
        'ID' => 0,
        'userID' => $_GET['id'],
        'adminID' => $adminID,  
        'message' => $message,
        'dateCreated' => DB::sqleval("NOW()")
    ));
    }
}



if (isset($_POST['name']) && !empty($_POST['fullname'])) {
    $name = $_POST['fullname'];
    DB::insert('tblcustomercontact', array(
        'ID' => 0,
        'userID' => $_GET['id'],
        'contactType' => "name",  
        'contactData' => $name
    ));
}


if (isset($_POST['address']) && !empty($_POST['newaddress'])) {
    $address = $_POST['newaddress'];
    DB::insert('tblcustomercontact', array(
        'ID' => 0,
        'userID' => $_GET['id'],
        'contactType' => "address",  
        'contactData' => $address
    ));
}


if (isset($_POST['phone']) && !empty($_POST['newphone'])) {
    $phone = $_POST['newphone'];
    DB::insert('tblcustomercontact', array(
        'ID' => 0,
        'userID' => $_GET['id'],
        'contactType' => "phone",  
        'contactData' => $phone
    ));
}



$ID = $_GET['id'];
$account = DB::queryFirstRow("SELECT * FROM tblswitch WHERE ID=%i", $ID);

if ($account == null) {
    header("Location: users.php");
}

$canMarket = $account['canMarket'];
$postcode = $account['postcode'];
$email = $account['email'];
$uuid = $account['uuid'];
$nextSwitchDate = $account['nextSwitchDate'];
$dateCreated = $account['dateCreated'];


if (isset($_POST['resendswitch']) && !empty($_POST['switchid'])) {
    $val = $_POST['switchid'];
    
    $sTemplate = DB::queryFirstRow("SELECT * FROM tblswitchhistory WHERE ID=%i", $val);
    if ($sTemplate != null) {
        $nameIsQuestion = false;
        $haveName = true;
        $emailTemplate = $sTemplate['template'];    

        $Semail = new \SendGrid\Mail\Mail(); 
        $Semail->setFrom("hello@switchboo.com", "Switchboo");
        $Semail->setSubject("Switch confirmation");
        $Semail->addTo($email, $email);
        $Semail->addContent("text/plain", "Please update your email client to support html.");
        $Semail->addContent("text/html", utf8_encode($emailTemplate));
        $sendgrid = new \SendGrid("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");
        try {
            $response = $sendgrid->send($Semail);
        } catch (Exception $e) {
            echo 'Caught exception: '. $e->getMessage() ."\n";
        }
    }
    
}

$hasRegistration = false;
$hasQuestions = false;
$hasFormOne = false;
$hasNotes = false;
$hasHistory = false;

DB::query("SELECT * FROM tblquestions WHERE userID=%i", $ID);
$questionCount = DB::count();
if ($questionCount > 0) {
    $hasQuestions = true;
}  

DB::query("SELECT * FROM tblformone WHERE userID=%i", $ID);
$formOneCount = DB::count();
if ($formOneCount > 0) {
    $hasFormOne = true;
} 

DB::query("SELECT * FROM tblnotes WHERE userID=%i", $ID);
$noteCount = DB::count();
if ($noteCount > 0) {
    $hasNotes = true;
} 

DB::query("SELECT * FROM tblswitchhistory WHERE userID=%i", $ID);
$historyCount = DB::count();
if ($historyCount > 0) {
    $hasHistory = true;
}




$haveName = false;
$name = "";
$nameIsQuestion = true;

$haveAddress = false;
$address = "";
$addressIsQuestion = true;

$havePhoneNumber = false;
$phoneNumber = "";
$phoneIsQuestion = true;

if ($hasQuestions == true) {
    
$questionResults = DB::query("SELECT * FROM tblquestions WHERE userID=%i", $ID);
 
if ($questionResults != null) {
    $firstName = "";
    $lastName = "";
    foreach ($questionResults as $row) {
        if ($row['qChild'] == "firstName") {
            $haveName = true;
            $firstName = json_decode($row['qData']);
        }    
        
        if ($row['qChild'] == "surname") {
            $haveName = true;
            $lastName = json_decode($row['qData']);
        }
        
        if ($row['qParent'] == "supplyAddress" && $row['qChild'] == "knownAddress") {
            $haveAddress = true;
            $address = json_decode($row['qData']);
            
            $tempAddr = explode("||||", $address);
            if ($tempAddr[0] != null) {
                $pos = strpos($tempAddr[0], "|");
                if ($pos !== false) {
                    $tempAddr = substr_replace($tempAddr[0], "", $pos, strlen("|"));
                }
                $address = str_replace("||", ", ", $tempAddr);
                $address = str_replace("|", ", ", $address);
            }
            
            
            
        }
        
        if ($row['qParent'] == "eveningPhoneNumber" && $row['qChild'] == "phoneNumber") {
            $havePhoneNumber = true;
            $phoneNumber = json_decode($row['qData']);
        }
        
        if ($row['qParent'] == "daytimePhoneNumber" && $row['qChild'] == "phoneNumber") {
            $havePhoneNumber = true;
            $phoneNumber = json_decode($row['qData']);
        }   
    }
    
    $name = $firstName . " " . $lastName;
}
        
}

$customerDetails = DB::queryFirstRow("SELECT * FROM tblcustomercontact WHERE contactType = 'name' and userID=%i", $ID);
if ($customerDetails != null && $haveName == false) {
    $nameIsQuestion = false;
    $haveName = true;
    $name = $customerDetails['contactData'];    
}


$customerDetails = DB::queryFirstRow("SELECT * FROM tblcustomercontact WHERE contactType = 'address' and userID=%i", $ID);
if ($customerDetails != null && $haveAddress == false) {
    $addressIsQuestion = false;
    $haveAddress = true;
    $address = $customerDetails['contactData'];    
}
?>



<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Switchboo Backoffice</title>
  <!-- Tell the browser to be responsive to screen width -->
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <!-- Font Awesome -->
  <link rel="stylesheet" href="plugins/fontawesome-free/css/all.min.css">
  <!-- Ionicons -->
  <link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">
  <!-- Theme style -->
  <link rel="stylesheet" href="dist/css/adminlte.min.css">
  <link rel="stylesheet" href="style.css">
  <!-- Google Font: Source Sans Pro -->
  <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700" rel="stylesheet">
</head>
    
    
<style>
    .delete-btn {
        display: inline;
        float: right;
        margin-right: 5px;
        font-size: 14px;
    }    
    
    .edit-btn {
        display: inline;
        float: right;
        font-size: 14px;
    }
    
    .note-btns {
    position: absolute;
    right: 1.1rem;
    width: 100%;
    margin-top: -10px;
    }
    
    .phone {
            margin-left: 10px;
    }
    
    
</style>    
    
<body class="hold-transition sidebar-mini">
<div class="wrapper">
  <!-- Navbar -->
  <nav class="main-header navbar navbar-expand navbar-white navbar-light">
    <!-- Left navbar links -->
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" data-widget="pushmenu" href="#"><i class="fas fa-bars"></i></a>
      </li>
    </ul>

    

</nav>
  <!-- /.navbar -->

      <?php
        require_once ('includes/sidebar.php');
      ?>
  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>Profile</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active">User Profile</li>
            </ol>
          </div>
        </div>
      </div><!-- /.container-fluid -->
    </section>

    <!-- Main content -->
    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-3">

            <!-- Profile Image -->
            <div class="card card-primary card-outline">
              <div class="card-body box-profile">

                <h3 class="profile-username text-center">
                <?php  
                  if ($haveName) {
                      echo $name;
                  } else {
                      echo $email;
                  }
                  ?>
                  </h3>

                <p class="text-muted text-center"></p>

                <ul class="list-group list-group-unbordered mb-3">
                    
                <?php
                    if ($nextSwitchDate != null) {
                        echo '<li class="list-group-item"><b>Next Switch</b><p><a class="float-left">' . $nextSwitchDate . '</a></p></li>';
                    } else {
                        echo '<li class="list-group-item"><b>Not Switched</b></li>';
                    }
                    
                    
                    if ($nextSwitchDate != null) {
                        $ehlData = DB::queryFirstRow("SELECT * FROM tblswitchhistory where EHL is not NULL and userID=%i order by entryDate desc", $ID);
                        echo '<li class="list-group-item"><b>Switch ID</b><p><a class="float-left">' . $ehlData['EHL'] . '</a></p></li>';
                    } else {
                        echo '<li class="list-group-item"><b>User ID</b><p><a class="float-left">' . $ID . '</a></p></li>';
                    } 
                    
                    ?>
                    <li class="list-group-item"><b>Status</b><p><a class="float-left">
                    <form class="form-horizontal" method="post">
                        <div class="input-group input-group-sm mb-0"><?php
                            $ustatus = DB::queryFirstRow("SELECT * FROM tblstatus where userID=%i", $ID);
                            if ($nextSwitchDate != null) {
                             echo '<input class="form-control" value="Switched" form-control-sm" name="newstatus">';
                            } else if ($ustatus != null) {
                            echo '<input class="form-control" value="' . $ustatus['userStatus'] . '" form-control-sm" name="newstatus">';
                            } else {
                            echo '<input class="form-control" value="Registered" form-control-sm" name="newstatus">';
                            }
                            ?><div class="input-group-append">
                                <button type="submit" class="btn btn-success" name="updatestatus">Save</button>
                            </div>
                        </div>
                    </form>
                    </a></p></li> 
                    
                    
                
                </ul>

              </div>
              <!-- /.card-body -->
            </div>
            <!-- /.card -->

            <!-- About Me Box -->
            <div class="card card-primary">
              <div class="card-header">
                <h3 class="card-title">Details</h3>
              </div>
              <!-- /.card-header -->
              <div class="card-body">
                <strong><i class="fas fa-user mr-1"></i>Full Name
                  
                <?php
                if (!$nameIsQuestion) {
                    echo '<a id="name" class="btn btn-warning btn-sm"><i class="ion ion-android-create"></i></a>';
                }        
                ?>
                  
                </strong>

                <p class="text-muted">
                <?php    
                  if ($haveName) {
                      echo '<span id="name-val">' . $name . '</span>';
                  } else {
                ?>
                <form class="form-horizontal" method="post">
                    <div class="input-group input-group-sm mb-0">
                        <input class="form-control form-control-sm" placeholder="name" name="fullname">
                        <div class="input-group-append">
                            <button type="submit" class="btn btn-success" name="name">Add</button>
                        </div>
                    </div>
                </form>
                    
                    <?php
                  }
                ?>    
                </p>
                <hr>

                <strong><i class="fas fa-map-marker-alt mr-1"></i>Address
                
                <?php
                if (!$addressIsQuestion) {
                    echo '<a id="address" class="btn btn-warning btn-sm"><i class="ion ion-android-create"></i></a>';
                }        
                ?>
                
                </strong>

                <p class="text-muted">
                    <?php
                    if ($haveAddress) {
                        echo '<span id="address-val">' . $address . '</span>';
                    } else {
                    ?>
                    <form class="form-horizontal" method="post">
                        <div class="input-group input-group-sm mb-0">
                            <input class="form-control form-control-sm" placeholder="address" name="newaddress">
                            <div class="input-group-append">
                                <button type="submit" class="btn btn-success" name="address">Add</button>
                            </div>
                        </div>
                    </form>
                    <?php
                    }
                    
                    ?>
                </p>

                <hr>

                <strong><i class="fas fa-phone mr-1"></i>Contact Numbers
                   
                
                </strong>

                <p class="text-muted">
                    <?php
                    if ($havePhoneNumber) {
                        echo '<p id="phone-val">' . substr($phoneNumber, 0, 5) . " " . substr($phoneNumber, 5) . '</p>';
                    }
                    
                    $numbers = DB::query("SELECT * FROM tblcustomercontact WHERE contactType = 'phone' and userID=%i", $ID);
                    if ($numbers != null) {
                        foreach ($numbers as $row) {
                            if (strlen($row['contactData']) > 1) {
                                echo '<p id="phone-val">' . substr($row['contactData'], 0, 5) . " " . substr($row['contactData'], 5) . '
                                <span id="phone" data-row="' . $row['ID'] . '" data-id="' . $row['contactData'] . '" class="phone btn btn-warning btn-sm"><i class="ion ion-android-create"></i></span></p>';
                            }   
                        }
                    }
                    
                    
                    
                    ?>
                    <form class="form-horizontal" method="post">
                        <div class="input-group input-group-sm mb-0">
                            <input class="form-control form-control-sm" placeholder="Phone number" name="newphone">
                            <div class="input-group-append">
                                <button type="submit" class="btn btn-success" name="phone">Add</button>
                            </div>
                        </div>
                    </form>
                </p>

              </div>
              <!-- /.card-body -->
            </div>
            <!-- /.card -->
          </div>
          <!-- /.col -->
          <div class="col-md-9">
            <div class="card">
              <div class="card-header p-2">
                <ul class="nav nav-pills">
                  <li class="nav-item"><a class="nav-link active" href="#activity" data-toggle="tab">Notes</a></li>
                  <li class="nav-item"><a class="nav-link" href="#timeline" data-toggle="tab">Timeline</a></li>
                  <li class="nav-item"><a class="nav-link" href="#settings" data-toggle="tab">Questions</a></li>
                    
                    
                    
                    <?php
                    if ($_SESSION['admin'] == true) {
                    ?>
                
                <li class="nav-item ml-auto">
                    <a class="nav-link">
                    <form method="post" onsubmit="return confirm('Are you sure you want to delete this user?');"> 
                    <input style="display:none;" name="userid" value="<?php echo $ID; ?>">
                    <button class="btn btn-danger btn-sm" type="submit" name="deleteuser">Delete User</button>
                    </form>    
                    </a>
                </li>
                    
                    <?php 
                    if ($nextSwitchDate != null) {
                        ?>
                <li class="nav-item">
                    <a class="nav-link">
                    <form method="post" onsubmit="return confirm('Are you sure you want to cancel this users auto switch?');"> 
                    <input style="display:none;" name="userid" value="<?php echo $ID; ?>">
                    <button class="btn btn-warning btn-sm" type="submit" name="cancelswitch">Cancel autoswitch</button>
                    </form>    
                    </a>
                </li>       
                    

                    <?php
                    }
                    }
                    ?>
                    
                    
                            
                    
                    
                    
                    
                </ul>
              </div><!-- /.card-header -->
              <div class="card-body">
                <div class="tab-content">
                  <div class="active tab-pane" id="activity">
                      
                    <!-- Post -->
                    <div class="post clearfix">
                      <div class="user-block">
                        <img class="img-circle" src="dist/img/unnamed.png" alt="User Image">
                        <span class="username" style="margin-top: 6px;">
                          <a>New Note</a>
                        </span>
                      </div>
                      <!-- /.user-block -->
                      <form class="form-horizontal" method="post">
                        <div class="input-group input-group-sm mb-0">
                          <input class="form-control form-control-sm" placeholder="Note Text" name="message">
                          <div class="input-group-append">
                            <button type="submit" class="btn btn-success" name="note">Save</button>
                          </div>
                        </div>
                      </form>
                    </div>
                    <!-- /.post -->  
                      
                      
                      
                    <?php
                    if ($hasNotes) {//ion-android-create
                        $notesResults = DB::query("SELECT * FROM tblnotes WHERE userID=%i order by dateCreated desc", $ID);
 
                        if ($notesResults != null) {
                            foreach ($notesResults as $row) {
                                $admin = DB::queryFirstRow("SELECT * FROM tblusers WHERE ID=%i", $row['adminID']);
                                $adminEmail = $admin['email'];
                                ?>
                                
                                
                                <div class="post">
                                <div class="note-btns">
                                <button class="edit-btn btn btn-warning" data-id="<?php echo $row['ID']; ?>" type="button"><i class="ion ion-android-create"></i></button>
                                <form method="post" onsubmit="return confirm('Are you sure you want to delete this ?');">    
                                    <input style="display:none;" name="noteid" value="<?php echo $row['ID'] ?>">
                                    <button class="delete-btn btn btn-danger" type="submit" name="deletepost"><i class="ion ion-android-delete"></i></button>
                                </form>   
                                </div>    
                                
                                  <div class="user-block">
                                    <img class="img-circle" src="dist/img/unnamed.png" alt="user image">
                                    <span class="username">
                                      <a><?php echo $adminEmail; ?></a>
                                    </span>
                                    <span class="description"><?php echo $row['dateCreated']; ?></span>
                                  </div>
                                  <!-- /.user-block -->
                                  <p class="note-message"><?php echo trim($row['message']); ?></p>
                                </div>    
                                
                            <?php    
                            }
                        }
                        
                    }  
                      
                    ?>
                       
            
                      
                  </div>
                  <!-- /.tab-pane -->
                  <div class="tab-pane" id="timeline">
                    <!-- The timeline -->
                    <div class="timeline timeline-inverse">    
                        
                    <?php 
                    if ($hasHistory) {
                        $historyData = DB::query("SELECT * FROM tblswitchhistory WHERE userID=%i order by entryDate desc", $ID);
                        if ($historyData != null) { 
                            foreach ($historyData as $row) {
                    ?>          
                            <div>    
                            <?php if ($row['switchFailed'] == 1) { ?>
                            <i class="fas fa-exclamation-triangle bg-danger"></i>
                            <div class="timeline-item">
                            <span class="time"><i class="far fa-clock"></i> <?php echo $row['entryDate']; ?></span> 
                            <h3 class="timeline-header"><a>Switch Failed</a></h3>
                            <div class="timeline-body">                              
                            <table class="table">
                              <tbody>
                                <tr>
                                  <th scope="row">Reason</th>
                                  <td><?php echo $row['failedReason']; ?></td>
                                </tr>
                              </tbody>
                            </table>      
                            <?php } else { ?>
                            <i class="fas fa-sync bg-primary"></i>
                            <div class="timeline-item">
                            <span class="time"><i class="far fa-clock"></i> <?php echo $row['entryDate']; ?></span>
                            <h3 class="timeline-header"><a>Switch Completed!</a></h3>
                            <div class="timeline-body">
                            <table class="table">
                              <tbody>
                                <tr>
                                  <th scope="row">Switch ID</th>
                                  <td><?php echo $row['EHL']; ?></td>
                                </tr>
                                <tr>
                                  <th scope="row">Supplier</th>
                                  <td><?php echo $row['newSupplier']; ?></td>
                                </tr>
                                <tr>
                                  <th scope="row">Tariff</th>
                                  <td><?php echo $row['newTariff']; ?></td>
                                </tr>  
                                <tr>
                                  <th scope="row">Yearly Cost</th>
                                  <td>£<?php
                                          $val = floatval($row['newCost']);
                                          
                                        echo round($val, 2); 
                                      
                                      ?></td>
                                </tr>  
                                <tr>
                                  <th scope="row">Saved</th>
                                  <td>£<?php
                                          $val = floatval($row['newSaving']);
                                          echo round($val, 2); 
                                      ?></td>
                                </tr>
                                  
                                  <tr>
                                    <th scope="row">Email</th>
                                      <td>
                                          <a target="_blank" href="viewemail.php?id=<?php echo $row['ID']; ?>" type="button" class="btn btn-primary btn-sm">View</a>
                                      
                                    <form class="form-horizontal" method="post" style="display: inline;float: right;">
                                            <input value="<?php echo $row['ID']; ?>" style="display:none;" class="form-control form-control-sm" placeholder="name" name="switchid">
                                            <div class="input-group-append">
                                                <button type="submit" class="btn btn-success btn-sm" name="resendswitch">Resend</button>
                                            </div>
                                    </form>
                                      
                                          
                                      
                                      
                                      
                                      </td>
                                  </tr>
                              </tbody>
                            </table> 
                                
                                
                            <?php } ?>
                        
                            </div>    
                            </div>    
                            </div> 
                    <?php
                            }
                        }
                    }
                    ?>
                                           
                        <?php 
                        if ($hasFormOne) {
                            $formData = DB::queryFirstRow("SELECT * FROM tblformone WHERE userID=%i", $ID);
                            if ($formData != null) {
                                $dateCreatedd = $formData['lastUpdated'];
                                ?>
                                    
                                <div>
                                    <i class="fas fa-user bg-info"></i>

                                    <div class="timeline-item">
                                  <span class="time"><i class="far fa-clock"></i> <?php echo $dateCreatedd; ?></span>

                                    <h3 class="timeline-header border-0"><a>Form 1 was completed!</a></h3>
                                        
                                    <div class="timeline-body">User completed form one</div>
                                    <div class="timeline-footer">
                                        <a type="button" class="btn btn-primary btn-sm" onClick="$('#form-one').modal();">See details</a>
                                    </div>
                                        
                                        
                                </div>
                                </div>
                            <?php    
                            }
                        }
                                
                                
    
                        
                        ?>
                                
                    <div>
                    <i class="fas fa-user-plus bg-info"></i>

                        <div class="timeline-item">
                          <span class="time"><i class="far fa-clock"></i> <?php echo $dateCreated; ?></span>

                            <h3 class="timeline-header border-0"><a>User registered!</a></h3>

                            <div class="timeline-body">
                            <table class="table">
                              <tbody>
                                <tr>
                                  <th scope="row">Postcode</th>
                                  <td><?php echo $postcode; ?></td>
                                </tr>
                                <tr>
                                  <th scope="row">Email</th>
                                  <td><?php echo $email; ?></td>
                                </tr>  
                                <tr>
                                  <th scope="row">Marketing</th>
                                  <td><?php if ($canMarket == 1) {
                                                echo "Yes"; 
                                            } else { 
                                                echo "no";
                                            } ?></td>
                                </tr>  
                              </tbody>
                            </table> 
                            </div>
                        </div>
                    </div>
                        
                        

                      
                      <div>
                        <i class="far fa-clock bg-gray"></i>
                      </div>
                    </div>
                  </div>
                  <!-- /.tab-pane -->

                  <div class="tab-pane" id="settings">
                    <form class="form-horizontal">
                        
                        <?php
                        if ($hasQuestions) {
                            echo '<table class="table-responsive table-bordered">';
                            echo '<tbody>';
                            $questionData = DB::query("SELECT * FROM tblquestions WHERE userID=%i", $ID);
                            if ($questionData != null) { 
                                foreach ($questionData as $row) {
                                echo '<tr>';    
                                echo '<th scope="row">'. $row['qParent'] .'</th>';    
                                echo '<th scope="row">'. $row['qChild'] .'</th>';    
                                echo '<td>'. json_decode($row['qData'])  .'</td>'; 
                                echo '</tr>';
                                }
                            }
                            echo '</tbody>';
                            echo '</table>';
                            
                             
                        } else {
                            echo '<h3>User has not switched, no questions to show</h3>';
                        }
                        ?>
                        
                        
                        
                        
                    </form>
                  </div>
                  <!-- /.tab-pane -->
                </div>
                <!-- /.tab-content -->
              </div><!-- /.card-body -->
            </div>
            <!-- /.nav-tabs-custom -->
          </div>
          <!-- /.col -->
        </div>
        <!-- /.row -->
      </div><!-- /.container-fluid -->
    </section>
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->

    
    
    
    
<?php 
    if ($hasFormOne) {
        
        $formData = DB::queryFirstRow("SELECT * FROM tblformone WHERE userID=%i", $ID);
        if ($formData != null) {
        
        
    ?>
    <div class="modal" tabindex="-1" role="dialog" id="form-one">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Form one</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                  <table class="table table-striped">
                      <tbody>
                        <tr>
                          <th scope="row">Energy Type</th>
                          <td><?php echo $formData['energyType']; ?></td>
                        </tr>
                        <tr>
                          <th scope="row">Economy Seven</th>
                          <td>
                              <?php 
                                if ($formData['economySeven'] == 0) {
                                   echo 'No'; 
                                } else {
                                    echo 'Yes';
                                }
                              ?>
                        </td>
                        </tr>
                        <tr>
                          <th scope="row">Electricity Supplier</th>
                          <td><?php echo $formData['elecSupplier']; ?></td>
                        </tr>
                        <tr>
                          <th scope="row">Electricity Tariff</th>
                          <td><?php echo $formData['elecTariff']; ?></td>
                        </tr>
                        <tr>
                          <th scope="row">Electricity Payment</th>
                          <td><?php echo $formData['elecPayment']; ?></td>
                        </tr>
                        <tr>
                          <th scope="row">Electricity Yearly</th>
                          <td><?php echo $formData['elecUseAmount']; ?></td>
                        </tr> 
                        <tr>
                          <th scope="row">Gas Supplier</th>
                          <td><?php echo $formData['gasSupplier']; ?></td>
                        </tr>
                        <tr>
                          <th scope="row">Gas Tariff</th>
                          <td><?php echo $formData['gasTariff']; ?></td>
                        </tr>
                        <tr>
                          <th scope="row">Gas Payment</th>
                          <td><?php echo $formData['gasPayment']; ?></td>
                        </tr>
                        <tr>
                          <th scope="row">Gas Yearly</th>
                          <td><?php echo $formData['gasUseAmount']; ?></td>
                        </tr> 
                      </tbody>
                    </table> 
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
        </div>
    </div>
    
    
    
    
    
    <?php
        }
    }

?>    

  <!-- Control Sidebar -->
  <aside class="control-sidebar control-sidebar-dark">
    <!-- Control sidebar content goes here -->
  </aside>
  <!-- /.control-sidebar -->
</div>
<!-- ./wrapper -->
    
    
<div class="modal" tabindex="-1" role="dialog" id="modal">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">edit value</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form class="form-horizontal" method="post">
            <div class="input-group input-group-sm mb-0">
                <input id="modal-input" class="form-control form-control-sm" name="newaddress">
                <input style="display:none;" id="modal-id" class="form-control form-control-sm" name="phoneid">
                <div class="input-group-append">
                    <button id="modal-submit" type="submit" class="btn btn-success" name="address">Save</button>
                </div>
            </div>
        </form>
      </div>
      <div class="modal-footer">
      </div>
    </div>
  </div>
</div>
    
    
    
    
    
<div class="modal" tabindex="-1" role="dialog" id="note-modal">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">edit value</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form class="form-horizontal" method="post">
            <div class="input-group input-group-sm mb-0">
                <textarea class="form-control" id="note-body" name="notebody" rows="5"></textarea>
                <input style="display:none;" id="note-id" class="form-control form-control-sm" name="noteid">
                <div class="input-group-append">
                    <button type="submit" class="btn btn-success" name="editnote">Save</button>
                </div>
            </div>
        </form>
      </div>
    </div>
  </div>
</div>      
    
    
    
    
    

<!-- jQuery -->
<script src="plugins/jquery/jquery.min.js"></script>
<!-- Bootstrap 4 -->
<script src="plugins/bootstrap/js/bootstrap.bundle.min.js"></script>
<!-- AdminLTE App -->
<script src="dist/js/adminlte.min.js"></script>
<!-- AdminLTE for demo purposes -->
<script src="dist/js/demo.js"></script>
<script src="script.js"></script>
</body>
</html>
