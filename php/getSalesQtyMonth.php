<?php
    include('dbconnect.php');
    
    $result = $conn->query("SELECT sum(if(month(SalesDate) = 1, ItemUnitsOrder, 0)) AS Jan, sum(if(month(SalesDate) = 2, ItemUnitsOrder, 0)) AS Feb, sum(if(month(SalesDate) = 3, ItemUnitsOrder, 0)) AS Mar, sum(if(month(SalesDate) = 4, ItemUnitsOrder, 0)) AS Apr, sum(if(month(SalesDate) = 5, ItemUnitsOrder, 0)) AS May, sum(if(month(SalesDate) = 6, ItemUnitsOrder, 0)) AS Jun, sum(if(month(SalesDate) = 7, ItemUnitsOrder, 0)) AS Jul, sum(if(month(SalesDate) = 8, ItemUnitsOrder, 0)) AS Aug, sum(if(month(SalesDate) = 9, ItemUnitsOrder, 0)) AS Sep, sum(if(month(SalesDate) = 10, ItemUnitsOrder, 0)) AS Oct, sum(if(month(SalesDate) = 11, ItemUnitsOrder, 0)) AS Nov, sum(if(month(SalesDate) = 12, ItemUnitsOrder, 0)) AS 'Dec' FROM sales;");
    
    
    if ($result->num_rows > 0) {
        $rs = $result->fetch_array(MYSQLI_ASSOC);
        echo "[".$rs['Jan'].",".$rs['Feb'].",".$rs['Mar'].",".$rs['Apr'].",".$rs['May'].",".$rs['Jun'].",".$rs['Jul'].",".$rs['Aug'].",".$rs['Sep'].",".$rs['Oct'].",".$rs['Nov'].",".$rs['Dec']."]";
    }

	$conn->close();
    
?>