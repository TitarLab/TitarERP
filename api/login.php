<?php
require_once "../config.php";

$postData = file_get_contents('php://input');

$data = json_decode($postData);


// Соединяемся, выбираем базу данных
$mysqli = mysqli_connect($host, $login, $password, $database);
if ($mysqli->connect_errno) {
    echo "Не удалось подключиться к MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
}else{
    mysqli_set_charset ($mysqli, "utf8");
    $res = mysqli_query($mysqli, 'SELECT `user`,`password` FROM `user` WHERE `user` = "'.$data->user.'" ');

    if($res != null){
        for ($row_no = 0; $row_no < $res->num_rows; $row_no++) {
            $res->data_seek($row_no);
            $row = $res->fetch_assoc();
            if(password_verify($data->password,$row['password'])){
                echo 1;
            }
        }
    }
    mysqli_free_result($result);
    mysqli_close($link);
}
?>