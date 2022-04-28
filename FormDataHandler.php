<?php

$name = $email = $txt = '';
$nameErr = $emailErr = $txtErr = '';
$message = '';

function test_input($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  if (empty($_POST["name"])) {
    $nameErr = "Name is required";
    echo $nameErr . "\r\n";
  } else {
    $name = test_input($_POST["name"]);
    // check if name only contains letters and whitespace
    if (!preg_match("/^[a-zA-Z\s]*$/",$name)) {
      $nameErr = "Only letters and white space allowed for name";
      echo $nameErr . "\r\n";
    }
  }

  if (empty($_POST["email"])) {
    $emailErr = "Email is required";
    echo $emailErr . "\r\n";
  } else {
    $email = test_input($_POST["email"]);
    // check if e-mail address is well-formed
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
      $emailErr = "Invalid email format";
      echo $emailErr . "\r\n";
    }
  }

  if(empty($_POST["message"])) {
    $txtErr = "Message is required";
    echo $txtErr . "\r\n";
    echo $txtErr;
  } else {
    $txt = test_input($_POST["message"]);
    if (!preg_match("/^[a-zA-Z0-9?$@#()'!,+\-=_:.&€£*%\s]+$/", $txt)) {
      $txtErr = "Invalid message format";
      echo $txtErr . "\r\n";
    }
  }
}

  $message = "New client contacts:\r\nName: " . $name . "\r\nEmail: " . $email . "\r\nMessage: " . $txt . "\r\n";

  // Sending form data on email
  mail('info@blessedray.charity', 'New message from The Blessed Ray For Ukraine', $message);

  echo 'Thank you! Message have been sent successfully. We will contact you as soon as possible';
?>