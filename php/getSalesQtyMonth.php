<?php
    include('dbconnect.php');
    
    if(isset($_POST['Year']))
    {
		$Year = $_POST['Year'];
    }

    $result = $conn->query("SELECT ItemName,sum(if(month(SalesDate) = 1, TotalPrice, 0)) AS Jan, sum(if(month(SalesDate) = 2, TotalPrice, 0)) AS Feb, sum(if(month(SalesDate) = 3, TotalPrice, 0)) AS Mar, sum(if(month(SalesDate) = 4, TotalPrice, 0)) AS Apr, sum(if(month(SalesDate) = 5, TotalPrice, 0)) AS May, sum(if(month(SalesDate) = 6, TotalPrice, 0)) AS Jun, sum(if(month(SalesDate) = 7, TotalPrice, 0)) AS Jul, sum(if(month(SalesDate) = 8, TotalPrice, 0)) AS Aug, sum(if(month(SalesDate) = 9, TotalPrice, 0)) AS Sep, sum(if(month(SalesDate) = 10, TotalPrice, 0)) AS Oct, sum(if(month(SalesDate) = 11, TotalPrice, 0)) AS Nov, sum(if(month(SalesDate) = 12, TotalPrice, 0)) AS 'Dec' FROM sales WHERE year(SalesDate) = ". $Year ." GROUP BY ItemName;");
    
    if ($result->num_rows > 0) {
        while($rs = $result->fetch_array(MYSQLI_ASSOC)) {

            $outp[] = 
            [ 
                "name" => $rs["ItemName"],
                "data" => 
                [
                    $rs["Jan"],
                    $rs["Feb"],				
                    $rs["Mar"],
                    $rs["Apr"],
                    $rs["May"],
                    $rs["Jun"],
                    $rs["Jul"],
                    $rs["Aug"],
                    $rs["Sep"],
                    $rs["Oct"],
                    $rs["Nov"],
                    $rs["Dec"]   
                ]
            ];   
        }
    }

	$conn->close();
    
//    echo "[".$rs['Jan'].",".$rs['Feb'].",".$rs['Mar'].",".$rs['Apr'].",".$rs['May'].",".$rs['Jun'].",".$rs['Jul'].",".$rs['Aug'].",".$rs['Sep'].",".$rs['Oct'].",".$rs['Nov'].",".$rs['Dec']."]";
    
    echo(json_encode($outp));
?>