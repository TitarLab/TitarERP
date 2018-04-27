<?php
require_once "../config.php";

class DB{
    public $conn;
    
    public function createConnection(){
        $this->conn = mysqli_connect($host, $login, $password, $database);
        mysqli_set_charset ($this->conn , "utf8");
        if (!$this->conn) {
            die("Ошибка соединения: " . mysqli_connect_error());
        }
    }
    public function request($sql){
        if (!$this->conn) {
            die("Ошибка соединения: " . mysqli_connect_error());
        }
        $queryResult = mysqli_query($this->conn, $sql);
        $result = array();
        if ($queryResult != false){
            while ($row = $queryResult->fetch_object()){
                $result[] = $row;
            }
        } else {
            echo "Ошибка: " . mysqli_error($this->conn);
        }
        mysqli_free_result($queryResult);
        return $result;
    }
    public function closeConnection(){
        mysqli_close($this->conn);
    }
}