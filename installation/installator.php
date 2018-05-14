<?php
//require_once("../api/report.php");
// $postData = file_get_contents('php://input');
// $data = json_decode($postData);
//$report = new report;


require '../libs/Medoo.php';
use Medoo\Medoo;
$db_name = 'rivaldi_titarcrm';
$host = '77.109.23.14';
$username = 'rivaldi_titarcrm';
$password = 'aqqdevje';
$db = new Medoo([
    'database_type' => 'mysql',
    'database_name' => 'rivaldi_titarcrm',
    'server' => '77.109.23.14',
    'username' => 'rivaldi_titarcrm',
    'password' => 'aqqdevje',
		'charset' => 'utf8',
]);

if (count(db->error()) != 0){
  var_dump(db->error());
  die();
  echo 'Ошибка при подключении к базе данных';
}


$db->query("CREATE TABLE `client` (
  `id` int(11) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `last_contact` date NOT NULL,
  `note` varchar(255) NOT NULL,
  `contacts` varchar(255) NOT NULL,
  `photo` varchar(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8; 
ALTER TABLE `client`
  ADD PRIMARY KEY (`id`)");


$config = fopen('config.php','w');
$config = fopen('config.php','a');
$config_inner = "<?php\n
    \$host = '".$host."'\n,
    \$db_name = '".$db_name."',\n
    \$username = '".$username."',\n
    \$password ='".$password."'?>";

$fr = fwrite($config,$config_inner);

if ($fr) echo 'Данные в файл успешно занесены.';
  else echo 'Ошибка при записи в файл.';

fclose($config); 

//$datas = $db->select("client", "*");
//echo json_encode($datas);

