<?php
    include('dbconnect.php');

    if(isset($_POST['SalesID']) || isset($_POST['ItemName']) || isset($_POST['ItemUnitsOrder']) || isset($_POST['ClientName'])  || isset($_POST['ClientContact']) || isset($_POST['UserID']) || isset($_POST['SalesDate']) || isset($_POST['TotalPrice']))
    {
		$SalesID = $_POST['SalesID'];
        $ItemName = $_POST['ItemName'];
        $ItemUnitsOrder = $_POST['ItemUnitsOrder'];
		$ClientName = $_POST['ClientName'];
		$ClientContact = $_POST['ClientContact'];
		$UserID = $_POST['UserID'];
		$SalesDate = $_POST['SalesDate'];
        $TotalPrice = $_POST['TotalPrice'];
		

	  $sql = "INSERT INTO sales(SalesID, ItemName,ItemUnitsOrder,ClientName,ClientContact,UserID,SalesDate,TotalPrice) VALUES(".$SalesID .",'" .$ItemName ."','" .$ItemUnitsOrder ."','" .$ClientName ."','" .$ClientContact ."','" .$UserID ."','" .$SalesDate ."','" .$TotalPrice ."');";
		
       # $sql = "INSERT INTO Activities(SalesID, ItemName,ItemUnitsOrder,ClientName,ClientContact,UserID,SalesDate) VALUES(".$SalesID .",'" .$ItemName ."','" .$ItemUnitsOrder ."','" .$ClientName ."','" .$ClientContact ."','" .$UserID ."','" .$SalesDate ."','" .$etime ."');";
	
		
        if ($conn->query($sql) === TRUE) {
            echo "New record created successfully";
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
        
        
        $result = $conn->query("SELECT * FROM inventory;");
        while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
            if ($ItemName == $rs['ItemName']) {
                $newAvailable = $rs['UnitsAvailable'] - $ItemUnitsOrder;
                $newUnitsOrder = $rs['UnitsOrder'] + $ItemUnitsOrder;
                $newTotalPrice = $rs['ItemPrice'] * $ItemUnitsOrder;


                $UpdateSql = "UPDATE inventory SET UnitsAvailable = '" . $newAvailable ."'," 
                    . "UnitsOrder = '" .$newUnitsOrder. "'"
                    . " WHERE ItemName = '". $ItemName ."';";
                
                $UpdateSql2 = "UPDATE sales SET TotalPrice = '" . $newTotalPrice . "'" . " WHERE SalesID = '" . $SalesID ."';";
                
                $conn->query($UpdateSql);
                $conn->query($UpdateSql2);
                echo "Updated Sucessfully";
                $conn->close();
            }   

        }

        
    }
	$conn->close();
?>