<?php

header('Content-Type: text/html; charset=utf-8');
session_start();
    
//Este script es invocado via Ajax cuando el usuario presiona el botón "Mi Cuenta".
//Es necesario que el usuario esté logeado para poder mostrarle sus datos.
//$_SESSION['auth'] debe tener el valor "yes".

if ( isset($_SESSION['auth'])){       
    
?>


 <div class='cartcontainer'>
        <table>
            <tr><td><img src="icons/uc.png" width="411" height="186" /></td></tr>
            <tr><td align='center'>Estimado Cliente: pronto podrá consultar y/o modificar</td></tr>
            <tr><td align='center'>los detalles de su cuenta.</td></tr>
            <tr><td align='center'>Gracias...</td></tr>
            
        </table>
    </div>
<?php
 }
    
    

