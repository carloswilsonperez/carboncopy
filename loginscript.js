/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

window.onload = function() {
    //window.localStorage.clear();
    
       
          
    //Activar los botones de la 'loginzone'
    document.getElementById("loginlogin").addEventListener("click", login_user, false);
    
    //load_initial("r1");      
        
};




function load_initial(subcat) {
        
    //alert(index);
    var fileToLoad = "phpscripts/" + subcat + ".txt";    
    $("#mostrador").load(fileToLoad);
    
}


document.getElementById('loginformsend').addEventListener("click", check_credentials, false);


function check_credentials(event) {
    //Crear objeto
    var obj = {"name":"azucar", "price": 50};
    
    $.ajax({
        type: "POST",
        url: "phpscripts/process_login.php",
        dataType: "json",
        data: obj,
        success: function(data) {
            document.getElementById('topbanner').innerHTML = data.name + "****" + data.price;
        }
                
        
    });
    
    event.preventDefault();
    //Enviar objeto a
    /*
    $.post( "phpscripts/process_login.php", obj, function( data ) {
        document.getElementById('topbanner').innerHTML = data.name + "****" + data.price;
}, "json");*/

}