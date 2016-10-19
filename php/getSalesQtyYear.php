<?php
    include('dbconnect.php');

    $currentYear1 = date("Y")-4;
    $currentYear2 = date("Y")-3;
    $currentYear3 = date("Y")-2;
    $currentYear4 = date("Y")-1;
    $currentYear5 = date("Y");

    $result = $conn->query("SELECT sum(if(year(SalesDate) = " . $currentYear1 . ", ItemUnitsOrder, 0)) AS First, sum(if(year(SalesDate) = " . $currentYear2 . ", ItemUnitsOrder, 0)) AS Second, sum(if(year(SalesDate) = " . $currentYear3 . ", ItemUnitsOrder, 0)) AS Third, sum(if(year(SalesDate) = " . $currentYear4 . ", ItemUnitsOrder, 0)) AS Fourth, sum(if(year(SalesDate) = " . $currentYear5 . ", ItemUnitsOrder, 0)) AS Fifth FROM sales;");
    
    
    if ($result->num_rows > 0) {
        $rs = $result->fetch_array(MYSQLI_ASSOC);
        echo "[".$rs['First'].",".$rs['Second'].",".$rs['Third'].",".$rs['Fourth'].",".$rs['Fifth']."]";
    }

	$conn->close();
    
?>