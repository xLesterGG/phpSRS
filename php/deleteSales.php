<?php 
    include('dbconnect.php');
    $sql = '';
    
    //translate & delete
    parse_str(file_get_contents("php://input"),$del_vars);
    if($del_vars['sID'] !=='')
    {
        $sID = $del_vars['sID'];
        $sql = "DELETE FROM sales WHERE SalesID = '" . $sID . "';";
    }
    
    //feedback
    if ($conn->query($sql)==TRUE){
        echo "Activity successfully deleted";
    } else {
        echo "Error: " .$sql. "<br>" . $conn-error . "Please contact system administrator";
    }
    
    $conn->close();
?>