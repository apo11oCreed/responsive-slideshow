<?php
$host = "localhost:8889"; //Your database host server
$db = "slideshow"; //Your database name
$user = "slideshow_admin"; //Your database user
$pass = "slideshow_admin1"; //Your password

$connection = mysqli_connect($host, $user, $pass);

//Check to see if we can connect to the server
if(!$connection){
    die("Database server connection failed."); 
} else {
    //Attempt to select the database
    $dbconnect = mysqli_select_db($connection, $db);

    //Check to see if we could select the database
    if(!$dbconnect){
        die("Unable to connect to the specified database!");
    } else {
        $query = "SELECT * FROM slideshow";
        echo $query;
        $resultset = mysqli_query($connection, $query);

        $records = array();
        $response = array(); //extra            

        //Loop through all our records and add them to our array
        while($r = mysqli_fetch_assoc($resultset)){
            $records[] = $r;        
        }

        //Output the data as JSON
        $json = json_encode($records);    

        //NOTE: FOLDERS 'url' and 'file' SHOULD BE WRITABLE WITH PERMISSIONS - 777
        //IN CASE 'url' FOLDER PLACED IN SERVER'S ROOT
        //IF YOU'RE USING SOME FTP BROWSER CHANGE PERMISSIONS FOR 'url' 
        //FOLDER AND APPLY IT TO ALL ENCLOSED ITEMS
        file_put_contents('../data/data-php.json', $json);
    }
}  
?>