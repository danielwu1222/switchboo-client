<?php
require_once ('includes/db.php');
if(!isset($_SESSION['email'])) {
  header("Location: login.php");
}


if (isset($_POST['contact']) && !empty($_POST['deleteid'])) {
    $val = $_POST['deleteid'];  
    DB::update('tblref', array('contacted' => 1), "ID=%i", intval($val));
}




$results = DB::query("SELECT * FROM tblref");
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
              <li class="breadcrumb-item active">referals</li>
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
                  <th>ID</th>
                  <th>refID</th>
                  <th>Entered</th>
                  <th>Name</th>        
                  <th>Supplier</th>
                  <th>Number</th>    
                  <th>Can contact</th>
                  <th>Contacted</th>
                  <th>Update</th>
                </tr>
                </thead>
                <tbody>
                    
                <?php
                foreach ($results as $row) {
                    echo '<tr>';
                    echo '<td>' . $row['ID'] . '</td>';
                    echo '<td>' . $row['refID'] . '</td>';
                    echo '<td>' . $row['entryDate'] . '</td>';
                    echo '<td>' . $row['customerName'] . '</td>';
                    echo '<td>' . $row['energySupplier'] . '</td>';
                    echo '<td>' . $row['phoneNumber'] . '</td>';
                    if ($row['payless'] == 1) {
                        echo '<td>yes</td>';
                    } else {
                        echo '<td>No</td>';
                    }
                    if ($row['contacted'] == 1) {
                        echo '<td>yes</td>';
                    } else {
                        echo '<td>No</td>';
                    }
                    
                    
                    ?>
                    <td>
                    <form method="post" style="display: inline;margin-left: 5px;float: right;" onsubmit="return confirm('Are you sure you want to mark them contacted ?');">
                    
                    <?php
                    echo '<input style="display:none;" name="deleteid" value="' . $row['ID'] . '">';
                    echo '<button class="btn btn-success btn-sm" type="submit" name="contact"><i class="ion ion-ios-telephone"></i></button>';
                    echo '</form>';                    
                    
                    echo '</td>';
                    
                    
                    echo '</tr>';
                    
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
