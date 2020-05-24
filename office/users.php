<?php
require_once ('includes/db.php');
if(!isset($_SESSION['email'])) {
  header("Location: login.php");
}



if (isset($_POST['deleteuser']) && !empty($_POST['deleteid'])) {
    $deleteid = $_POST['deleteid'];
    DB::delete('tblswitch', "ID=%i", $deleteid);
}    

$results = DB::query("SELECT * FROM tblswitch order by ID desc");
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
  <!-- DataTables -->
  <link rel="stylesheet" href="plugins/datatables-bs4/css/dataTables.bootstrap4.css">
  <!-- Theme style -->
  <link rel="stylesheet" href="dist/css/adminlte.min.css">
  <!-- Google Font: Source Sans Pro -->
  <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700" rel="stylesheet">
</head>
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
            <h1>Users</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="index.html">Home</a></li>
              <li class="breadcrumb-item active">Users</li>
            </ol>
          </div>
        </div>
      </div><!-- /.container-fluid -->
    </section>

    <!-- Main content -->
    <section class="content">
      <div class="row">
        <div class="col-12">
         <!-- /.card -->

          <div class="card">
            <!-- /.card-header -->
            <div class="card-body">
              <table id="example1" class="table table-bordered table-striped">
                <thead>
                <tr>
                  <th>User ID</th>
                  <th>Created</th>        
                  <th>Email</th>
                  <th>Name</th>    
                  <th>Telephone</th>
                  <th>Status</th>
                  <th>View Profile</th>
                </tr>
                </thead>
                <tbody>
                    
                <?php
                foreach ($results as $row) {
                    echo '<tr>';
                    
                    
                    if ($row['nextSwitchDate'] == null) {
                    echo '<td>' . $row['ID'] . '</td>';
                    } else {
                        $ehlData = DB::queryFirstRow("SELECT * FROM tblswitchhistory where EHL is not NULL and userID=%i order by entryDate desc", $row['ID']);
                        echo '<td>' . $row['ID'] . '<br>' . $ehlData['EHL'] . '</td>';
                    }
                    
                    
                    
                    echo '<td>' . date("d/m/Y", strtotime($row['dateCreated'])) . '</td>'; 
                    echo '<td>' . $row['email'] . '</td>';
                    
                    $questionResults = DB::query("SELECT * FROM tblquestions WHERE userID=%i", $row['ID']);
                    $haveName = false;
                    if ($questionResults != null) {
                        $firstName = "";
                        $lastName = "";
                        foreach ($questionResults as $rows) {
                            if ($rows['qChild'] == "firstName") {
                                $haveName = true;
                                $firstName = json_decode($rows['qData']);
                            }    

                            if ($rows['qChild'] == "surname") {
                                $haveName = true;
                                $lastName = json_decode($rows['qData']);
                            }
                        }
                        if ($haveName) {
                            echo '<td>' . $firstName . ' ' . $lastName . '</td>'; 
                        }
                    }
                    
                    if (!$haveName) {
                        $customerDetails = DB::queryFirstRow("SELECT * FROM tblcustomercontact WHERE contactType = 'name' and userID=%i", $row['ID']);
                        if ($customerDetails != null) {
                            $haveName = true;
                            echo '<td>' . $customerDetails['contactData'] . '</td>';   
                        }
                    }
                    
                    if (!$haveName) {
                        echo '<td>unknown</td>';
                    }
                    
                    
                    
                    $questionResults = DB::query("SELECT * FROM tblquestions WHERE userID=%i", $row['ID']);
                    $havePhoneNumber = false;
                    if ($questionResults != null) {
                        $phone1 = "";
                        $phone2 = "";
                        foreach ($questionResults as $rows) {
                            if ($rows['qParent'] == "eveningPhoneNumber" && $rows['qChild'] == "phoneNumber") {
                                $havePhoneNumber = true;
                                $phone1 = json_decode($rows['qData']);
                            }

                            if ($rows['qParent'] == "daytimePhoneNumber" && $rows['qChild'] == "phoneNumber") {
                                $havePhoneNumber = true;
                                $phone2 = json_decode($rows['qData']);
                            } 
                        }
                        if ($havePhoneNumber) {
                            
                            if ($phone1 == $phone2) {
                                 echo '<td>' . $phone1 . '</td>'; 
                            } else {
                                
                                if ($phone1 == "") {
                                    echo '<td>' . $phone2 . '</td>';
                                } else if ($phone2 == "") {
                                    echo '<td>' . $phone1 . '</td>';
                                } else {
                                    echo '<td>' . $phone1 . ' <br> ' . $phone2 . '</td>'; 
                                }    
                            }
                        }
                    }
                    
                    if (!$havePhoneNumber) {
                        $customerDetails = DB::queryFirstRow("SELECT * FROM tblcustomercontact WHERE contactType = 'phone' and userID=%i", $row['ID']);
                        if ($customerDetails != null) {
                            $havePhoneNumber = true;
                            echo '<td>' . $customerDetails['contactData'] . '</td>';   
                        }
                    }
                    
                    if (!$havePhoneNumber) {
                        echo '<td>unknown</td>';
                    }  
                    
                    $ustatus = DB::queryFirstRow("SELECT * FROM tblstatus where userID=%i", $row['ID']);
                    if ($row['nextSwitchDate'] != null) {
                        echo '<td>Switched</td>'; 
                    } else if ($ustatus != null) {
                        echo '<td>' . $ustatus['userStatus'] . '</td>';
                    } else {
                        echo '<td>Registered</td>';
                    }
                    echo '<td>';
                    echo '<a href="profile.php?id=' . $row['ID'] . '" class="btn btn-success btn-sm"><i class="ion ion-eye"></i></a>';
                    
                    if ($_SESSION['admin'] == true) {
                    ?>
                    
                    <form method="post" style="display: inline;margin-left: 5px;float: right;" onsubmit="return confirm('Are you sure you want to delete this ?');">
                    
                    <?php
                    echo '<input style="display:none;" name="deleteid" value="' . $row['ID'] . '">';
                    echo '<button class="btn btn-danger btn-sm" type="submit" name="deleteuser"><i class="ion ion-close"></i></button>';
                    echo '</form>';                    
                    
                    echo '</td>';
                    echo '</tr>';
                    }
                }                    
                ?>

                </tbody>
              </table>
            </div>
            <!-- /.card-body -->
          </div>
          <!-- /.card -->
        </div>
        <!-- /.col -->
      </div>
      <!-- /.row -->
    </section>
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->


  <!-- Control Sidebar -->
  <aside class="control-sidebar control-sidebar-dark">
    <!-- Control sidebar content goes here -->
  </aside>
  <!-- /.control-sidebar -->
</div>
<!-- ./wrapper -->

<!-- jQuery -->
<script src="plugins/jquery/jquery.min.js"></script>
<!-- Bootstrap 4 -->
<script src="plugins/bootstrap/js/bootstrap.bundle.min.js"></script>
<!-- DataTables -->
<script src="plugins/datatables/jquery.dataTables.js"></script>
<script src="plugins/datatables-bs4/js/dataTables.bootstrap4.js"></script>
<!-- AdminLTE App -->
<script src="dist/js/adminlte.min.js"></script>
<!-- AdminLTE for demo purposes -->
<script src="dist/js/demo.js"></script>
<!-- page script -->
<script>
  $(function () {
    $("#example1").DataTable();
    $('#example2').DataTable({
      "paging": true,
      "lengthChange": false,
      "searching": false,
      "ordering": true,
      "info": true,
      "autoWidth": false,
    });
  });
</script>
</body>
</html>
