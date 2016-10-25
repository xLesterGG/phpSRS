<?php
    include('dbconnect.php');
    
    function random_color_part() {
        return str_pad( dechex( mt_rand( 0, 255 ) ), 2, '0', STR_PAD_LEFT);
    }

    function getRandomColor() {
        return random_color_part() . random_color_part() . random_color_part();
    }
    
    if(isset($_POST['Year']) || isset($_POST['Month']))
    {
		$Year = $_POST['Year'];
        $Month = $_POST['Month'];
    }
        
    $result = $conn->query("SELECT ItemName,sum(ItemUnitsOrder) AS QTY FROM sales WHERE year(SalesDate) = " . $Year . " AND month(SalesDate) = " . $Month . " GROUP BY ItemName;");

    $outp = "";
    
    if ($result->num_rows > 0) {
        while($rs = $result->fetch_array(MYSQLI_ASSOC)) {

            if ($outp != "") {
            $outp .= ",";
            }
            
            $outp .= '{"label":"' . $rs["ItemName"].'",';
            $outp .= '"value":' . $rs["QTY"] . ',';
            $outp .= '"highlight":"#'.getRandomColor().'",';
            $outp .= '"color":"#'.getRandomColor().'"}';   
        }
    }

    $outp ='['.$outp.']';
	$conn->close();
    echo($outp);
    
?>