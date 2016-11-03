<?php
//<!--Author : Loo Cheah Hong-->
//<!--Insert new experience data for performers-->
    include('dbconnect.php');
    $result = $conn->query("SELECT * FROM inventory;");

    if(isset($_POST['itemName']))
    {
        $itemName = $_POST['itemName'];
    }

    if(isset($_POST['itemAmount']))
    {
        $itemAmount =  $_POST['itemAmount'];    
    }
    

    if(isset($_POST['itemDescription']))
    {
        $itemDescription =  $_POST['itemDescription'];    
    }
    
    if(isset($_POST['itemPrice']))
    {
        $itemPrice =  $_POST['itemPrice'];    
    }

    if(isset($_POST['UnitsOrder']))
    {
        $UnitsOrder =  $_POST['UnitsOrder'];    
    }
    
    if(isset($_POST['itemStatus']))
    {
        $itemStatus = $_POST['itemStatus'];
    }
   
    while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
		if ($itemName == $rs['ItemName']) {
            $newItemAmount = $rs['UnitsAvailable'] + $itemAmount;
            $UpdateSql = "UPDATE inventory SET UnitsAvailable = " . $newItemAmount . " WHERE ItemName = '". $itemName ."';";
            $conn->query($UpdateSql);
            echo "Updated Sucessfully";
            $conn->close();
        }   
        
	}
    
    $sql = "INSERT INTO inventory(ItemName, UnitsAvailable, ItemDescription,ItemPrice,UnitsOrder,ItemStatus) VALUES('". $itemName ."', " . $itemAmount . ", '". $itemDescription ."', ". $itemPrice .",". $UnitsOrder .", '". $itemStatus ."');";
            
    if($conn->query($sql)==true)
    {
        echo "Inserted Sucessfully";
    }
	$conn->close();
    

?>