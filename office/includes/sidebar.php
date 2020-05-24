  <aside class="main-sidebar sidebar-dark-primary elevation-4">
    <!-- Brand Logo -->
    <!-- Sidebar -->
    <div class="sidebar">
      <!-- Sidebar user panel (optional) -->
      <div class="user-panel mt-3 pb-3 mb-3 d-flex" style="border-bottom: none !important;">
        <div class="image">
          <img src="dist/img/unnamed.png" class="img-circle elevation-2" alt="User Image">
        </div>
        <div class="info">
          <a href="#" class="d-block"><?php echo $_SESSION['email']; ?></a>
        </div>
      </div>

      <!-- Sidebar Menu -->
      <nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
            
            
            <li class="nav-item">
                <a href="index.php" class="nav-link">
                  <i class="nav-icon fas fa-tachometer-alt"></i>
                  <p>
                    Dashboard
                  </p>
                </a>
            </li>    
            
            
            <li class="nav-item">
                <a href="users.php" class="nav-link">
                  <i class="nav-icon fas fa-users"></i>
                  <p>
                    Users
                  </p>
                </a>
            </li>  
            
            
            <li class="nav-item">
                <a href="logs.php" class="nav-link">
                  <i class="nav-icon fas fa-bug"></i>
                  <p>
                    Logs
                  </p>
                </a>
            </li>  
            
            
            <li class="nav-item">
                <a href="agents.php" class="nav-link">
                  <i class="nav-icon fas fa-crown"></i>
                  <p>
                    Agents
                  </p>
                </a>
            </li>
            
            <li class="nav-item">
                <a href="logout.php" class="nav-link">
                  <i class="nav-icon fas fa-power-off"></i>
                  <p>
                    Logout
                  </p>
                </a>
            </li> 
            
            
        </ul>
      </nav>
      <!-- /.sidebar-menu -->
    </div>
    <!-- /.sidebar -->
  </aside>