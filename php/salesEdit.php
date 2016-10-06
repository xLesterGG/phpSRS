<?php 
    include('dbconnect.php');
    $sql = '';

    parse_str(file_get_contents("php://input"),$put_vars);
    if($put_vars['snm'] !== '' && $put_vars['iord'] !==''&& $put_vars['cnm'] !== '' && $put_vars['ccn'] !=='' && $put_vars['sID'])
    {
        $snm = $put_vars['snm'];
        $iord = $put_vars['iord'];
        $cnm = $put_vars['cnm'];
        $ccn = $put_vars['ccn'];
        $sID = $put_vars['sID'];
        
        $sql = "UPDATE sales SET ItemName = '" .$snm ."'," 
            . "ItemUnitsOrder = '" .$iord . "'," 
            . "ClientName = '" .$cnm ."',"
            . "ClientContact = '".$ccn ."'"
            . "WHERE SalesID = '" . $sID . "';";
    }

    if($conn->query($sql) === TRUE){
        echo "Updated";
    } else {
       echo "Error: " . $sql . "<br>" . $conn->error . "Please contact system administrator"; 
    }
    $conn->close();
?>