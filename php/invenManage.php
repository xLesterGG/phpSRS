<?php 
    include('dbconnect.php');
    $sql = '';

    parse_str(file_get_contents("php://input"),$put_vars);
    if($put_vars['dsc'] !== '' && $put_vars['amn'] !==''&& $put_vars['prc'] !== '' && $put_vars['uio'] !=='' && $put_vars['ist'] !=='' && $put_vars['iID'])
    {
        $dsc = $put_vars['dsc'];
        $amn = $put_vars['amn'];
        $prc = $put_vars['prc'];
        $uio = $put_vars['uio'];
        $ist = $put_vars['ist'];
        $iID = $put_vars['iID'];
        
        $sql = "UPDATE inventory SET itemDescription = '" .$dsc ."'," 
            . "UnitsAvailable = '" .$amn . "'," 
            . "itemPrice = '" .$prc ."',"
            . "UnitsOrder = '".$uio ."',"
            . "ItemStatus = '".$ist ."'"
            . "WHERE ItemName = '" . $iID . "';";
    }

    if($conn->query($sql) === TRUE){
        echo "Updated";
    } else {
       echo "Error: " . $sql . "<br>" . $conn->error . "Please contact system administrator"; 
    }
    $conn->close();
?>