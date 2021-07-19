<?php

$guestname = $_POST['guestname'];
$confirmation = $_POST['confirmation'];
$quantity = $_POST['quantity'];
$guestname2 = $_POST['guestname2'];
$children = $_POST['children'];
$drinks = $_POST['drinks'];
$token = "1893345900:AAFQyCb-z7bjZTLJMqGx4UMTaDOWe-JWxwc";
$chat_id = "-473872660";
$arr = array(
  'Имя гостя: ' => $guestname,
  'Подтверждение: ' => $confirmation,
  'Колличество:' => $quantity,
  'Имя спутника:' => $guestname2,
  'С детьми:' => $children,
  'Предпочитает:' => $drinks
);

foreach($arr as $key => $value) {
  $txt .= "<b>".$key."</b> ".$value."%0A";
};

$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");

if ($sendToTelegram && $sendToTelegram2) {
  header('Location: thanks.html');
} else {
  echo "Error";
}
?>