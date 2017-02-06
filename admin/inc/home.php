            <a href="dashboard.php">
            <div class="Section_WP">
                <img src="img/board.png" >
                <br><br>
                სტატისტიკა
            </div>
            </a>
            <a href="tables.php">
            <div class="Section_WP">
                <img src="img/arc.png" >
                <br><br>
                მაგიდის ისტორიები
            </div>
            </a>
            <a href="members.php">
            <div class="Section_WP">
                <img src="img/Users.png" >
                <br><br>
                მოთამაშეების სია
            </div>
            </a>
            <a href="report.php">
            <div class="Section_WP" id="report_section">
                <img src="img/piar.png" >
                <br><br>
                დარეპორტებული პარები
            </div>
            </a>
            <a href="settings.php">
            <div class="Section_WP">
                <img src="img/setting.png" >
                <br><br>
                პარამეტრები
            </div>
            </a>
            <?php if($_SESSION["admin"]['group'] != 3){
                echo '<a href="admins.php">
            <div class="Section_WP">
                <img src="img/admin.PNG" >
                <br><br>
                ადმინის ოფციები
            </div>
            </a>';
            }?>

            <a href="transaction.php">
                <div class="Section_WP">
                    <img src="img/deposit.png" >
                    <br><br>
                    ტრანზაქციები
                </div>
            </a>
            <a href="logout.php">
                <div class="Section_WP">
                    <img src="img/logout.png" >
                    <br><br>
                    Log Out
                </div>
            </a>