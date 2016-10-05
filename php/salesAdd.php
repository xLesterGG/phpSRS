<?php
    include('dbconnect.php');

    if(isset($_POST['SalesID']) || isset($_POST['ItemName']) || isset($_POST['ItemUnitsOrder']) || isset($_POST['ClientName'])  || isset($_POST['ClientContact']) || isset($_POST['UserID']) || isset($_POST['SalesDate']))
    {
		$SalesID = $_POST['SalesID'];
        $ItemName = $_POST['ItemName'];
        $ItemUnitsOrder = $_POST['ItemUnitsOrder'];
		$ClientName = $_POST['ClientName'];
		$ClientContact = $_POST['ClientContact'];
		$UserID = $_POST['UserID'];
		$SalesDate = $_POST['SalesDate'];
		

	  $sql = "INSERT INTO sales(SalesID, ItemName,ItemUnitsOrder,ClientName,ClientContact,UserID,SalesDate) VALUES(".$SalesID .",'" .$ItemName ."','" .$ItemUnitsOrder ."','" .$ClientName ."','" .$ClientContact ."','" .$UserID ."','" .$SalesDate ."');";
		
       # $sql = "INSERT INTO Activities(SalesID, ItemName,ItemUnitsOrder,ClientName,ClientContact,UserID,SalesDate) VALUES(".$SalesID .",'" .$ItemName ."','" .$ItemUnitsOrder ."','" .$ClientName ."','" .$ClientContact ."','" .$UserID ."','" .$SalesDate ."','" .$etime ."');";
	
		
        if ($conn->query($sql) === TRUE) {
            echo "New record created successfully";
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
    }
	$conn->close();
?>