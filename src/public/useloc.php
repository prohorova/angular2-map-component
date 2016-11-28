<?php
/**
 * Created by PhpStorm.
 * User: brownhanky
 * Date: 2016-11-28
 * Time: 4:12 AM
 */

echo '<pre>';

echo '<hr>POST:<br>';
print_r($_POST);

echo '<hr>GET:<br>';
print_r($_GET);

echo '<hr>POST:<br>';
print_r($_POST);

echo '<hr>INPUT:<br>';
var_dump(file_get_contents('php://input'));

echo '<hr>end<br>';
