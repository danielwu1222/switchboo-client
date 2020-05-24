<?php
require_once ('includes/db.php');
if(!isset($_SESSION['email'])) {
  header("Location: login.php");
}

if($_SESSION['admin'] == false) {
  header("Location: users.php");
}



if (isset($_POST['deleteuser']) && !empty($_POST['id'])) {
    $deleteid = $_POST['id'];
    DB::delete('tblusers', "ID=%i", $deleteid);
}

if (isset($_POST['saveuser']) && !empty($_POST['id']) && isset($_POST['id'])) {
    $admin = 1;
    if (empty($_POST['isadmin'])) {
        $admin = 0;
    }
    
    DB::update('tblusers', array(
      'email' => $_POST['email'],
      'password' => $_POST['password'],
      'isAdmin' => $admin    
        
      ), "ID=%i", $_POST['id']);
}


if (isset($_POST['newuser'])) {
    $admin = 1;
    if (empty($_POST['isadmin'])) {
        $admin = 0;
    }
    
    
    // insert a new account
    DB::insert('tblusers', array(
      'ID' => 0,
      'email' => $_POST['email'],
      'password' => $_POST['password'],
      'isAdmin' => $admin 
    ));
    
}






$results = DB::query("SELECT * FROM tblusers");
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
                
            <div class="row">
                <div class="col-1">
                    <p>User ID</p>    
                </div>    
                <div class="col-3">
                    <p>Email</p>    
                </div>    
                <div class="col-3">
                    <p>Password</p>    
                </div> 
                <div class="col-2">
                    <p>Is Admin</p>    
                </div> 
                <div class="col-3">
                    <p>Actions</p>    
                </div> 
                
            </div>    
                
                
            
                    
                <?php
                foreach ($results as $row) {
                    echo '<form method="post" style="margin-bottom: 15px;">';
                    echo '<div class="row">';
                    
                    echo '<div class="col-1"><input style="display:none;" value="' . $row['ID'] . '" name="id">' . $row['ID'] . '</div>'; 
                    
                    echo '<div class="col-3"><input class="form-control" value="' . $row['email'] . '" name="email"></div>';
                    
                    echo '<div class="col-3"><input class="form-control" value="' . $row['password'] . '" name="password"></div>';
                    
                    if ($row['isAdmin'] == 1) {
                        echo '<div class="col-2"><input style="margin-left: 10px;margin-top: 14px;" type="checkbox" name="isadmin" class="form-check-input" id="isadmin" checked></div>';
                    } else {
                        echo '<div class="col-2"><input style="margin-left: 10px;margin-top: 14px;" type="checkbox" name="isadmin" class="form-check-input" id="isadmin"></div>';
                    }
                    
                    echo '<div class="col-2"><button class="btn btn-success btn-sm" type="submit" name="saveuser"><i class="ion ion-android-person-add"></i></button>';
                    
                    echo '<button style="margin-left: 5px;" class="btn btn-danger btn-sm" type="submit" name="deleteuser"><i class="ion ion-close"></i></button></div>';

                    echo '</div></form>';
                } 
                
                
                    echo '<form method="post" style="margin-bottom: 15px;">';
                    echo '<div class="row">';
                    
                    echo '<div class="col-1"><input style="display:none;" name="id">0</div>'; 
                    
                    echo '<div class="col-3"><input placeholder="new email" class="form-control" name="email"></div>';
                    
                    echo '<div class="col-3"><input class="form-control" placeholder="new password" name="password"></div>';
                    
                    echo '<div class="col-2"><input style="margin-left: 10px;margin-top: 14px;" type="checkbox" name="isadmin" class="form-check-input" id="isadmin"></div>';
                
                    
                    echo '<div class="col-2"><button class="btn btn-success btn-sm" type="submit" name="newuser"><i class="ion ion-android-person-add"></i></button>';

                    echo '</div></form>';
                
                
                
                ?>
                    

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

</script>
</body>
</html>
