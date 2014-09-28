//Author - Carlos A. Wilson Pérez.

$(document).ready(function() {

    //Apenas se carga el sitio, la siguiente función examina la presencia de la cookie de sesión.
    //En caso de hallarla, inicializa variables de sesión, los favoritos del usuario y
    //modifica botones del menú de navegación. 
    
    
    /**************************************** SECCIÓN DE VARIABLES GLOBALES   *******************************************/
    
    //Variables globales para el registro de artículos.
    window.subtotal = 0;
    window.totaliva = 0;           
    window.envio = 0;   //checar dónde se inicializa
    window.totalsavings = 0; 
    window.totalprofit = 0;
    window.totalamount = 0;
    window.saldototal = 0;
    window.orderTime = "";
    
    window.cart = [];
    window.itemsCounter = 0;
    window.totalItems = 0;
    window.mmpce = 250;   //Compra mínima para no cobrar envios.    
    
    window.json_catalog_is_being_requested = false;
    
    //Variables para la sección de Registro de nuevo usuario.    
    window.registeremail = false;
    window.registerpasswd1 = false;
    window.registerpasswd2 = false;
    window.registernombre = false;
    window.registerappaterno = false;
    window.registerapmaterno = true;
    window.registerbirth = false;
    window.registercp = false;    
    window.registercalle = false;
    window.registeredificio = true;
    window.registernumext = false;
    window.registernumint = true;
    window.registertelnum = false;
    window.registerentre1 = false;
    window.registerentre2 = false;
    window.registerref = true;   
    window.conditionsok = false;  
    
   
    
    
    /*************************************** SECCIÓN DE PRECARGA DE IMÁGENES   ***************************/
    
    
    //Precargar imagen para carrito vacío.
    var empty_cart = new Image();
    empty_cart.src = "icons/cart256x256.png";
        
    //Precargar imagen para sección mi cuenta
    var under_construction = new Image();
    under_construction.src = "icons/uc.png";
    
    //Precargar preloader
    var main_preloader = new Image();
    main_preloader.src = "img_preloaders/ajax-loader.gif";
    
    var item_preloader = new Image();
    item_preloader.src = "img_preloaders/item_prel.gif";
    
    //Precargar imagenes rollover.
    var new_cart_icon_violet = new Image();
    var new_heart_icon_violet = new Image();    
    var new_lupa_icon_violet = new Image();
    
    var old_cart_icon_black = new Image();
    var old_heart_icon_black = new Image();    
    var old_lupa_icon_black = new Image();    
    
    new_cart_icon_violet.src = "icons/cart48by48morado.png";
    new_heart_icon_violet.src = "icons/heart24x24violet.png";    
    new_lupa_icon_violet.src = "icons/search24x24violet.png";
    
    old_cart_icon_black.src = "icons/cart48by48negro.png";
    old_heart_icon_black.src = "icons/heart24x24negro.png";    
    old_lupa_icon_black.src = "icons/search24x24negro.png"; 
    
    
        
    
    /*************************************** SECCIÓN DE MANEJADORES DE EVENTOS   ***************************/
        
    
    //Manejadores de eventos para los botones de los elementos 'itembox'.
    $("#mostrador").delegate(".itemboxlefticon", "click", modify_input_value);
    $("#mostrador").delegate(".itemboxrighticon", "click", modify_input_value);
    $("#mostrador").delegate(".itemboxselector", "click", add_item_to_cart);
    $("#mostrador").delegate(".itemboxmarca img", "click", add_to_favorites);

    //Manejadores de eventos para los botones del carrito vacío.
    $("#mostrador").delegate("#emptycartbutton", "click", empty_cart_go_back);
    $("#mostrador").delegate("#emptycartbuttongo", "click", empty_cart_go_forward);

    $("#mostrador").delegate("#cartgobackbutton", "click", go_back_from_cart);
    $("#mostrador").delegate("#cartgotonextbutton", "click", set_object_for_cart2_4);
    $("#mostrador").delegate("#cartgobackbutton2", "click", go_back_from_cart);
    $("#mostrador").delegate("#cartgotonextbutton2", "click", set_object_for_cart3_4);
    $("#mostrador").delegate("#cartgobackbutton3", "click", go_back_from_cart);
    
    $("#mostrador").delegate("#cartgobackbutton4", "click", function() {
        window.history.go(-1);
    });

    //A continuación, cuando se hace click sobre el botón con clase 'active', se activará la función respectiva.
    $("#mostrador").delegate("#cartgotonextbutton3.active", "click", set_object_for_finish_order);

    $("#mostrador").delegate("#sendregister.active", "click", save_user_data);

    $("#headerfavoritelogo").click(show_user_favorites);

    //Eventos para la sección 'Registrarse'..
    
    $("#mostrador").delegate(".mydata span#check_conditions", "click", set_object_for_check_conditions);
    $("#mostrador").delegate("#conditionsok", "click", check_field);
    
    //Eventos para los elementos #registeremail, #registerpasswd1 y #registerpasswd2.
    $("#mostrador").delegate("#getaccesdata input", "focus", show_helper_tooltip);
    
    //Eventos para los elementos #registernombre, #registerappaterno y #registerapmaterno.
    $("#mostrador").delegate("#getpersonaldata input", "focus", show_helper_tooltip);
    
    //Eventos para los elementos #registercp, #registercalle y #registeredificio.
    //Eventos para los elementos #registernumext, #registernumint y #registertelnum.
    //Eventos para los elementos #registerentre1, #registerentre2 y #registerref.
    $("#mostrador").delegate("#getaddressdata input", "focus", show_helper_tooltip);      
    
    $(document).delegate("#calendar #close_calendar", "click", function() { 
        $("#registerbirth").blur();        
    });        
    
    $("#mostrador").delegate("#getaccesdata input", "blur", check_field);
    $("#mostrador").delegate("#getpersonaldata input", "blur", check_field);
    $("#mostrador").delegate("#getaddressdata input", "blur", check_field);
    

    //Eventos para la sección "Mi Cuenta".
    $("#mostrador").delegate("#newemail", "click", change_my_data);
    $("#mostrador").delegate("#newpassword", "click", change_my_data);
    $("#mostrador").delegate("#newmunicipio", "click", change_my_data);
    $("#mostrador").delegate("#newlocalidad", "click", change_my_data);
    $("#mostrador").delegate("#newcolonia", "click", change_my_data);
    $("#mostrador").delegate("#newcalle", "click", change_my_data);
    $("#mostrador").delegate("#newedificio", "click", change_my_data);
    $("#mostrador").delegate("#newnumext", "click", change_my_data);
    $("#mostrador").delegate("#newnumint", "click", change_my_data);
    $("#mostrador").delegate("#newtel", "click", change_my_data);
    $("#mostrador").delegate("#newref", "click", change_my_data);
    $("#mostrador").delegate(".checkorder", "click", check_my_orders);
    $("#mostrador").delegate("#needregister", "click", register_new_user);

    //Eventos para la etapa de colocación de pedido 2 de 4
    $("#mostrador").delegate(".mydata div.onschedule", "click", get_my_order_time);
    

    //Eventos para el formulario de login.
    $("#mostrador").delegate("#logindata span#restore_passwd", "click", set_object_for_restore_passwd);  //Se carga formulario.
    $("#mostrador").delegate(".restore_passwd div#restore_commit", "click", restore_login);  //Al presionar el botón 'Enviar' en el cuadro de renovación.
    $("#mostrador").delegate("#logindata #loginemail", "keydown", submit_login_from_keyboard);
    $("#mostrador").delegate("#logindata #loginpassword", "keydown", submit_login_from_keyboard);

    $("#mostrador").delegate("#logindata #commit", "click", check_credentials);  //debería ser check_credentials. Dice submit_loginform

    //Manejador para el evento 'submit' del formulario de login.
    //$("#mostrador").delegate("#loginform", "submit", check_credentials);
    
    
    //Manejador para el envio de datos del formulario de contacto.
    $("#mostrador").delegate("#loginform #contact_name", "blur", check_contact_field);
    $("#mostrador").delegate("#loginform #contact_email", "blur", check_contact_field);
    $("#mostrador").delegate("#loginform #contact_subject", "blur", check_contact_field);
    $("#mostrador").delegate("#loginform #contact_message", "blur", check_contact_field);
    $("#mostrador").delegate("#loginform #contact_commit.active", "click", submit_contact_data);

    document.getElementById("searcher").addEventListener("keyup", activate_instant_search, false);
    
    $("#searcher").click(search_for_matches);
    $("#searcher").mouseenter(search_for_matches);
    
    $("#auxiliarybanner").mouseenter(close_instant_search);
    $("#mostrador").mouseenter(close_instant_search);
    
    //Eventos para el elemento #searchcontainer.
    $("body").delegate("#searchcontainer", "blur", close_instant_search);
    $("body").delegate("#searchcontainer div", "click", get_item_info);    
    $("body").delegate("#searchcontainer div.resultitems", "mouseenter", update_focused_itemlist);
    
    $("#mostrador").click(close_instant_search);

    //Eventos para los menús emergentes de subcategorías.
    $(".submenu td").on("click", set_object_for_submenu);

    //Eventos para el menú superior de ordenado de artículos.
    $("body").delegate("#ordercriteria div", "click", change_order_criteria);
    
    $("#auxiliarybanner").delegate("#orderby.active", "mouseenter", get_ordered_items);
    //$("#orderby").mouseenter(get_ordered_items);
    
    $("#mostrador").mouseenter(function() {
        //Cerrar el elemento #ordercriteria.
        $('#ordercriteria').css('display', 'none');
        $('#active_criteria').css({'border-bottom': '1px solid #ecf0f1'});
        
        //Restaurar los colores  del elemento #orderby.
        $('#orderby').css('color', 'black');
        $('#orderby').css('background-color', 'transparent');
    });
    
    
    $("#sectionheader").mouseenter(function() {
        //Cerrar el elemento #ordercriteria.
        $('#ordercriteria').css('display', 'none');
        $('#active_criteria').css({'border-bottom': '1px solid #ecf0f1'});
        
        //Restaurar los colores  del elemento #orderby.
        $('#orderby').css('color', 'black');
        $('#orderby').css('background-color', 'transparent');
    });    
        
        
    //Definición de hover para icono del carrito de la parte superior derecha de la pantalla.
    $("#carticon").hover(
            function() {
                $("#carticon span img").attr("src", new_cart_icon_violet.src);
            },

            function() {
                $("#carticon span img").attr("src", old_cart_icon_black.src);
            }    
    );

    //Gestor de eventos para mostrar el contenido del CARRITO.
    $("#carticon").click(set_object_for_show_cart);
    
    //Definición de hover para icono de favoritos de la parte superior derecha de la pantalla.
    $("#headerfavoritelogo").hover(
            function() {
                $("#headerfavoritelogo span img").attr("src", new_heart_icon_violet.src);
            },

            function() {
                $("#headerfavoritelogo span img").attr("src", old_heart_icon_black.src);
            }    
    );

       
    //Definición de hover para icono del carrito de la parte superior derecha de la pantalla.
    $("#findicon").hover(
            function() {
                $("#findicon img").attr("src", new_lupa_icon_violet.src);
            },

            function() {
                $("#findicon img").attr("src", old_lupa_icon_black.src);
            }    
    );
 
    
    $("#findicon").click( function() {
        //get_back_product_info();
    });
    

    //Gestor del Historial de Navegación
    window.addEventListener('popstate', function(event) {

        //Get the destiny page
        var obj = event.state;
        var page_to_load = obj.origin;    //Nueva current_page.
        var obj_logged = obj.logged;    //true, false
        
        var itemsInCart = window.cart.length;;
        
        var logged = (getCookie("auth") !== '') ? true:false;   //true si el usuario está logeado.
        
        if (logged === !obj_logged) {//Se está intentando acceder a una página fuera del bloque de logeo.
            window.history.go(1); 
            
        } else if (logged) { //logged === true AND obj_logged === true
            //Gestionar los casos para cart2 y cart 3
            
            if (page_to_load === "colocar_pedido_1_de_4" && itemsInCart === 0) {//El usuario está visitando un carrito previamente lleno pero ya vaciado.
                
                set_object_for_empty_cart2();                
                
            } else if (page_to_load === "colocar_pedido_2_de_4" && itemsInCart === 0) {//El usuario está intentando ir a cart 2 desde empty_cart.
                //alert(previous_page);
                            
                window.history.go(2);
                
            } else if (page_to_load === "colocar_pedido_3_de_4" && itemsInCart === 0) {//El usuario está intentando ir a cart 2 desde finish.
                //alert(previous_page);
                            
                window.history.go(-2);
                
            } else if (page_to_load === "empty_cart" && itemsInCart > 0) {//El usuario está visitando un carrito previamente vacío pero ya lleno.
                //alert("Te llenamos el carro!");
                            
                set_object_for_show_cart2(); 
                
            } else {            
            //Mostrar el objeto.
            modify_scenery(obj); //Se carga la página.   
        }
            
            
        } else {  //logged === false AND obj_logged === false.
            //Mostrar el objeto.
            modify_scenery(obj); //Se carga la página.            
        }
    });
        
    

    //Gestores para los eventos del FOOTER.
    $("#tablefooter").click(set_object_for_footer);


    //Gestor de eventos para eliminar artículos del CARRITO.
    $("#mostrador").delegate("#cart_table img", "click", modify_cart);


    //Gestor de eventos para abrir y cerrar la banda del ícono favoritos en cada ITEMBOX.
    $("#mostrador").delegate(".itemboxmarca img.nofavorite", "mouseenter", function() {

        $(this).next().stop().end();
        $(this).next().children('.innerexpand').show().end();   //Se muestra el elemento 'innerexpand'.
        $(this).next().animate({  //Se anima el elemento 'expand'.
                                width: '153px'
                                },
                                150,
                                function() {  //Se activa al terminar la animación de apertura.
                                                $(this).prepend("<span style='padding-left:5px'>A Favoritos</span>");
                                            });
    });

    $("#mostrador").delegate(".itemboxmarca img.nofavorite", "mouseleave", function() {
                     $(this).next().stop().end();
                     $(this).next().children('span').remove().end();   //Se elimina el texto.
                     $(this).next().children('.innerexpand').hide().end();   //Se oculta 'innerexpand'.
                     $(this).next().animate({  //Se anima el elemento 'expand'.
                            width: '0'
                            },
                            150
                        );
    });


    window.onresize = function() {
        set_cover_sizes();
    };
    
    
    
    
    
    /*************************************** SECCIÓN DE INICIALIZACIÓN   ***************************************/
    
            
    //Ajustar el tamaño de la portada.
    set_cover_sizes();
    
    //Establece el contenido a dibujar en la portada.
    set_cover_content();
   
    //Esta función establece el history object que estará asociado a la portada. Usa replaceState.
    set_object_for_cover();  
    
    $('#go span').text('Iniciando...');
           
    $("#go").fadeOut(500, function() {
        check_for_cookie(); //Luego, se llama a la función set_object_for_start_page()  
    });  
        
    $("#footerheader").hide();        
   
    //Se limpia el buscador.
    $('#searcher').val('');
    
    
    
    
    /*************************************** SECCIÓN DE FUNCIONES   ***************************************/
      
      
    function set_cover_sizes() {
        
        var WX = $(window).width(); //window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        var WY = $(window).height(); //window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight; 
        
        if (WX < 1000) {
            WX = 1000;
        }

        if (WY < 600) {
            WY = 600;
        }
       
        $('#top_cover').css('width', WX);
        $('#middle_cover').css('width', WX);
        $('#bottom_cover').css('width', WX);

        $('#top_cover').css('height', parseInt(0.20*WY));
        $('#middle_cover').css('height', parseInt(0.60*WY));
        $('#bottom_cover').css('height', WY - (parseInt(0.20*WY) + parseInt(0.60*WY)));
             
    };
    
    
    
    //Esta función escribe los textos de la portada.
    function set_cover_content() {
        
        var paper = new Raphael(document.getElementById('middle_cover'));

        var circle1 = paper.circle(1100, 90, 40);  //Círculos del lado derecho.
        var circle2 = paper.circle(1100, 175, 40);
        var circle3 = paper.circle(1100, 260, 40);

        circle1.attr({fill: '#A349A4', "stroke-width":0});
        circle2.attr({fill: '#A349A4', "stroke-width":0});
        circle3.attr({fill: '#A349A4', "stroke-width":0});  

        var t1 = paper.text(1100, 90, '1');  //Número de los cículos derechos.
        var t2 = paper.text(1100, 175, '2');
        var t3 = paper.text(1100, 260, '3');

        var st = paper.set();
        st.push(t1, t2, t3);    
        st.attr({ "font-size": 50, "font-family": "roboto", fill: 'white'}); // changes the fill of both circles

        var r1 = paper.text(350, 30, 'La mejor manera de comprar:');
        var comodo = paper.text(150, 90, 'Cómodo,');
        var rapido = paper.text(150, 175, 'Rápido,');
        var seguro = paper.text(150, 269, 'Seguro,');
        var r3 = paper.text(405, 338, 'está en');
        var r4 = paper.text(590, 342, 'CarbonCopy');

        var circle_tick1 = paper.image("icons-svg/affirmative1.svg", 60, 50, 80, 80);
        var circle_tick2 = paper.image("icons-svg/affirmative1.svg", 60, 140, 80, 80);
        var circle_tick3 = paper.image("icons-svg/affirmative1.svg", 60, 230, 80, 80);

        r1.attr({ "font-size": 50, "font-family": "roboto", fill: 'gray', 'text-anchor':'start' });
        comodo.attr({ "font-size": 30, "font-family": "roboto", fill: 'gray', 'text-anchor':'start'  });
        rapido.attr({ "font-size": 30, "font-family": "roboto", fill: 'gray', 'text-anchor':'start'  });
        seguro.attr({ "font-size": 30, "font-family": "roboto", fill: 'gray', 'text-anchor':'start'  });
        r3.attr({ "font-size": 50, "font-family": "roboto", fill: 'gray', 'text-anchor':'start'  });
        r4.attr({ "font-size": 50, "font-family": "carbontype", fill: '#A349A4', 'text-anchor':'start'  });       

        var d1 = paper.text(1150, 90, 'Regístrese');
        var d2 = paper.text(1150, 175, 'Elija');
        var d3 = paper.text(1150, 260, 'Listo');

        var st = paper.set();
        st.push(d1, d2, d3);    
        st.attr({ "font-size": 30, "font-family": "roboto", fill: 'gray', "text-anchor":'start'}); // changes the fill of both circles        

        circle1.mouseover(function(e) {
            this.attr("fill", "gray");
        }).mouseout(function(e) {
            this.attr("fill", "#A349A4");
        });

        circle2.mouseover(function(e) {
            this.attr("fill", "gray");
        }).mouseout(function(e) {
            this.attr("fill", "#A349A4");
        });

        circle3.mouseover(function(e) {
            this.attr("fill", "gray");
        }).mouseout(function(e) {
            this.attr("fill", "#A349A4");
        });

        t1.mouseover(function(e) {
            circle1.attr("fill", "gray");
        });

        t2.mouseover(function(e) {
            circle2.attr("fill", "gray");
        });

        t3.mouseover(function(e) {
            circle3.attr("fill", "gray");
        });

        var c = paper.image("icons/logo_cover.png", 480, 85, 400, 204);
    }    
    
    
    
    //Esta función se ejecuta apenas se accesa al sitio, y verifica si existe la cookie de memoria de sesión.
    //De ser así, se inicializan en el servidor las variables de sesión que corres´ponden al usuario.
    function check_for_cookie() {
            
        $("#go span").text("Verificando identidad...");
        $("#go").fadeIn(500);
                    
        $.ajax({
                type: "POST",
                url: "scripts_php/validate_cookie.php",
                data: {},
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                dataType: "json",            
                success: function(response) {
                    
                    //var data = JSON.parse(response);
                    var status = response.status;  //'success' or 'failed'
                    var message = response.message;
                    var userName = response.userName;

                    if (status === 'failed') {
                        //El usuario no tiene la cookie de memoria de sesión.
                        //El usuario deberá logearse para acceder a su cuenta.                       
                        
                        $("#go").fadeOut(500, function() {
                            //Cargar catálogo.
                            load_catalog();
                        });  
                        
                        return;
                    }

                    if (status === 'success') {//El sistema tiene vigente la cookie de sesión.
                        
                        var numfavorites = response.numfavorites;      
                        window.envio = parseFloat(response.envio);
                        window.mmpce = parseFloat(response.mmpce);    
                        
                        if (numfavorites !== null && window.envio !== null && window.mmpce !== null) {                      
                            

                            $('#greeting span').text(message + " " + userName.split(" ")[0] + ".");
                            $('#headernumfavorites').text(numfavorites + " favoritos");

                            //Actualizar el texto de los elementos con ID 'loginregister' y 'loginlogin'
                            document.getElementById('loginregister').innerHTML = "<span>Salir</span>";
                            document.getElementById('loginlogin').innerHTML = "<span>Mi Cuenta</span>";
                        } 
                                                
                        $("#go").fadeOut(500, function() {                            
                            //Cargar catálogo.
                            load_catalog();
                        });                          
                        
                        return;
                    }
                }
            }).fail(function() {//No se pudo establecer la conexión con el servidor.
                $("#go").fadeOut(500, function() {
                            
                    //Cargar catálogo.
                    load_catalog();
                });
                
                return;
        });      
    }                    
    
    
    
    //Esta función es invocada desde check_for_cookie() y se encarga de cargar el catálogo.
    function load_catalog() {
        $("#go span").text("Cargando catálogo...");  
        $("#go").fadeIn(500);
        
        $.ajax({
            type: "POST",
            url: "scripts_php/get_json_for_search.php",            
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            data: {},
            dataType: "json",                        
            success: function(data) {
                window.products = data;
                $("#go").fadeOut(500, function() {
                    
                    //Colocar la pantalla con los artículos más populares al inicio.
                    load_start_page(); 
                                           
                    //activate_go_button();
                });
            }
            }).fail(function() {//No se pudo establecer la conexión con el servidor.
                //window.json_catalog_is_being_requested = false;  
        }); 
    }
        
    
    
    //Esta función carga en segundo plano los artículos de la subcategoría deseada, antes de que se active el botón "Entrar".
    function load_start_page() {
        
        $("#go span").text("Preparando inicio...");  
        $("#go").fadeIn(500, function() {//Al terminar el fadeIn, se carga el catálogo.
            var dataToSend = {};
            
            dataToSend.subcategory = "R01";
            dataToSend.order = "popularity";

            $.ajax({
                type: "POST",
                url: "scripts_php/get_subcat_products.php",
                data: dataToSend,
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                dataType: "html",            
                success: function(data){ //Al cargarse el catálogo, se hace fadeOut sobre #go.
                    window.startpage = data;
                    //$("#mostrador").html(data);
                    
                    $("#go").fadeOut(500, function() {//Al terminar la animación, se activa el botón "Entrar".
                        //Activar botón.
                        activate_go_button();
                    }); 
                }                
            }).fail(function() {//No se pudo establecer la conexión con el servidor.            
                //set_object_for_failed_processing();
            });   
        });
    }
    
    
    
    //Esta función se activa cuando ya se cargaron los productos de la pantalla de entrada; activa al botón "Entrar".
    function activate_go_button() {  
        
        var WX = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        var WY = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight; 
        
        $("#go.loading").attr("class", "ready"); 
        $('#go').css('width', 0.16*WX);
	$('#go').css('height', 0.35*(WY - (parseInt(0.20*WY) + parseInt(0.60*WY))));
        
        $("#go.ready span").text("Entrar");
        $("#go").fadeIn(500);
        
        //Función que se activa al haer click.
        $("#cover_screen #go.ready").click(function() {
            $("#cover_screen").hide();
            $("#container").show();          

            $(document).scrollTop(0);
            
            //Colocar la pantalla con los artículos más populares al inicio.
            set_object_for_start_page();
        });
    }
    
   
    //Se agregan addEventListeners a cada elemento del menú lateral de categorías.
    var menuNodeList = document.getElementsByClassName("mnubtn");
    var numCategories = menuNodeList.length;

    for (var i = 0; i< numCategories; i++) {
        var label = menuNodeList.item(i).getAttribute("id");
        document.getElementById(label).addEventListener("mouseenter", show_subcat2, false);
    }
    
    

    //Actualizar datos del carrito.        
    $('#cartitems').html(window.totalItems + " artículos");
    $('#cartamount').html(accounting.formatMoney(window.totalamount));    

    //Activar los botones de la 'loginzone'...
    //El handler 'login_user' debe permitir registrar un nuevo usuario, o finalizar la sesión,
    //dependiendo del texto contenido en el elemento con ID 'loginlogin'
    document.getElementById("loginlogin").addEventListener("click", login_user, false);

    //El handler 'register_new_user' debe permitir registrar un nuevo usuario, o finalizar la sesión,
    //dependiendo del texto contenido en el elemento con ID 'loginregister'
    document.getElementById("loginregister").addEventListener("click", register_new_user, false);

    document.getElementById("logintel").addEventListener("click", show_contact_form, false);

    //También ocultar todos los menus al salir de la zona de menus.
    document.getElementById('auxiliarybanner').addEventListener("mouseenter", hide_all_menus, false);
    document.getElementById('mostrador').addEventListener("mouseover", hide_all_menus, false);
    
    //Esta función se activa al hacer click sobre el logo superior izquierdo.
    $('#navheader').click(function() {
        //Preparar objeto
        set_object_for_cover();        

    });



    //Esta función oculta los menús de subcategorías..
    function hide_all_menus() {
        //Ccultar todos los elementos '.submenu'...
        $('.submenu').addClass('submenu_hidden').removeClass('submenu_visible');

        //...y volver todos los elementos 'mnubtn' a su estilo CSS original.
        $('.mnubtn').addClass('mnubtn_out').removeClass('mnubtn_hover');
    }



    //Esta función muestra o cierra los menús de subcategorías.
    function show_subcat2(subcat) {
        var subcatName = subcat.target.id;
        var idForJquery = "#" + subcatName;
        
        //Colocar todos los elmentos '.mnutbn' a su estilo CSS inicial.
        $('.mnubtn').addClass('mnubtn_out').removeClass('mnubtn_hover');

        //...y ocultar todos los elementos '.submenu'.
        $('.submenu').addClass('submenu_hidden').removeClass('submenu_visible');

        //Poner en blanco el elemento 'mnubtn' en el que se encuentra el cursor.
        $(idForJquery).removeClass('mnubtn_out');
        $(idForJquery).addClass('mnubtn_hover');

        //...y mostrar su correspondiente submenu.
        var idSubmenu = idForJquery + 'c';
        $(idSubmenu).addClass('submenu_visible').removeClass('submenu_hidden').hide().fadeIn(500);
    }



    //Este objeto se carga cuando el usuario carga la aplicación.    
    function set_object_for_cover() {
        
        var logged = (getCookie("auth") !== '') ? true:false;             
        var obj = {"origin" : "home", "logged" : logged};     
        
        window.history.replaceState(obj, "", "?page=" + obj.origin);

        //Pasar el objeto 'obj' almodificador de escenario y al historia.
        modify_scenery(obj);
    }    
    
    
    
    //Esta función se activa cuando el usuario hace click en el botón "Entrar" de la portada.
    function set_object_for_start_page() {                
        
        var logged = (getCookie("auth") !== '') ? true:false;
        
        var subcategory = "R01";
        var rotulo = "Refrescos varios";
        var obj = {"origin": "navmenu", "logged" : logged, "content":window.startpage, "data":{"subcategory": "R01"}, "script":{}, "order":"popularity", "rotulo": rotulo};
        
        window.history.pushState(obj, "", "?page=" + subcategory + '::::::order_by_popularity');
        
        //Pasar el objeto 'obj' almodificador de escenario y al historia.
        modify_scenery(obj);                         
    }



    function set_object_for_login() {
        
        var logged = (getCookie("auth") !== '') ? true:false;
        var filename = "login.html";
        var path = "scripts_php/";

        var obj = {"origin": "login", "logged" : logged, "data":{}, "script":{"filename":filename, "path": path}};
        
        window.history.pushState(obj, "", "?page=" + obj.origin);

        //Pasar el objeto 'obj' almodificador de escenario y al historia.
        modify_scenery(obj);    
    }



    //Esta función se encarga de dibujar el carrito vacío y crea la respectiva entrada en el historial.
    function set_object_for_empty_cart() {
        
        var obj = {"origin": "empty_cart", "logged" : true, "data":{}};
        
        window.history.pushState(obj, "", "?page=" + obj.origin);
        
        //Pasar el objeto 'obj' almodificador de escenario y al historia.
        modify_scenery(obj); 
    }
    


    //Esta función es invocada al manipular el carrito y dejarlo vacío.
    function set_object_for_empty_cart2() {
        
        var obj = {"origin": "empty_cart", "logged" : true, "data":{}};
        
        window.history.replaceState(obj, "", "?page=" + obj.origin); 

        //Pasar el objeto 'obj' almodificador de escenario y al historia.
        modify_scenery(obj);
    }



    function set_object_for_my_account() {
        
        var filename = "my_account.php";
        var path = "scripts_php/";        
        
        var obj = {"origin": "my_account", "logged" : true, "data":{}, "script":{"filename":filename, "path": path}};
        
        history.pushState(obj, "", "?page=" + obj.origin);

        //Pasar el objeto 'obj' almodificador de escenario y al historia.
        modify_scenery(obj);
    }


    
    function set_object_for_show_cart1() {
        var obj;
             
        var obj = {"origin": "colocar_pedido_1_de_4", "logged" : true, "data":{}};
                
        history.pushState(obj, "", "?page=" + obj.origin);
                
        //Pasar el objeto 'obj' almodificador de escenario y al historia.
        modify_scenery(obj);       
    }
    
    

    //Esta función se encarga de desplegar el carrito de compras.
    function set_object_for_show_cart() {     
        
        //Primero, se debe verificar que el usuario esté autenticado.
        //Se examinará localmente la presencia o ausencia de la cookie 'auth'.
        var userid = getCookie("auth");
        var itemsInCart = window.cart.length;   
        
        if (userid !== "") {
            
            if (itemsInCart > 0) {//El carrito contiene artículos.
            
            set_object_for_show_cart1();
                
            } else {//Usuario logeado, carrito vacío.
                set_object_for_empty_cart();
            }

        } else {  //Colocar en el mostrador la ventana de login.             
            set_object_for_login();           
        }
    }
    
    
    
    //Esta función se invoca únicamente cuando el usuario intentó ver el carrito sin estar logeado.
    //Una vez logeado, esta función permite que el usuario vuelva al cart1_4 o al carrito vació,
    //dependiendo de si tiene artículos o no. El carro reemplaza al login del historial.
    function set_object_for_show_cart2() {

        var itemsInCart = window.cart.length;  
        
        if (itemsInCart > 0) {//El carrito contiene artículos.
            var obj;
            var obj = {"origin": "colocar_pedido_1_de_4", "logged" : true, "data":{}};
                
            history.replaceState(obj, "", "?page=" + obj.origin);

            //Pasar el objeto 'obj' almodificador de escenario y al historia.
            modify_scenery(obj);  

        } else {
                
            set_object_for_empty_cart2();
        }        
    }



    //Esta función se ejecuta cuando el usuario pulsa "Siguiente" en la ventana "colocar_pedido_1_de_4"
    function set_object_for_cart2_4() {               
        
        //Crar objeto para que el scenery manager muestre los datos de dirección actual del usuario.
            
        var filename = "get_user_address.php";
        var path = "scripts_php/";

        var obj = {"origin": "colocar_pedido_2_de_4", "logged" : true, "data":{}, "script":{"filename":filename, "path": path}};
        
        history.pushState(obj, "", "?page=" + obj.origin);          
        
        //Pasar el objeto 'obj' almodificador de escenario y al historia.
        modify_scenery(obj);
    }



    //Esta función se ejecuta cuando el usuario pulsa "Siguiente" en la ventana "colocar_pedido_2_de_4"
    function set_object_for_cart3_4() {
        //Cargar objeto para que el scenery manager muestre los datos de horario del pedido.
            
        var filename = "select_schedule.php";
        var path = "scripts_php/";

        var obj = {"origin": "colocar_pedido_3_de_4", "logged" : true, "data":{}, "script":{"filename":filename, "path": path}};
      
        history.pushState(obj, "", "?page=" + obj.origin);
        
        //Pasar el objeto 'obj' almodificador de escenario y al historia.
        modify_scenery(obj);
    }



    //Una vez que el usuario ha escogido un horario de entrega y presionado el botón 'Siguiente',
    //se activará la siguiente función.
    function set_object_for_finish_order() {

        //Preparar los objetos que se habrán de enviar al script.
        //Recalcular las cantidades globales.
        window.subtotal = get_subtotal();
        window.totaliva = get_totaliva();       
        window.totalsavings = get_totalsavings();    
        window.totalprofit = get_totalprofit();   
            
        if (window.subtotal + window.totaliva >= window.mmpce) {
            window.envio = 0;
        } 

        window.saldototal = window.subtotal + window.totaliva + window.envio - window.totalsavings;     
      
        //Construcción del objeto order.
        var order = {};
        var arrayItems = [];

        for (var i = 0; i < window.cart.length; i++) {   
            //Se agrega el ítem i-ésimo al array 'arrayItems'.
            arrayItems.push(JSON.stringify(window.cart[i]));
        }    

        var itemsStr = '[' + arrayItems.join(', ') + ']';

        order.items = itemsStr;

        order.subtotal = window.subtotal;
        order.totaliva = window.totaliva;           
        order.totalenvio = window.envio;
        order.totalsavings = window.totalsavings; 
        order.totalprofit = window.totalprofit;
        order.saldototal = window.saldototal;        
        order.orderTime = window.orderTime;
        order.orderitems = window.totalItems;
        
        //alert(JSON.stringify(order));

        //Conectar con el script que guardará los datos de la orden.                
        set_object_for_ongoing_processing();
               
        $.ajax({
            type: "POST",
            url: "scripts_php/finish_order.php",            
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            data: order,
            dataType: "json",                        
            success: function(data) {
                var status = data.status;  //'success' or 'failed'.                

                if (status === 'failed') {//Los datos no se pudieron escribir.

                    //Colocar el mensaje en el elemento DOM adecuado.
                    hide_progress_bar();
                    set_object_for_failed_processing();                    

                } else if (status === 'success') {//Los datos se pudieron escribir.

                    var orden = data.orden;
                    var fechaentrega = data.fechaentrega;
                    
                    hide_progress_bar();

                    //Cargar la ventana de agradecimiento, mostrando los datos de horario del pedido, y el ID del pedido.
                    set_object_for_success_order(orden, fechaentrega);
                }
            }
            }).fail(function() {//No se pudo establecer la conexión con el servidor.  
                    hide_progress_bar();
                    set_object_for_failed_processing();
            }); 
    }
    
    
    
    
    //Esta función se activa cuando el usuario introduce el ratón en el área del elemento #orderby.
    //Su propósito es colocar y volver visible el menú #ordercriteria.
    function get_ordered_items(e) {   

        //Posicionar el elemento #active_criteria.
        //Obtener la posición del elemento #orderby span.
        var left = $('#active_criteria').offset().left;
        var top = $('#active_criteria').offset().top;

        //Asignar dicha posición al elemento .
        $('#ordercriteria').css('left', left);
        $('#ordercriteria').css('top', top + 50);

        //Se muestra el elemento #ordercriteria.
        $('#ordercriteria').show();

        //Asignar colores para el elemento #orderby.
        $('#orderby').css('color', 'white');
        $('#orderby').css('background-color', '#A349A4');

        //Ajustar los estilos de bordes.
        $('#active_criteria').css({'border-bottom': '1px dashed #bdc3c7'});
        $('#ordercriteria').children("div.visible").first().css({'border-bottom': '1px dashed #bdc3c7'});
        $('#ordercriteria').children("div.visible").first().next().css({'border-bottom': '1px solid #bdc3c7'});
    }



    //Esta función se activa cuando se hace click en los elementos "#ordercriteria div".
    function change_order_criteria(e) {
        var elem = e.target.parentNode.id;    //'popularity', 'cheaper' o 'expensive'.

        //Mostrar el elemento que actualmente está oculto (#ordercriteria div.criteria).
        var currentActiveElement = $('#ordercriteria div.criteria');

        currentActiveElement.attr('class', 'visible');     
        currentActiveElement.show();   

        //Se selecciona el elemento clickado.
        var newActiveElement = $(this).closest('div'); 
        var newActiveCriteriaContent = newActiveElement.html();

        $('#active_criteria').html(newActiveCriteriaContent);

        //Se oculta el elemento clickado.
        newActiveElement.attr('class', 'criteria');

        //Ajustar los estilos de bordes.
        $('#active_criteria').css({'border-bottom': '1px dashed #bdc3c7'});
        $('#ordercriteria').children("div.visible").first().css({'border-bottom': '1px dashed #bdc3c7'});
        $('#ordercriteria').children("div.visible").last().css({'border-bottom': '1px solid #bdc3c7'});    
        
        var subcategory = $('#orderby').attr('data-subcategory');
        //alert(subcategory);
        var logged = (getCookie("auth") !== '') ? true:false;
        var filename = "get_subcat_products.php";
        var path = "scripts_php/";
        var subcat_trans = $("#auxiliarybanner").find("#bright_subcat span").text();
        
        var obj = {"origin": "navmenu", "logged" : logged, "data":{"subcategory": subcategory}, "script":{"filename":filename, "path": path}, "order": elem, "refresh": "no", "rotulo":subcat_trans};
        
        //Se oculta el submenú de opciones de ordenado.        
        $('#ordercriteria').css('display', 'none');
        
        history.pushState(obj, "", "?page=" + subcategory + '::::::order_by_' + elem);

        //Pasar el objeto 'obj' almodificador de escenario y al historia.
        modify_scenery(obj);        
    }
    
    
    
    //Esta función se activa al hacer click en cada subcategoría de productos.
    function show_top_order_items_menu() {
        
        var content = "<div id='orderby'><span>Artículos ordenados por:</span></div>";
        content += "<div id='active_criteria'><span>Más populares primero</span></div>";
        content += "<div id='ordercriteria'><div id='popularity' class='criteria'><span>Más populares primero</span></div>";
        content += "<div id='cheaper' class='visible'><span>Más baratos primero</span></div>";
        content += "<div id='expensive' class='visible'><span>Más caros primero</span></div>";
        content += "</div>";
       
        $("#auxiliarybanner").append(content);
        
        //Activar el elemento #orderby.
        $('#orderby').attr('class', 'active');
    }




    //Esta función se activa cuando el usuario hace click en alguna de las subcategorías de productos.
    function set_object_for_submenu(e) {
        var subcategory = e.target.dataset.subcat; //R01, R02, etc.  
        var subcat_trans = $(this).text();        
     
        var logged = (getCookie("auth") !== '') ? true:false;
        var filename = "get_subcat_products.php";
        var path = "scripts_php/";
        var obj = {"origin": "navmenu", "logged" : logged, "data":{"subcategory": subcategory}, "script":{"filename":filename, "path": path}, "order":"popularity", "refresh": "yes", "rotulo":subcat_trans};
    
        window.history.pushState(obj, "", "?page=" + subcategory + '::::::order_by_popularity');
        
        //Pasar el objeto 'obj' almodificador de escenario y al historia.
        modify_scenery(obj);
    }



    //Esta función se activa cuando el usuario hace click en alguno de los elementos del menú del footer.
    function set_object_for_footer(e) {
        var footer_item = e.target.dataset.cell; //'who', 'terms', etc.
        
        var logged = (getCookie("auth") !== '') ? true:false;        
        var obj;

        var arrayOfFiles = ["who", "terms", "delivery", "devolution", "privacy", "faqs", "sendings", "payment", "joinus"];
        var index = arrayOfFiles.indexOf(footer_item);
       
        if (index >= 0) {
            var filename = footer_item + ".html";
            var obj = {"origin": "footer",  "logged" : logged, "data":{}, "script":{"filename":filename, "path": "scripts_html/"}};            
        }
        
        if (footer_item === "joinus") {
            footer_item = "contact";
        }
       
        window.history.pushState(obj, "", "?page=" + footer_item);
        
        //Pasar el objeto 'obj' almodificador de escenario y al historia.
        modify_scenery(obj);       
    }
    
    
    
    //Esta función se activa cuando el usuario presiona el link para las Condiciones de Uso en el form de registro.
    function set_object_for_check_conditions() {
        
        var filename = "terms.html";
        var path = "scripts_html/";        
           
        var obj = {"origin": "policy",  "logged" : false, "data":{}, "script":{"filename":filename, "path": path}};     

        window.history.pushState(obj, "", "?page=" + obj.origin);

        //Pasar el objeto 'obj' almodificador de escenario y al historia.
        modify_scenery(obj);        
    }




    function set_object_for_ongoing_processing() {                
        
        var tableHTML = "<div class='emptycart'>";
        tableHTML += "<table>";
        tableHTML += "<tr><td><img src='img_preloaders/ajax-loader.gif'></td></tr>";
        tableHTML += "<tr><td>Cargando los datos. Un momento, por favor...</td></tr>";
        tableHTML += "</table>";
        tableHTML += "</div>";

        $("#mostrador").html(tableHTML);

        return;
    }



    function set_object_welcome_new_user() {       
        
        var obj = {"origin": "welcome_new_user", "logged" : false, "data":{}};
        
        window.history.pushState(obj, "", "?page=" + obj.origin);

        //Pasar el objeto 'obj' almodificador de escenario y al historia.
        modify_scenery(obj);
    }



    //Esta función se ejecuta cuando el usuario logró colocar una orden de forma exitosa.
    function set_object_for_success_order(orden, fechaentrega) {
        
        var trimmed = fechaentrega.trim();
        var fecha = trimmed.split(" ")[0];
        var hora = trimmed.split(" ")[1];

        var tableHTML = "<div class='cartcontainer'>";
        tableHTML += "<table>";
        tableHTML += "<tr><td><img src='icons/welcome2.png' width='381' height='184' /></td></tr>";
        tableHTML += "<tr><td align='center'>Estimado Cliente: gracias por su compra.</td></tr>";
        tableHTML += "<tr><td align='center'>&nbsp;</td></tr>";
        tableHTML += "<tr><td align='center'>Su número de orden es: " + orden + ".</td></tr>";
        tableHTML += "<tr><td align='center'>Fecha de entrega requerido: " + fecha + ".</td></tr>";
        tableHTML += "<tr><td align='center'>Hora de entrega requerido: " + hora + ".</td></tr>";
        tableHTML += "<tr><td align='center'>&nbsp;</td></tr>";
        tableHTML += "<tr><td align='center'>En Carbon Copy estaremos encantados de poder servirle nuevamente.</td></tr>";           
        tableHTML += "</table>";       
        tableHTML += "</div>";

        var obj = {"origin": "colocar_pedido_4_de_4", "logged" : true, "data":{}, "content": tableHTML};
        
        history.pushState(obj, "", "?page=" + obj.origin); 

        //Pasar el objeto 'obj' almodificador de escenario y al historia.
        modify_scenery(obj);
    }
    


    //Esta función se activa cuando ocurre una falla en la conexión con el servidor.
    function set_object_for_failed_processing() {
        
        var logged = (getCookie("auth") !== '') ? true:false;
        var obj = {"origin": "failed_processing", "logged" : logged, "data":{}};
   
        window.history.pushState(obj, "", "?page=" + obj.origin);

        //Pasar el objeto 'obj' almodificador de escenario y al historia.
        modify_scenery(obj);
    }



    function set_object_for_favorites() {
        
        var filename = "get_user_favorites.php";
        var path = "scripts_php/";

        var obj = {"origin": "my_favorites", "logged" : true, "data":{}, "script":{"filename":filename, "path": path}};
        
        history.pushState(obj, "", "?page=" + obj.origin);
        
        //Pasar el objeto 'obj' almodificador de escenario y al historia.
        modify_scenery(obj);
    }



    //Esta función se activa cuando el usuario hace click en el botón "Contacto".
    function set_object_for_contact_form() {
        
        var logged = (getCookie("auth") !== '') ? true:false;
        var filename = "joinus.html";
        var path = "scripts_html/";

        var obj = {"origin": "contact", "logged" : logged, "data":{}, "script":{"filename":filename, "path": path}};        
        
        window.history.pushState(obj, "", "?page=" + obj.origin);
        
        //Pasar el objeto 'obj' almodificador de escenario y al historia.
        modify_scenery(obj);     
    }

 
    
    //Esta función se activa al dispararse el evento blur en los campos del formulario de contacto.
    function check_contact_field(e) {
        var elem = e.target.id;           
                
        //Expresiones regulares para validación de los campos.
        var regex_for_name = /^[A-Za-zñÑÁÉÍÓÚáéíóú]+([\s']?[a-zñÑÁÉÍÓÚáéíóú]+)*(\s[A-Za-zñÑÁÉÍÓÚáéíóú]+)*(-[A-Za-zñÑÁÉÍÓÚáéíóú]+)?$/;  //Done.
        var regex_for_email = /[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}/;  //Done.
        var regex_for_message = /^[A-Za-zñÑÁÉÍÓÚáéíóú,;"'\.]+(\s[A-Za-zñÑÁÉÍÓÚáéíóú]'?[a-z]+)*(\s\d*|[A-Za-zñÑÁÉÍÓÚáéíóú,;"'\.]+)*(-[A-Za-zñÑÁÉÍÓÚáéíóú,;"']+)?((\s|-)\d+")?\.?$/;   //Done. 
                       
        //Validación de los campos del formulario.              
        if (elem === "contact_name") {
            var name = $("#contact_name").val();
            
            if (!regex_for_name.test(name)) {//Patrón incorrecto para el nombre.
            //Mostrar mensaje de advertencia al usuario.
            window.valid_name = false;
            
                if ($('.mydata .register_error.no_valid_nombre').length === 0) {
                    $('#contact_name').closest('tr').after("<tr class='register_error no_valid_nombre'><td class='error_heading'>Error:</td><td class='error_message'>Introduzca un nombre válido.</td></tr>");    
                }

            } else {//Patrón correcto para el nombre.
                window.valid_name = true;
                $('.mydata .register_error.no_valid_nombre').remove();
            }    
        }
        
        
        
        if (elem === "contact_email") {
            
            var email = $("#contact_email").val(); 
            
            if (!regex_for_email.test(email)) {//Patrón incorrecto para el email.
                window.valid_email = false;

                //Mostrar mensaje de advertencia al usuario.
                if ($('.mydata .register_error.no_valid_email').length === 0) {
                    $('#contact_email').closest('tr').after("<tr class='register_error no_valid_email'><td class='error_heading'>Error:</td><td class='error_message'>Introduzca una dirección de email válida</td></tr>");
                }

            } else {
                window.valid_email = true;
                $('.mydata .register_error.no_valid_email').remove();
            }            
        }        
        
        
        
        if (elem === "contact_subject") {
            
            var subject = $("#contact_subject").val();
            
            if (!regex_for_message.test(subject)) {//Patrón incorrecto para el asunto.
                window.valid_subject = false;

                //Mostrar mensaje de advertencia al usuario.
                if ($('.mydata .register_error.no_valid_subject').length === 0) {
                    $('#contact_subject').closest('tr').after("<tr class='register_error no_valid_subject'><td class='error_heading'>Error:</td><td class='error_message'>Introduzca un asunto válido</td></tr>");
                }

            } else {  //Patrón correcto para el asunto.
                window.valid_subject = true;
                $('.mydata .register_error.no_valid_subject').remove();
            }
        }
        
        
        
        if (elem === "contact_message") {
            var message = $("#contact_message").val();
                    
            if (!regex_for_message.test(message)) {//Patrón incorrecto para el mensaje.
                window.valid_message = false;

                //Mostrar mensaje de advertencia al usuario.
                if ($('.mydata .register_error.no_valid_message').length === 0) {
                    $('#contact_message').closest('tr').after("<tr class='register_error no_valid_message'><td class='error_heading'>Error:</td><td class='error_message'>Introduzca mensaje válido</td></tr>");
                }

            } else {  //Patrón correcto para el mensaje.
                window.valid_message = true;
                $('.mydata .register_error.no_valid_message').remove();
            }
        }
        
        
        if (window.valid_name && window.valid_email && window.valid_subject && window.valid_message) {//Los campos del formulario tienen el patrón correcto.
            //Bailitar el botón "Enviar".
            $("#contact_commit").attr("class", "mydatabutton active");
            
        } else {
            $("#contact_commit").attr("class", "mydatabutton inactive");
        }
        
        return;
    }  
        
    
    
    //Esta función se activa cuando el usuario presiona el botón "Enviar" en el formulario de contacto de proveedores.
    function submit_contact_data() {
                
        if (window.valid_name && window.valid_email && window.valid_subject && window.valid_message) {//Los campos del formulario tienen el patrón correcto.
            
            //Lectura de los datos del formulario.
            var name = $("#contact_name").val();
            var email = $("#contact_email").val(); 
            var subject = $("#contact_subject").val();
            var message = $("#contact_message").val();
            var backup = $('#contact_backup').is(':checked');  //true / false
            
            $("#contact_status").removeClass();
            $("#contact_status").text("Enviando mensaje..."); 
            
            //Objeto de verificación que se enviará al script.
            var obj = {"name": name, "email": email, "subject": subject, "message": message, "backup": backup};
            
            //Enviar el objeto al script validate_user.php.
            $.ajax({
                type: "POST",
                url: "scripts_php/get_contact_message.php",
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                dataType: "json",
                data: obj,
                success: function(data) {
                    var status = data.status;  //'success' or 'failed'                    
                    
                    if (status === 'failed') {
                        //Hubo un fallo en la conexión con el servidor.
                        //Colocar el mensaje en el elemento DOM adecuado.
                        $("#contact_status").attr("class", "failed");
                        $("#contact_status").text(message);    //La conexión falló.
                    }

                    if (status === 'success') {//Se pudo establecer la conexión.
                        var message = data.message;
                        
                        //Colocar el mensaje en el elemento DOM adecuado.
                        $("#contact_status").attr("class", "success");
                        $("#contact_status").text(message);                                      
                    }
                }
            }).fail(function() {//No se pudo establecer la conexión con el servidor.   
                $("#contact_status").attr("class", "failed");
                $("#contact_status").text("No a sido posible enviar su mensaje. Intente nuevamente."); 
            });             
        }

        return false;
    }




    //Esta función se activa cuando el usuario envía el formulario de login 'loginform'.
    function check_credentials() { 

        var regex_for_email = /[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}/;  //Done.
        var regex_for_passwd = /([_a-zA-ZñÑáéíóúÁÉÍÓÚ\.\-\$]*\d*)+/;     

        var rememberStatus = $('#remember_me').is(':checked');  //true / false
        var email;
        var passwd;

        //Formar el objeto data que se enviará al archivo validate_user.php.
        //Primero, se deben extraer los valores de los campos.
        email = $("#loginemail").val();
        passwd = $("#loginpassword").val();

        //Agregar mensaje descriptvo 
        if (email.length === 0 || passwd.length === 0) {
            
            return;
            
        } else {

            //Objeto de verificación que se enviará al script.
            var obj = {"email": email, "passwd": passwd, "rememberme": rememberStatus};

            //Enviar el objeto al script validate_user.php.
            $.ajax({
                type: "POST",
                url: "scripts_php/validate_user.php",
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                dataType: "json",
                data: obj,
                success: function(data) {
                    var status = data.status;  //'success' or 'failed'
                    var message = data.message;

                    if (status === 'failed') {
                        //Hubo un fallo en la conexión con el servidor.

                        //Colocar el mensaje en el elemento DOM adecuado.
                        $('#loginstatus').html("<span class='maildontmatch'>" + message + "</span>");  //La conexión falló.
                    }

                    if (status === 'success') {//Se pudo establecer la conexión.

                        var userexists = data.userexists;
                        var useronly = data.useronly;
                        var validatedmail = data.validatedmail; //Indica si el usuario ya activó su cuenta (true) o nó (false).

                        if (userexists) {
                            if (useronly) {
                                if (validatedmail) {
                                    
                                    var username = data.username;
                                    window.envio = parseFloat(data.envio);
                                    window.mmpce = parseFloat(data.mmpce);
                                    var numfavorites = data.numfavorites;
                                    var idusuario = data.idusuario;

                                    //Se guarda el idusuario ya que se requiere para crear/borrar la cookie de sesión.
                                    sessionStorage.idusuario = idusuario;

                                    //Actualizar el contador de favoritos
                                    $('#headernumfavorites').text(numfavorites + " favoritos");

                                    //Actualizar el texto de los elementos con ID 'loginregister' y 'loginlogin'
                                    $('#loginregister').html("<span>Salir</span>");
                                    $('#loginlogin').html("<span>Mi Cuenta</span>");

                                    //Limpiar el elemento con ID 'loginstatus'
                                    $("#loginstatus").text("");

                                    //Actualizar el saludo con ID 'greeting' con el nombre del usuario.
                                    $('#greeting span').text(message + " " + username.split(" ")[0] + ".");

                                    //Crear la cookie de memoria de sesión. 
                                    if (rememberStatus === true) {
                                        setCookie('auth', idusuario, 14); //La cookie llamada 'auth' y valor idusuario se almacena durante 14 días.
                                    } else {
                                        document.cookie = 'auth='+idusuario;  //Solo para la sesión.
                                    }

                                    //Llevar a start_page.                                    
                                    set_object_for_start_page();


                                } else {//El usuario existe, pero no ha validado su correo electrónico.
                                    if ($('#logindata .register_error.no_active_email').length === 0) {

                                        //Se elimina cualquier mensaje previo de error.
                                        $('#logindata .register_error').remove();

                                        //Se agrega el nuevo mensaje de error.
                                        $('#loginemail').closest('tr').after("<tr class='register_error no_active_email'><td class='error_heading'>Error:</td><td class='error_message'>El usuario no ha validado su correo electrónico</td></tr>");            
                                    }

                                    //$('#loginstatus').html("<span class='maildontmatch'>" + message + "</span>");  //'La cuenta no ha sido activada'                                
                                    return;
                                }

                            } else {//Existen usuarios con las mismas credenciales repetidas. 
                                $('#loginemail').closest('tr').after("<tr class='register_error repeated_user'><td class='error_heading'>Error:</td><td class='error_message'>Existen usuarios con el mismo correo electrónico.</td></tr>");

                                return;
                            }

                        } else {//El usuario solicitado no existe en la base de datos.
                            if ($('#logindata .register_error.no_email').length === 0) {
                                //Se elimina cualquier mensaje previo de error.
                                $('#logindata .register_error').remove();

                                //Se agrega el nuevo mensaje de error.
                                $('#loginemail').closest('tr').after("<tr class='register_error no_email'><td class='error_heading'>Error:</td><td class='error_message'>El usuario no existe en la base de datos.</td></tr>");
                            }

                            return;
                        }                      
                    }
                }
            }).fail(function() {//No se pudo establecer la conexión con el servidor.            
                set_object_for_failed_processing();
            });             
        }

        return;
    }



    function modify_scenery(obj) {
        var origin = obj.origin;    //Detecta el tipo de información a cargar.
        $(document).scrollTop(0);
        
        //From: set_object_for_cover()
        if (origin === "home") {  
            
            localStorage.current_page = origin;
            $("#container").hide();      //Mostrar página.
            $("#cover_screen").show();   //Ocultar portada.
        }



        if (origin === "start_page") {            
            
            var subcategory = obj.data.subcategory;
            var fileToLoad = obj.script.path + obj.script.filename;
            var order = obj.order;
            var content = obj.content;   
            var rotulo = obj.rotulo;

            $('#cover_screen').hide();  //Ocultar la portada.
            $('#container').show();    //Mostrar el cuerpo de la tienda.

            show_top_order_items_menu();

            //Asignar la class subcatergory al elemento #orderby
            $('#orderby').attr('class', subcategory);

            //Posicionar el submenu #active_criteria.
            //Obtener la posición del elemento #orderby span.
            var left = $('#orderby').offset().left;
            var top = $('#orderby').offset().top;

            $('#active_criteria').css('left', left + 200);
            $('#active_criteria').css('top', top);
            $('#active_criteria').css('visibility', 'visible');
            
            localStorage.current_page = origin;
            var aux = "<div id='bright_subcat'><span>" + rotulo + "</span></div>";
            $("#auxiliarybanner").prepend(aux);
            
            $('#mostrador').html(content);                     
        }



        if (origin === "login") {            
            
            var path = obj.script.path;
            var filename = obj.script.filename;
            var fileToLoad = path + filename;

            set_object_for_ongoing_processing();      
            localStorage.current_page = origin;

            //Se carga mediante Ajax el HTML del formulario de login.

            $.ajax({
                type: "POST",
                url: "scripts_php/login.html",
                data: {},
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                dataType: "html",            
                success: function(results){   
                                        
                    if (localStorage.current_page === 'login') {
                        $('#mostrador').html(results); 
                        hide_top_order_items_menu();
                    }                    
                }                
            }).fail(function() {//No se pudo establecer la conexión con el servidor.            
                set_object_for_failed_processing();
            });  
        }



        if (origin === "empty_cart") {
            
            localStorage.current_page = origin;  
            
            var tableHTML = "<div class='emptycart'>";
            tableHTML += "<table>";
            tableHTML += "<tr><td><img src='icons/cart256x256.png'></td></tr>";
            tableHTML += "<tr><td>Su carrito de compras está vacío.</td></tr>";
            tableHTML += "</table>";
            tableHTML += "<div id='mycartbuttoncontainer'>";
            tableHTML += "<div class='button' id='emptycartbutton'><span>Atrás</span></div>";
            tableHTML += "</div>";        
            tableHTML += "</div>";

            $("#mostrador").html(tableHTML);

            hide_top_order_items_menu();
        }



        if (origin === "my_account") {            
            
            var path = obj.script.path;
            var filename = obj.script.filename;
            var fileToLoad = path + filename;

            //Cargar página con todos los datos del usuario.       
            set_object_for_ongoing_processing();
            localStorage.current_page = origin;
            
            $.ajax({
                type: "POST",
                url: fileToLoad,
                data: {},
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                dataType: "html",            
                success: function(data){   

                    if (localStorage.current_page === 'my_account') {
                        $('#mostrador').html(data); 
                        hide_top_order_items_menu();
                    }
                }                
            }).fail(function() {//No se pudo establecer la conexión con el servidor.            
                    set_object_for_failed_processing();
            }); 
        }



        if (origin === "colocar_pedido_1_de_4") {

            hide_top_order_items_menu();
            show_progress(1, 4);
             
            //Dibujar carrito.     
            //Recalcular las cantidades globales.
            window.subtotal = get_subtotal();
            window.totaliva = get_totaliva();       
            window.totalsavings = get_totalsavings();    
            window.totalprofit = get_totalprofit();           
            
            if (window.subtotal + window.totaliva >= window.mmpce) {
                window.envio = 0;
            } 

            window.saldototal = window.subtotal + window.totaliva + window.envio - window.totalsavings;       
     
            var nextItemInCartObj;
            var itemName;       
            var quantty;
            var pnoiva;       

            var tableHTML = "";

            localStorage.current_page = origin;

            //Se dibuja el carrito con sus botones de "Volver" y "Siguiente".
            var tableHTML = "<div class='cartcontainer'><p>Su carrito contiene lo siguiente:</p>";
            
            tableHTML += "<table id='cart_table'>";
            tableHTML += "<thead><th>Id</th><th>Item</th><th>Cantidad</th><th>Precio</th><th>Eliminar</th><th>Subtotal</th></thead>";

            for (var i = 0; i < window.cart.length; i++) {//Se recuperan y muestran los datos de cada ítem.
                 
                nextItemInCartObj = window.cart[i];   
                itemName = nextItemInCartObj.name;
                quantty = nextItemInCartObj.quantty;
                pnoiva = nextItemInCartObj.pnoiva;

                tableHTML += "<tbody><tr><td>" + (i + 1) + "</td>";
                tableHTML += "<td>" + itemName + "</td>";
                tableHTML += "<td>" + quantty + "</td>";
                tableHTML += "<td>" + accounting.formatMoney(pnoiva) + "</td>";
                tableHTML += "<td><img src='icons/delete.png' width='25' height='25' id='" + i + "'></td>";
                tableHTML += "<td>" + accounting.formatMoney(quantty*pnoiva) + "</td></tr>";
            }

            tableHTML += "<tr><td colspan='6'></td></tr>";
            tableHTML += "<tr><td colspan='6'>" + "Subtotal: " + accounting.formatMoney(window.subtotal) + "</td></tr>";
            tableHTML += "<tr><td colspan='6'>" + "IVA: " + accounting.formatMoney(window.totaliva) + "</td></tr>";
            tableHTML += "<tr><td colspan='6'>" + "Ahorro: " + accounting.formatMoney(window.totalsavings) + "</td></tr>";
            tableHTML += "<tr><td colspan='6'>" + "Envío: " + accounting.formatMoney(window.envio) + "</td></tr>";
            tableHTML += "<tr><td colspan='6'>" + "Total: " + accounting.formatMoney(window.saldototal) + "</td></tr>";
            tableHTML += "</tbody></table>";
            tableHTML += "<div id='cartbuttoncontainer'>";
            tableHTML += "<div class='button' id='cartgobackbutton'><span>Volver</span></div>";
            tableHTML += "<div class='button' id='cartgotonextbutton'><span>Siguiente</span></div>";
            tableHTML += "</div>";
            tableHTML += "</div>";

            //Se muestra la tabla en el elemento 'mostrador'.
            $("#mostrador").html(tableHTML);  
        }



        if (origin === "colocar_pedido_2_de_4") {            
            
            var path = obj.script.path;
            var filename = obj.script.filename;
            var fileToLoad = path + filename;
           
            var cookieValue = getCookie("auth");
            
            set_object_for_ongoing_processing();
            localStorage.current_page = origin;          
                        
            //Se carga la pantalla 2_de_4.
            $.ajax({
                type: "POST",
                url: fileToLoad,
                data: {},
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                dataType: "html",            
                success: function(data){   

                    if (localStorage.current_page === 'colocar_pedido_2_de_4') {
                        
                        $('#mostrador').html(data); 
                        hide_top_order_items_menu();
                        show_progress(2, 4);

                        //Cargar los datos del objeto.
                        var dataToSend = {};
                        dataToSend.idusuario = cookieValue;

                        $.ajax({
                            type: "POST",
                            url: "scripts_php/fill_cart2_4.php",
                            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                            dataType: "json",
                            data: dataToSend,
                            success: function(data) {
                                var status = data.status;  //'success' or 'failed'

                                if (status==='success') {

                                    var municipio = data.municipio;
                                    var localidad = data.localidad;
                                    var colonia = data.colonia;
                                    var calle = data.calle;
                                    var edificio = data.edificio;
                                    var numext = data.numext;
                                    var numint = data.numint;
                                    var telnum = data.telnum;
                                    var ref = data.ref;

                                    //Cambiar el color del texto cargado a gray.
                                    $('#municipio').css('color', 'black');
                                    $('#localidad').css('color', 'black');
                                    $('#colonia').css('color', 'black');
                                    $('#calle').css('color', 'black');
                                    $('#edificio').css('color', 'black');
                                    $('#numext').css('color', 'black');
                                    $('#numint').css('color', 'black');
                                    $('#tel').css('color', 'black');
                                    $('#ref').css('color', 'black');

                                    //Se cargan los datos recibidos en cada campo.
                                    $('#municipio').val(municipio);
                                    $('#localidad').val(localidad);
                                    $('#colonia').val(colonia);
                                    $('#calle').val(calle);
                                    $('#edificio').val(edificio);
                                    $('#numext').val(numext);
                                    $('#numint').val(numint);
                                    $('#tel').val(telnum);
                                    $('#ref').val(ref);
                                }
                            }
                        }).fail(function() {//No se pudo establecer la conexión con el servidor.            
                            set_object_for_failed_processing();
                        }); 
                    } //Cierre de if
                }   //Cierre de success.             
            }).fail(function() {//No se pudo establecer la conexión con el servidor.            
                set_object_for_failed_processing();
            });

            return;
        }



        if (origin === "colocar_pedido_3_de_4") {            
            
            var path = obj.script.path;
            var filename = obj.script.filename;
            var fileToLoad = path + filename;
            
            set_object_for_ongoing_processing();
            localStorage.current_page = origin;
            
            $.ajax({
                type: "POST",
                url: fileToLoad,
                data: {},
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                dataType: "html",            
                success: function(data){   

                    if (localStorage.current_page === 'colocar_pedido_3_de_4') {
                        hide_top_order_items_menu();
                        show_progress(3, 4);
                        $('#mostrador').html(data);                         
                    }
                }                
            }).fail(function() {//No se pudo establecer la conexión con el servidor.            
                    set_object_for_failed_processing();
            }); 
        }



        if (origin === "colocar_pedido_4_de_4") {            
            
            var content = obj.content;

            //vaciar los datos del carrito.        
            localStorage.clear();            
            localStorage.current_page = origin;

            //Poner las cantidades del carrito a ceros.
            $("#cartitems").text("0 artículos");
            $("#cartamount").text("$0.00");

            $("#mostrador").html(content); 
            
            hide_top_order_items_menu();
            hide_progress_bar();            
        }



        if (origin === "navmenu") { 
            
            var content = obj.content;            
            var subcategory = obj.data.subcategory;
            var order = obj.order;
            var rotulo = obj.rotulo;
            
            $('#cover_screen').hide();  //Ocultar la portada.
            $('#container').show();    //Mostrar el cuerpo de la tienda 
            
            hide_progress_bar();  //Se oculta la barra de progreso. Para cuando el usuario proviene del carrito.
            
            if (content !== undefined) {//Se trata de la página inicial.               
                
                var lon = $("#auxiliarybanner").children("#orderby").length;
                
                if (lon === 0) { //No está presente el elemento #orderby. 
                    
                    show_top_order_items_menu();  
                    
                    //Posicionar el submenu #active_criteria.
                    //Obtener la posición del elemento #orderby span.
                    var left = $('#orderby').offset().left;
                    var top = $('#orderby').offset().top;

                    $('#active_criteria').css('left', left + 200);
                    $('#active_criteria').css('top', top);
                    $('#active_criteria').css('visibility', 'visible');                    
                    
                } else {    
                    //Reiniciar el orden de los criterios de ordenamiento.
                    var newText = $('#popularity').html();      

                    $('#popularity').attr('class', 'criteria');
                    $('#cheaper').attr('class', 'visible');
                    $('#expensive').attr('class', 'visible');

                    $('#active_criteria').html(newText); 
                }
                
                //Asignar la class subcatergory al elemento #orderby
                $('#orderby').attr({'class': 'active', 'data-subcategory': subcategory}); 
                
                var aux_long = $("#auxiliarybanner").children("#bright_subcat").length;
                
                if (aux_long > 0) {//Ya está presente el elemento #brigh_subcat.
                    $("#bright_subcat").remove();
                }
                
                //Se agrega el elemento #bright_subcat.
                var aux = "<div id='bright_subcat'><span>" + rotulo + "</span></div>";
                $("#auxiliarybanner").prepend(aux);
                
                localStorage.current_page = "start_page";
                    
                $("#mostrador").html(content); 
                
                replace_item_pictures();
                
            } else {
          
                var fileToLoad = obj.script.path + obj.script.filename;            
                var refresh = obj.refresh;

                var dataToSend = {};      

                dataToSend.subcategory = subcategory;
                dataToSend.order = order;

                $('#orderby').attr('class', 'noactive');
                set_object_for_ongoing_processing();
                localStorage.current_page = subcategory;

                $.ajax({
                    type: "POST",
                    url: fileToLoad,
                    data: dataToSend,
                    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                    dataType: "html",            
                    success: function(results){
                           
                            //Checa si ya existe una instancia del letrero de subcategoría.
                            var aux_long = $("#auxiliarybanner").children("#bright_subcat").length;
                            if (aux_long > 0) {
                                $("#bright_subcat").remove();
                            }                        

                            var aux = "<div id='bright_subcat'><span>" + rotulo + "</span></div>";
                            $("#auxiliarybanner").prepend(aux);

                            $('#mostrador').html(results);
                            replace_item_pictures();     
                            
                            var num_items = $('#mostrador div.itembox').length;
                            
                            if (num_items > 1) {//Procesar barra de ordenamiento de artículos.
                            
                                var lon = $("#auxiliarybanner").children("#orderby").length;
                                if (lon === 0) {//No está presente el menú de ordenamiento...

                                    show_top_order_items_menu();

                                    //Posicionar el submenu #active_criteria.
                                    //Obtener la posición del elemento #orderby span.
                                    var left = $('#orderby').offset().left;
                                    var top = $('#orderby').offset().top;

                                    $('#active_criteria').css('left', left + 200);
                                    $('#active_criteria').css('top', top);
                                    $('#active_criteria').css('visibility', 'visible');

                                    //Reiniciar el orden de los criterios de ordenamiento.
                                    var newText = $('#popularity').html();

                                    $('#popularity').attr('class', 'criteria');
                                    $('#cheaper').attr('class', 'visible');
                                    $('#expensive').attr('class', 'visible');

                                    $('#active_criteria').html(newText);                                 
                                }

                                if (refresh === "yes") {
                                    //Reiniciar el orden de los criterios de ordenamiento. 
                                    //Esto ocurre cuando se activa la búsqueda de una nueva subcategoría.
                                    var newText = $('#popularity').html();      

                                    $('#popularity').attr('class', 'criteria');
                                    $('#cheaper').attr('class', 'visible');
                                    $('#expensive').attr('class', 'visible');

                                    $('#active_criteria').html(newText); 

                                } else {//Se reinician los menús de ordenado de acuerdo con el contenido de obj.

                                    if (order === "popularity") {
                                        $('#popularity').attr('class', 'criteria');
                                        $('#cheaper').attr('class', 'visible');
                                        $('#expensive').attr('class', 'visible');

                                        $('#active_criteria').html("<span>Más populares primero</span>"); 
                                    }

                                    if (order === "cheaper") {
                                        $('#popularity').attr('class', 'visible');
                                        $('#cheaper').attr('class', 'criteria');
                                        $('#expensive').attr('class', 'visible');

                                        $('#active_criteria').html("<span>Más baratos primero</span>"); 
                                    }

                                    if (order === "expensive") {
                                        $('#popularity').attr('class', 'visible');
                                        $('#cheaper').attr('class', 'visible');
                                        $('#expensive').attr('class', 'criteria');

                                        $('#active_criteria').html("<span>Más caros primero</span>"); 
                                    }                          
                                }

                                //Asignar la class subcatergory al elemento #orderby.
                                $('#orderby').attr('data-subcategory', subcategory);   

                                //Activar el elemento #orderby.
                                $('#orderby').attr('class', 'active');
                                
                            } else {//Existe un máximo de 1 resultado. Ocultar la barra de ordenamiento en este caso.
                                hide_top_order_items_menu();
                            }                  
                    }           

                }).fail(function() {//No se pudo establecer la conexión con el servidor.                  
                    set_object_for_failed_processing();
                });  
            }
        }
        
        
        if (origin === "restore_passwd_form") {
            
            var fileToLoad = obj.script.path + obj.script.filename;            
            var dataToSend = {};    
           
            set_object_for_ongoing_processing();
            localStorage.current_page = origin;
            
            $.ajax({
                type: "POST",
                url: "scripts_php/restore_login.html",            
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                data: dataToSend,
                dataType: "html",                        
                success: function(data) {        
                        if (localStorage.current_page === "restore_passwd_form") {
                            $("#mostrador").html(data);          
                        }                            
                    }
                }).fail(function() {//No se pudo establecer la conexión con el servidor.            
                        set_object_for_failed_processing();
                });             
        }
        
        
        
        if (origin === "successfull_passwd_restore_screen") {
            
            localStorage.current_page = origin;
            
            var content = obj.content;
            $("#mostrador").html(content); 
            
            hide_top_order_items_menu();
        }
        
        
        if (origin === "failed_restore_passwd_screen") {
            
            localStorage.current_page = origin;
            
            var content = obj.content;
            $("#mostrador").html(content); 
            
            hide_top_order_items_menu();
        }



        if (origin === "register_user") {
            
            var path = obj.script.path;
            var filename = obj.script.filename;
            var fileToLoad = path + filename;
            
            set_object_for_ongoing_processing();
            localStorage.current_page = origin;
            
            $.ajax({
                type: "POST",
                url: fileToLoad,
                data: {},
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                dataType: "html",            
                success: function(data){   

                    if (localStorage.current_page === origin) {
                        $('#mostrador').html(data); 
                        hide_top_order_items_menu();
                    }
                }                
            }).fail(function() {//No se pudo establecer la conexión con el servidor.            
                set_object_for_failed_processing();
            });  
        }



        if (origin === "footer") {            
            
            var fileToLoad = obj.script.path + obj.script.filename;
            
            set_object_for_ongoing_processing();
            localStorage.current_page = origin;
            
            $.ajax({
                type: "POST",
                url: fileToLoad,
                data: {},
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                dataType: "html",            
                success: function(data){   

                    if (localStorage.current_page === 'footer') {
                        $('#mostrador').html(data); 
                        hide_top_order_items_menu();
                    }
                }                
            }).fail(function() {//No se pudo establecer la conexión con el servidor.            
                set_object_for_failed_processing();
            });       
        }
        
        
        if (origin === "policy") {
            
            var fileToLoad = obj.script.path + obj.script.filename;
            
            set_object_for_ongoing_processing();
            localStorage.current_page = origin;
            
            $.ajax({
                type: "POST",
                url: fileToLoad,
                data: {},
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                dataType: "html",            
                success: function(data){   

                    if (localStorage.current_page === origin) {
                        $('#mostrador').html(data); 
                        hide_top_order_items_menu();
                    }
                }                
            }).fail(function() {//No se pudo establecer la conexión con el servidor.            
                set_object_for_failed_processing();
            });       
            
        }



        if (origin === "searcher") {

            var subcategory = obj.data.subcategory;
            var path = obj.script.path;
            var filename = obj.script.filename;
            var eancode = obj.eancode;
            var fileToLoad = path + filename;

            var dataObj = {};
          
            dataObj.eancode = eancode;      
            
            localStorage.current_page = "searcher";
            set_object_for_ongoing_processing();   
            
            $.ajax({
                type: "POST",
                url: fileToLoad,
                data: dataObj,
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                dataType: "html",            
                success: function(data){ 
                        hide_top_order_items_menu();        
                        $('#mostrador').html(data); 
                        
                        replace_item_pictures();
                        
                        var idcategoria = $('div#' + eancode).attr("data-idcategoria");
                        
                        var aux_long = $("#auxiliarybanner").children("#bright_subcat").length;
                        if (aux_long > 0) {
                            $("#bright_subcat").remove();
                        } 
                        
                        var rotulo = "";
                        
                        switch (idcategoria) {
                        case 'R01':
                            rotulo = "Refrescos varios";
                            break;
                        case 'R02':
                            rotulo = "Jugos varios";
                            break;
                        case 'R03':
                            rotulo = "Hidratantes y energéticos";
                            break;
                        case 'R04':
                            rotulo = "Aguas y garrafones";
                            break;
                        case 'R05':
                            rotulo = "Café líquido y Té";
                            break;
                            
                        case 'C01':
                            rotulo = "Sopas instantáneas";
                            break;
                        case 'C02':
                            rotulo = "Frijoles refritos";
                            break;
                        case 'C03':
                            rotulo = "Pizzas";
                            break;
                        case 'C04':
                            rotulo = "Cockteles de frutas";
                            break;
                        case 'C05':
                            rotulo = "Horchatas";
                            break;
                        case 'C06':
                            rotulo = "Sardina y Atún";
                            break;
                        case 'C07':
                            rotulo = "Chocolate y Café";
                            break;
                        case 'C08':
                            rotulo = "Bebidas en polvo";
                            break;
                        case 'C09':
                            rotulo = "Otros";
                            break;
                            
                        case 'F01':
                            rotulo = "Frutas y Verduras";
                            break;
                        case 'F02':
                            rotulo = "Especias y condimentos";
                            break;
                        case 'F03':
                            rotulo = "Frutas y verduras congeladas";
                            break;
                            
                        case 'B01':
                            rotulo = "Sabritas";
                            break;
                        case 'B02':
                            rotulo = "Barcel";
                            break;
                        case 'B03':
                            rotulo = "Galletas";
                            break;
                        case 'B04':
                            rotulo = "Pan dulce y postres";
                            break;
                        case 'B05':
                            rotulo = "Dulces y Chocolates";
                            break;
                        case 'B06':
                            rotulo = "Palomitas de maíz";
                            break;
                            
                        case 'A01':
                            rotulo = "Cereales y granos";
                            break;   
                        case 'A02':
                            rotulo = "Avenas";
                            break;  
                        case 'A03':
                            rotulo = "Aceites vegetales";
                            break;  
                        case 'A04':
                            rotulo = "Maizenas";
                            break;  
                        case 'A05':
                            rotulo = "Mermeladas y Mieles";
                            break;  
                        case 'A06':
                            rotulo = "Chiles";
                            break;  
                        case 'A07':
                            rotulo = "Salsas y catsups";
                            break;  
                        case 'A08':
                            rotulo = "Mayonesas";
                            break;  
                        case 'A09':
                            rotulo = "Purés";
                            break;  
                        case 'A10':
                            rotulo = "Vinagres";
                            break;  
                        case 'A11':
                            rotulo = "Moles";
                            break;  
                        case 'A12':
                            rotulo = "Aderezos y Sazonadores";
                            break;  
                        case 'A13':
                            rotulo = "Empanizadores";
                            break;  
                        case 'A14':
                            rotulo = "Cigarros y Encendedores";
                            break;  
                        case 'A15':
                            rotulo = "Varios";
                            break;  
                            
                        case 'L01':
                            rotulo = "Leche natural y deslactosada";
                            break;
                        case 'L02':
                            rotulo = "Leche de sabores";
                            break;
                        case 'L03':
                            rotulo = "Leche en polvo";
                            break;
                        case 'L04':
                            rotulo = "Huevo";
                            break;
                        case 'L05':
                            rotulo = "Queso";
                            break;
                        case 'L06':
                            rotulo = "Yoghurts";
                            break;
                        case 'L07':
                            rotulo = "Flanes y Gelatinas";
                            break;
                        case 'L08':
                            rotulo = "Mantequillas y Margarinas";
                            break;
                        case 'L09':
                            rotulo = "Helados";
                            break;
                        case 'L10':
                            rotulo = "Otros";
                            break;
                        
                        case 'T01':
                            rotulo = "Tortillas y Totopos";
                            break;
                        case 'T02':
                            rotulo = "Pan molido y Polvos";
                            break;
                        case 'T03':
                            rotulo = "Pastas";
                            break;
                        
                        case 'N01':
                            rotulo = "Pollo";
                            break;
                        case 'N02':
                            rotulo = "Res";
                            break;
                        case 'N03':
                            rotulo = "Cortes finos";
                            break;  
                        case 'N04':
                            rotulo = "Carnes frías";
                            break;
                            
                        case 'P01':
                            rotulo = "Jabon de Tocador";
                            break;
                        case 'P02':
                            rotulo = "Toallas Sanitarias";
                            break;
                        case 'P03':
                            rotulo = "Shampoos y Enjuagues";
                            break;
                        case 'P04':
                            rotulo = "Desodorantes y Cremas";
                            break;
                        case 'P05':
                            rotulo = "Rastrillos y Navajas";
                            break;
                        case 'P06':
                            rotulo = "Pastas y Cepillos Dentales";
                            break;
                        case 'P07':
                            rotulo = "Gel para cabello";
                            break;
                        case 'P08':
                            rotulo = "Higiénicos y Servilletas";
                            break;
                        case 'P09':
                            rotulo = "Ceras para zapatos";
                            break;
                            
                        case 'H01':
                            rotulo = "Jabones de lavandería";
                            break;
                        case 'H02':
                            rotulo = "Detergentes y Lavatrastes";
                            break;
                        case 'H03':
                            rotulo = "Limpiadores y Ácidos";
                            break;
                        case 'H04':
                            rotulo = "Desechables";
                            break;
                        case 'H05':
                            rotulo = "Bolsas para Basura";
                            break;
                        case 'H06':
                            rotulo = "Escobas y Trapeadores";
                            break;
                        case 'H07':
                            rotulo = "Escurridores";
                            break;
                        case 'H08':
                            rotulo = "Fibras y Cepillos";
                            break;
                        case 'H09':
                            rotulo = "Otros";
                            break;
                            
                        case 'Y01':
                            rotulo = "Alimentos para bebé";
                            break;
                        case 'Y02':
                            rotulo = "Pañales";
                            break;
                        case 'Y03':
                            rotulo = "Aceites para bebé";
                            break;
                        case 'Y04':
                            rotulo = "Biberones";
                            break;
                        case 'Y05':
                            rotulo = "Otros";
                            break;
                        
                        case 'M01':
                            rotulo = "Alimento para aves";
                            break;
                        case 'M02':
                            rotulo = "Alimento para perros";
                            break;
                        case 'M03':
                            rotulo = "Alimento para gatos";
                            break;
                        case 'M04':
                            rotulo = "Accesorios para mascotas";
                            break;                        
                        }
                       
                        var aux = "<div id='bright_subcat'><span>" + rotulo + "</span></div>";
                        $("#auxiliarybanner").prepend(aux);
                }     
                
            }).fail(function() {//No se pudo establecer la conexión con el servidor.            
                set_object_for_failed_processing();
            });      
        }


        if (origin === "contact") {
            
            var path = obj.script.path;
            var filename = obj.script.filename;
            var fileToLoad = path + filename;
            
            set_object_for_ongoing_processing();
            localStorage.current_page = origin;
            
            $.ajax({
                type: "POST",
                url: fileToLoad,
                data: {},
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                dataType: "html",            
                success: function(data){   

                    if (localStorage.current_page === 'contact') {
                        $('#mostrador').html(data);                         
                        hide_top_order_items_menu();
                    }
                }                
            }).fail(function() {//No se pudo establecer la conexión con el servidor.            
                    set_object_for_failed_processing();
            });
        }



        if (origin === "my_favorites") {
            
            var path = obj.script.path;
            var filename = obj.script.filename;
            var fileToLoad;

            fileToLoad = path + filename;
            
            set_object_for_ongoing_processing();
            localStorage.current_page = origin;
            
            $.ajax({
                type: "POST",
                url: fileToLoad,
                data: {},
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                dataType: "html",            
                success: function(data){   

                    if (localStorage.current_page === 'my_favorites') {
                        hide_top_order_items_menu();  //Se oculta el menú de ordenamiento de artículos.
                        $('#mostrador').html(data);  		
                        replace_item_pictures();    
                    }
                }                
            }).fail(function() {//No se pudo establecer la conexión con el servidor.            
                    set_object_for_failed_processing();
            }); 
        }




        if (origin === "ongoing_processing") {

            var tableHTML = "<div class='emptycart'>";
            tableHTML += "<table>";
            tableHTML += "<tr><td><img src='img_preloaders/ajax-loader.gif'></td></tr>";
            tableHTML += "<tr><td>Cargando los datos. Un momento, por favor...</td></tr>";
            tableHTML += "</table>";
            tableHTML += "</div>";

            $("#mostrador").html(tableHTML);
            return;
        }



        if (origin === "welcome_new_user") {
            
            localStorage.current_page = origin;
            
            var tableHTML = "<div class='emptycart'>";
            tableHTML += "<table>";
            tableHTML += "<tr><td><img src='icons/welcome2.png' width='381' height='184'></td></tr>";
            tableHTML += "<tr><td>&nbsp;</td></tr>"; 
            tableHTML += "<tr><td>Gracias por registrarse en Carbon Copy.</td></tr>"; 
            tableHTML += "<tr><td>Hemos enviado un mensaje de confirmación a su correo electrónico.</td></tr>"; 
            tableHTML += "<tr><td>Por favor, valide primero su correo para poder ingresar.</td></tr>"; 
            tableHTML += "</table>";
            tableHTML += "</div>";

            $("#mostrador").html(tableHTML);            
        }



        if (origin === "failed_processing") {
            
            localStorage.current_page = origin;

            var tableHTML = "<div class='emptycart'>";
            tableHTML += "<table>";
            tableHTML += "<tr><td><img src='icons/welcome2.png' width='381' height='184'></td></tr>";
            tableHTML += "<tr><td>Lo sentimos.</td></tr>"; 
            tableHTML += "<tr><td>Se ha detectado un fallo en la conexión de internet.</td></tr>";
            tableHTML += "<tr><td>Por favor, intente de nuevo más tarde.</td></tr>"; 
            tableHTML += "</table>";
            tableHTML += "</div>";

            $("#mostrador").html(tableHTML);
        }



        if (origin === "mainlogo") {
            var fileToLoad = obj.script.path + obj.script.filename;

            $("#mostrador").load(fileToLoad, {"subcat":subcat});        
            $("#navmenu").fadeIn();
            localStorage.previouspage = "start_page";
        }
    }
    
    
    function replace_item_pictures() {
        var ean_array = [];
        var images = [];
        var imageObj = [];
        var n = $('#mostrador div.itembox').length;
                            
        if (n > 0) {
            $('div.itembox').each( function() {
            var ean = $(this).attr('id');
            var path = 'img_items/' + ean + '.png';
            //ean_array.push(ean);
            images.push(path);
            });
            console.log(ean_array);
            for (var i = 0; i < n; i++) {
                imageObj[i] = new Image();
                               
                imageObj[i].onload = function() {
                    var starting = this.src.indexOf('img_items');
                    var ending = this.src.lastIndexOf('.png');
                    var elem_id = this.src.substring(starting + 10, ending);  
                    console.log(elem_id);
                    var destiny = 'div#' + elem_id + ' div.itemboxpicture img';
                    console.log('destino: ' + destiny);
                    $(destiny).attr('src', this.src);
                };
                                    
                imageObj[i].src = images[i];
                console.log(imageObj[i].src);
            }
        }
    }



    //Esta función modifica el número mostrado en el campo cantidad de cada artículo mostrado.
    function modify_input_value(e) {
        
        //Tomar los datos del botón presionado: data-offset="1" o data-offset="-1"
        var obj = e.target.dataset;

        //Se toma el offset y se convierte a entero.
        var offset = parseInt(obj.offset);

        //Se toma el código ean.
        var theEan = e.target.parentNode.parentNode.parentNode.id;

        //Se construye el identificador.
        var theIdentifier = "#" + theEan; //#1234

        //Leer el contenido del campo input
        var inputValue = parseInt($(theIdentifier).find("input").val());

        //Actualizar el contenido del campo input
        if (inputValue !== 0 || offset > 0) {            
            inputValue = inputValue + offset;  //suma o resta, dependiendo del offset.
        }  

        //Reescribir el nuevo valor del campo input        
        $(theIdentifier).find("input").val(inputValue);
    }
    


    //Esta función actúa cuando se presiona el botón "Agregar" en cada artículo.
    function add_item_to_cart(e) {

        //   Se extrae el valor del campo ean contenido en el elemento #itembox seleccionado.
        var theEan = e.target.parentNode.parentNode.id;
        
        //Se construye el identificador. Para poder leer el valor en el campo input del elemento con ID 'itembox'
        var theIdentifier = "#" + theEan;

        //Se extrae el valor del campo input en el 'itembox'.
        var inputValue = parseInt($(theIdentifier).find("input").val());
        
        if (inputValue > 0) {//Sólo si el cliente agregó una cantidad positiva del producto.
        
            //Variables que se habrán de usar para guardar el item seleccionado en el cart.
            var name; 
            var pnoiva; 
            var iva; 
            var discount;
            var utility;  //Ya incluido el descuento.
            var existencias; 

            //Comprobar si el item seleccionado no se encuentra ya en el array cart[].                    
            var numCoincidences = 0;
            
            for (var i = 0; i < window.cart.length; i++) {               
                var itemInCartObj = window.cart[i];
                var itemInCartEan = itemInCartObj.ean;

                if (itemInCartEan === theEan) {//El artículo ya ha sido seleccinado antes...
                    numCoincidences++;

                    //...actualizar el key 'quantty'.                    
                    var qtty = itemInCartObj.quantty;

                    qtty = qtty + inputValue;
                    itemInCartObj.quantty = qtty;
                    
                    window.cart[i] = itemInCartObj;
                }
            }
            

            if (numCoincidences === 0) {//No existen artículos idénticos en el carrito.                
                //Construir el objeto item_n
                //Se busca en el catálogo cargado en memoria los datos que corresponden al item seleccionado.
                var n = window.products.length;  //tamaño del catálogo.                
                
                for (var i = 0; i < n; i++) {
                    var itemObj = window.products[i];
                    var itemEancode = itemObj.eancode;

                    if (itemEancode === theEan) {//Se encontró el artículo

                        name = itemObj.name;                         
                        pnoiva = itemObj.pnoiva;  //Cadena con forma de número de 4 decimales. Para no perder los ceros.
                        iva = itemObj.iva;
                        discount = itemObj.discount;  
                        utility = itemObj.utility;    //Ya incluido el descuento.
                        existencias = itemObj.existencias;
                        break;
                    }
                }
                               
                //Para construir cada item del carrito, se toman los siguientes datos del catálogo:
                //
                //  id = Es el código EAN del artículo. var theEan.
                //  name = Es el nombre del producto + la marca + la presentación del producto (bolsa, caja, lata, botella, envase, etc.) + el contenido del producto (250 gr, 600 ml, 20 pzas, etc.).
                //  pnoiva = Es el precio con IEPS.
                //  iva = Es el monto monetario del impuesto aplicable a cada unidad del artículo. 
                //  discount = Es el descuento monetario aplicable a cada unidad del artículo.
                //  utility = Es el monto monetario de la utilidad generada, ya incluyendo impuestos y descuentos. var utilityForItem.        //  
                //  existencias = Indica el nivel de existencias del artículo.
                //  
                //
                //Cada artículo del carrito, contendrá los siguientes datos:
                //
                // ean: Es el código EAN del artículo.
                // name: Es el nombre del producto + la marca + la presentación + el contenido del producto.       
                // quantty: inputValue, es la cantidad de artículos elegida por el usuario.
                // pnoiva: Es el precio con IEPS.        
                // iva: Monto monetario del impuesto aplicable a cada unidad del artículo. 
                // discount: descuento monetario aplicable a cada unidad del artículo.
                // utility: utilityForItem, Es el monto monetario de la utilidad generada, ya incluyendo impuestos y descuentos.
                // existencias: Las existencias del artículo.

                //Objeto para cada ítem.
                var prodObj = {ean: theEan, name: name, quantty: inputValue, pnoiva: pnoiva, iva: iva, discount: discount, utility: utility, existencias: existencias};
        
                //Finalmente, se agrega el artículo al carrito JSON.                
                window.cart.push(prodObj);
             
            }
            
             //Se actuslizan los valores de los keys.           
            //  itemsCounter = indica el total de renglones en el carrito de compras (artículos distintos). Valor: entero sin unidades.
            //  totalItems = indica la suma total de todos artículos en el pedido. Valor: entero sin unidades.       
            //  totalAmount = suma total con IVA, sin incluir descuentos.  Valor:entero monetario.    
           
            //Estas dos keys se usarán para actualizar la información en el ícono del carrito.           
            window.totalItems = window.totalItems + inputValue;

            //Se obtiene el valor actualizado del total.
            window.totalamount = get_totalamount();        

            //Se actualiza la información en el el carrito.
            $('#cartitems').html(window.totalItems + " artículos");            
            $('#cartamount').html(accounting.formatMoney(window.totalamount));

            //Colocar el valor '0' en todos los elementos input de los elementos con Id 'itembox'.
            $(".itembox").find("input").val(0);
        }
    }
    


    function get_totalamount() {
        var total = 0;
               
        for (var i = 0; i < window.cart.length; i++) {              
            var itemInCartObj = window.cart[i];
            var quantty = itemInCartObj.quantty;
            var pnoiva = itemInCartObj.pnoiva;
            var iva = itemInCartObj.iva;

            total += quantty*pnoiva + quantty*iva;   
        }

        return parseFloat(total.toFixed(2));
    }


    function get_subtotal() {
        var total = 0;        
        
        for (var i = 0; i < window.cart.length; i++) {           
            var itemInCartObj = window.cart[i];
            var quantty = itemInCartObj.quantty;
            var pnoiva = itemInCartObj.pnoiva;       

            total += quantty*pnoiva;    
        }

        return parseFloat(total.toFixed(2));
    }



    function get_totaliva() {
        var total = 0;       
       
        for (var i = 0; i < window.cart.length; i++) {
            var itemInCartObj = window.cart[i];
            var quantty = itemInCartObj.quantty;        
            var iva = itemInCartObj.iva;

            total += quantty*iva;             
        }

        return parseFloat(total.toFixed(2));
    }



    function get_totalsavings() {
        var total = 0;
        
        for (var i = 0; i < window.cart.length; i++) { 
            var itemInCartObj = window.cart[i];
            var quantty = itemInCartObj.quantty;
            var discount = itemInCartObj.discount;

            total += quantty*discount;  
        }

        return parseFloat(total.toFixed(2));
    }




    function get_totalprofit() {
        var total = 0;
        
        for (var i = 0; i < window.cart.length; i++) { 
            var itemInCartObj = window.cart[i];
            var quantty = itemInCartObj.quantty;       
            var utility = itemInCartObj.utility;

            total += quantty*utility;    
        }

        return parseFloat(total.toFixed(2));
    }




    //Esta función carga el formulario de Login/Mi Cuenta del usuario.
    function login_user() {

       var loginText = $("#loginlogin span").text();

        if (loginText === "Entrar") {            
            set_object_for_login();
        }

        if (loginText === "Mi Cuenta") {

            set_object_for_my_account();
        }
    }



    //Objeto para visualizar el formulario de registro.
    function set_object_for_register() {
        
        var filename = "register_form.php";
        var path = "scripts_php/";

        var obj = {"origin": "register_user", "logged": false, "data":{}, "script":{"filename":filename, "path": path}};      
        
        history.pushState(obj, "", "?page=" + obj.origin);
        
        //Pasar el objeto 'obj' almodificador de escenario y al historia.
        modify_scenery(obj);   
    }



    //Esta función debe permitir al usuario desplegar el fomulario de registro, o en su defecto,
    //debe permitir finalizar la sesión.
    function register_new_user() {

        var loginText = $("#loginregister span").text();

        if (loginText === "Registro") {  //En este caso, se debe desplegar el formulario de registro.
            set_object_for_register();
        }

        if (loginText === "Salir") {  //En este caso, se debe terminar la sesión.

            //Invocar script log_out.php para terminar sesión y eliminar variables de sesión.
            $.getJSON("scripts_php/log_out.php", function(data){
                if (data.status === "success") {
                    //Restaurar el texto original de los botones de los elementos 'loginregister' y 'loginlogin'.
                    document.getElementById('loginregister').innerHTML = "<span>Registro</span>";
                    document.getElementById('loginlogin').innerHTML = "<span>Entrar</span>";

                    //Limpier el elemento con ID 'greeting'.
                    document.getElementById('greeting').innerHTML = "<span></span>";

                    //vaciar los datos del carrito.        
                    localStorage.clear();                    
                    localStorage.current_page = "start_page";  //Ya que el usuario es redirigido a esta página.

                    //Poner las cantidades del carrito a ceros.
                    $("#cartitems").text("0 artículos");
                    $("#cartamount").text("$0.00");

                    //Eliminar la cookie de sesión.
                    document.cookie = "auth=; expires=Thu, 01 Jan 1970 00:00:00 GMT";    

                    //Poner el contador de favoritos en 0.
                    $('#headernumfavorites').text("0 favoritos");

                    //Redirigir la página a efectos de ocultar datos del usuario la sesión actual.
                    //Lo siguiente dirige hacia atrás; si el usuario no está conectado, el historuial redirigirá hasta atrás,
                    //..y finalmente, terminará mostrándose el formulario login (ver función draw_scenery)

                    set_object_for_start_page(); 
                }
            });
        }
    }
    
    


    //Esta funcion se activa cuando el usuario agrega artículos a sus "Favoritos".
    function add_to_favorites(e) {

        var cookieValue = getCookie("auth");

        if (cookieValue !== "") { //El usuario está logado.       

            var ean = e.target.parentNode.parentNode.id;   //EAN del artículo que se desea agregar/quitar de Favoritos.
            var classname = e.target.className; //Nos indica si el artículo está en favoritos o no.
            var rotulo = $("#auxiliarybanner").find("#bright_subcat span").text();             

            if (classname === "infavorites") {
                //Conectar con el script 'add_to_favorites.php' para ELIMINAR el artículo de los favoritos del usuario.
                //Si la respuesta es 'success', ocurrirá lo siguiente:
                //  1) Se reducirá el contador de favoritos en 1.
                //  2) Se actualizará el carrito con el número de favoritos actual.
                //  3) La banda extensible se encogerá.
                //  4) La banda, al extenderse, el texto: 'A Favoritos'.

                var dataToSend = {};
                dataToSend.eancode = ean;                
                dataToSend.action = "delete";
                
                var search = getPageName().substr(0, 11);          
                
                set_object_for_ongoing_processing();
                
                $.ajax({
                    type: "POST",
                    url: "scripts_php/add_to_favorites.php",
                    data: dataToSend,
                    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                    dataType: "json",            
                    success: function(response){

                        if (response.status === "success") {
                            var article = $('div#' + ean);
                            var numfavorites = response.numfavorites;

                            $('#headernumfavorites').text(numfavorites + " favoritos");

                            //Quitar el texto de la banda extensible.
                            $(article).children("div.itemboxmarca").children('img').next().children('span').text('').end();           

                            //Se oculta el elemento 'innerexpand'.  
                            $(article).children("div.itemboxmarca").children('img').next().children('div.innerexpand').hide().end();        

                            //Colocar la clase 'nofavorite' al elemento 'img'.
                            $(article).children("div.itemboxmarca").children('img').attr("class", "nofavorite").end();

                            //Encoger la banda extensible.
                            $(article).children("div.itemboxmarca").children('img').next().animate({  //Se anima el elemento 'expand'.
                                                    width: '0'
                                                    },
                                                    150,
                                                    function() {  //Se activa al terminar la animación de cierre.
                                                                    //$(this).prepend("<span style='padding-left:5px'>A Favoritos</span>");
                                                                }).end();
                                                                
                            if (localStorage.current_page === 'my_favorites') {	
                                hide_top_order_items_menu();                                        
                                show_user_favorites();
                                
                            } else {
                                   //Recargar los artículos de la subcategoría o el artículo individual de la búsqueda.     
                                if (search === "search_item") {//Se agrega a favoritos un resultado del buscador.
                                    create_object_for_item_searched(ean, "replace");

                                } else {//Estamos navegando desde navmenu.
                                    //Se extraen la subcategoría y orden que el usuario está visualizando.
                                    var subcategory = $('#orderby').attr('data-subcategory');
                                    //var subcategory = getPageName().substr(0, 3);
                                    var order = $('#ordercriteria').children('.criteria').attr('id');
                                    //var order = getPageName().substr(18);
                                    var filename = "get_subcat_products.php";
                                    var path = "scripts_php/";
                                    var obj = {"origin": "navmenu", "logged": true, "data":{"subcategory": subcategory}, "script":{"filename":filename, "path": path}, "order": order, "refresh": "no", "rotulo": rotulo};

                                    //Recargar la vista previa que el usuario estaba observando.                                
                                    history.replaceState(obj, "", "?page=" + subcategory + '::::::order_by_' + order);  
                                    modify_scenery(obj);
                                }                                                  
                            }
                        }
                    }

                }).fail(function() {//No se pudo establecer la conexión con el servidor.            
                        set_object_for_failed_processing();
                });  //Fin de $.ajax();


            } else if (classname === "nofavorite") {
                //Conectar con el script 'add_to_favorites.php' para AGREGAR el artículo a los favoritos del usuario.
                //Si la respuesta es 'success', ocurrirá lo siguiente:
                //  1) Se incrementará el contador de favoritos en 1.        // 
                //  2) La banda extensible permancerá extendida.
                //  3) La banda extensible contendrá el texto: 'En Favoritos'.
                //Colocar la clase 'infavorites' en el elemento img clickeado.

                var dataToSend = {};
                dataToSend.eancode = ean;                
                dataToSend.action = "insert";
                         
                var search = getPageName().substr(0, 11);
                
                set_object_for_ongoing_processing();                            

                $.ajax({
                    type: "POST",
                    url: "scripts_php/add_to_favorites.php",
                    data: dataToSend,
                    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                    dataType: "json",            
                    success: function(response){

                        if (response.status === "success") {
                            //Variable objeto que se refiere al articulo que se desea almacenar en los favoritos.
                            var article = $('div#' + ean);       
                            var numfavorites = response.numfavorites;

                            $('#headernumfavorites').text(numfavorites + " favoritos");

                            //Extender la banda extensible.        
                            $(article).children("div.itemboxmarca").children('img').next().animate({  //Se expande el elemento 'expand'.
                                                    width: '153px'
                                                    },
                                                    150,
                                                    function() {  //Se activa al terminar la animación de cierre.

                                                                }).end();

                            //Se muestra el elemento 'innerexpand'. 
                            $(article).children("div.itemboxmarca").children('img').next().children('div.innerexpand').show().end();

                            //Agregar el span con el texto: "En Favoritos".
                            $(article).children("div.itemboxmarca").children('img').next().children('span').text('En Favoritos').end();  

                            //Asignar la clase 'infavorites' a la 'img'.
                            $(article).children("div.itemboxmarca").children('img').attr("class", "infavorites").end();
                            
                            if (localStorage.current_page === 'show_favorites') {	
                                hide_top_order_items_menu();                                        
                                show_user_favorites();
                            } else {
                                //Recargar los artículos de la subcategoría o el artículo individual de la búsqueda.     
                                if (search === "search_item") {//Se agrega a favoritos un item obtenido del buscador.
                                    create_object_for_item_searched(ean, "replace");

                                } else {//Estamos navegando desde navmenu.
                                    //Se extraen la subcategoría y orden que el usuario está visualizando.
                                    var subcategory = $('#orderby').attr('data-subcategory');
                                    //var subcategory = getPageName().substr(0, 3);
                                    var order = $('#ordercriteria').children('.criteria').attr('id');
                                    //var order = getPageName().substr(18);
                                    var filename = "get_subcat_products.php";
                                    var path = "scripts_php/";
                                    var obj = {"origin": "navmenu", "logged": true, "data":{"subcategory": subcategory}, "script":{"filename":filename, "path": path}, "order": order, "refresh": "no", "rotulo": rotulo};

                                    //Recargar la vista previa que el usuario estaba observando.                                
                                    history.replaceState(obj, "", "?page=" + subcategory + '::::::order_by_' + order);  
                                    modify_scenery(obj);
                                }
                            }
                        }
                    }                
                }).fail(function() {//No se pudo establecer la conexión con el servidor.                       
                    set_object_for_failed_processing();
                });   //Fin de $.ajax();

            }

        } else {
            set_object_for_login();
        }

    }


    //Esta función se activa cuando se eliminan artículos del carrito.
    function modify_cart(event) {
        var itemToRemove = parseInt(event.target.id); //  0, 1, 2, etc.
      
        //Eliminar el renglón de la tabla del DOM.
        $(this).closest('tr').remove();

        //Actualizar las variables contadoras y del carrito...
        //Primero se extrae el objeto a eliminar, para descontar sus datos.                
        var obj = window.cart[itemToRemove];

        //Se actualizan los valores de las variables contadoras.
        window.totalamount = get_totalamount();  //Total monetario que se muestra en el ícono del carrito.            
        
        //Ahora descontamos las variables una a una...  
        window.totalItems -= obj.quantty;  //'totalItems' se reduce en 'quantty'.
        window.totalamount -= obj.quantty*(obj.pnoiva + obj.iva);    
        
        //Luego, remover el artículo del localStorage.           
        window.cart.splice(itemToRemove, 1);
        //alert(JSON.stringify(window.cart));
        
        //Actualizar las cantidades en el ícono del carrito.
        $('#cartitems').html(window.totalItems + " artículos");        
        $('#cartamount').html(accounting.formatMoney(window.totalamount));
        
        //Finalmente, volver a dibujar la tabla;        
        if (window.cart.length > 0) {
            
            set_object_for_show_cart1();

        } else { //Mostrar HTML para carrito vacío.            
            set_object_for_empty_cart2();        
        }        
    }
      


    //Esta función se invoca cuando el usuario hace click en el botón "Volver" en el carrito vacío.
    function empty_cart_go_back() {
        window.history.go(-1);
    }



    //Esta función se invoca cuando el usuario hace click en el botón "Siguiente" en el carrito vacío.
    function empty_cart_go_forward() {
        window.history.go(1);
    }



    function go_back_from_cart(e) {
        var butonName = this.id;

        //Si el usuario está logeado, se le permitirá ir hacia atrá en el historial.
        //De lo contrario, se le manda a la vista de "Login"
        var page = getPageName();

        if (page === "colocar_pedido_4_de_4") {
            window.history.go(-3);
        } else {
            window.history.go(-1);
        }

    }



    //Esta función se activa cuando el usuario escoge el horario de entrega.
    //Mientras no se elija un horario de entrega, no se podrá colocar el pedido.
    function get_my_order_time(e) {
        window.orderTime = e.target.id;
             
        //Limpiar colores y texto de los botones con horario disponible.
        $('#schedule div.onschedule').each( function() {
            $(this).attr('class', 'onschedule');
            var text = $(this).text();
            var schedule = text.split('>>')[0];

            var newMessage = schedule + " >> Disponible";
            $(this).text(newMessage);
        });

        //Colorear el botón escogido.
        $(this).attr('class', 'onschedule selected');

        //Cambiar contenido de texto en el botón.
        var text = $(this).text();
        var schedule = text.split('>>')[0];            
        var newMessage = schedule + " >> Seleccionado";

        $(this).text(newMessage);
        
        //Habuilitar el boton con ID 'cartgotonextbutton3'
        $("#cartgotonextbutton3").attr("class", "active button");   
    }




    //Esta función actualiza los datos que el usuario modifica en la sección "Mi Cuenta".
    function change_my_data(e) {
        var mynewdata = e.target.parentNode.id;
        //alert("Change my data!" + mynewdata);
        var obj = {datatochange: mynewdata};

        //conectar con el script de actualización de dato.
        var fileToLoad = "scripts_php/update_user_data.php";

        $.post(fileToLoad, obj, function(data) {//Se agregó el tercer parámetro "json"
            var status = data.status;
            if (status === "success") {//Los datos se actualizaron correctamente.

            }

        }, "json");
    }



    function check_my_orders(e) {
        var orderNum = e.target.dataset.order;
        //alert(orderNum);
        e.preventDefault();
    }



    function show_contact_form(e) {
        set_object_for_contact_form();
    }




    //Esta función se activa cuando, después de llenar el formulario de registro, el usuario presiona 
    //el botón #sendregister del formulario de registro.
    function save_user_data() {    

        //Primero, se colectan los datos del formulario visible.
        //Se eliminan los espacios antes y después del valor extraído, por medio de $.trim()
        var email = $.trim($('#registeremail').val());
        var passwd1 = $.trim($('#registerpasswd1').val());
        var passwd2 = $.trim($('#registerpasswd2').val());
        var nombre = $.trim($('#registernombre').val());
        var appaterno = $.trim($('#registerappaterno').val());
        var apmaterno = $.trim($('#registerapmaterno').val());
        var birth = $('#registerbirth').val();
        var gender = $("input:radio[name='gender']:checked").val();
        var municipio = $('#registermunicipio').val();
        var localidad = $('#registerlocalidad').val();
        var colonia = $('#registercolonia').val();
        var codigopost = $.trim($('#registercp').val());
        var calle = $('#registercalle :selected').text();
        var calle_value = $('#registercalle').val();
        var edificio = $.trim($('#registeredificio').val());
        var numext = $.trim($('#registernumext').val());
        var numint = $.trim($('#registernumint').val());
        var telnum = $.trim($('#registertelnum').val());
        var entrecalle1 = $.trim($('#registerentre1').val());
        var entrecalle2 = $.trim($('#registerentre2').val());
        var referencia = $.trim($('#registerref').val());
        var tipousuario = 'C';
        var loginstatus = 'RN';
        var notify;

        if (  $('#notify').is(':checked')  ) {
            notify = 'Y';
        } else {
            notify = 'N';
        }

        //Formar el objeto a enviar.
        var dataToSend = {};

        if (apmaterno === '') {
                apmaterno = "X";
            }

            if (edificio === '') {
                edificio = "NA";
            }

            if (numint === '') {
                numint = "NA";
            } 

            if (gender === 'masculino') {
                gender = 'M';
            } else {
                gender = 'F';
            }

            if (referencia === '') {
                referencia = "NINGUNA";
            }        
        
        //Procesar la variable birth para dejarla en formato para MySQL.
        var dia = birth.slice(0, 2);
        var mes = birth.slice(3, 5);
        var year = birth.slice(6, 10);

        dataToSend.nombre = nombre.toUpperCase();
        dataToSend.appaterno = appaterno.toUpperCase();  
        dataToSend.apmaterno = apmaterno.toUpperCase();
        dataToSend.birth = year + "/" + mes + "/" + dia;
        dataToSend.gender = gender; 
        dataToSend.email = email;
        dataToSend.passwd = passwd1;         
        dataToSend.notify = notify; 
        dataToSend.tipousuario = tipousuario;
        dataToSend.loginstatus = loginstatus; 

        dataToSend.entidad = "Tabasco";
        dataToSend.municipio = "Cárdenas"; 
        dataToSend.localidad = "Cárdenas";
        dataToSend.telnum = telnum;
        dataToSend.colonia = "Fraccionamiento Los Reyes Loma Alta"; 
        dataToSend.codigopost = codigopost;
        dataToSend.calle = calle.toUpperCase(); 
        dataToSend.edificio = edificio.toUpperCase();
        dataToSend.numext = numext;
        dataToSend.numint = numint;
        dataToSend.entrecalle1 = entrecalle1.toUpperCase();
        dataToSend.entrecalle2 = entrecalle2.toUpperCase();
        dataToSend.referencia = referencia;

        $(document).scrollTop(0);   
        set_object_for_ongoing_processing();      

        //alert(JSON.stringify(dataToSend));

        $.ajax({
                type: "POST",
                url: "scripts_php/register_user.php",
                data: dataToSend,
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                dataType: "json",            
                success: function(data) {
                    var status = data.status;  //'success' or 'failed'

                    if (status === 'failed') {//Los datos no se pudieron escribir.
                        //Colocar el mensaje en el elemento DOM adecuado.
                        set_object_for_failed_processing();

                    } else if (status === 'success') {//Los datos se pudieron escribir.
                        //Deshabiltiar preloader
                        set_object_welcome_new_user();
                    }
                }
            }).fail(function() {//No se pudo establecer la conexión con el servidor.
                set_object_for_failed_processing();
        });
    }




    function show_user_favorites() {

        //Primero, se debe verificar que el usuario esté autenticado.
        //Se examinará localmente la presencia o ausencia de la cookie 'auth'.
        var userid = getCookie("auth");

        if (userid !== "") {
            //Cargar datos de dirección actual del usuario.
            set_object_for_favorites();        

        } else {  //Colocar en el mostrador la ventana de login.             
            set_object_for_login();           
        }
    }


    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires="+d.toGMTString();
        document.cookie = cname + "=" + cvalue + "; " + expires;
    }


    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i=0; i<ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1);
            if (c.indexOf(name) !== -1) return c.substring(name.length, c.length);
        }
        return "";
    }



    function submit_login_from_keyboard(event) {
        if (event.which === 13) {//Tecla "Enter"
            
            check_credentials();  
        }
    }

    
    //Esta función lee la URL actual y devuelve la query string.
    function getPageName() {
        var query_string_array = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        var first_variable = query_string_array[0];
        var page = first_variable.split('=')[1];

        return page;
    }


    //La siguiente función se invoca cuando el usuario escribe algún caracter en el elemento #searcher.
    function activate_instant_search(e) {

        var keycode = e.keyCode;
        var searchTerm = $("#searcher").val();   //Cadena de texto introducida en el buscador.        
        var searchLong = searchTerm.length;  
        var eanOfItem;
        
        //Posicionar el elemento #searchcontainer en relación al elemento #findbox.
        //Obtener la posición del elemento enfocado.
        var left = $('#findbox').offset().left;
        var top = $('#findbox').offset().top;
        
        //Asignar dicha posición al elemento #register_help.
        $('#searchcontainer').css('left', left);
        $('#searchcontainer').css('top', top + 40);

        if (keycode === 13) { //El usuario presionó la tecla ENTER en el elemento #searcher.

            //En esta parte, se carga el texto del primer elemento DIV contenido en #searchcontainer
            //en el campo de texto #searcher, al presionar ENTER, siempre y cuando se cumplan ciertas condiciones...

            //La condición es: deben existir caracteres en el elemento #searcher AND debe existir un listado de artículos disponibles.

            var firstChildDiv = $("#searchcontainer").children().first();
            var eanOfFirstChildDiv = firstChildDiv.attr('id'); 

            if (searchLong > 0 && eanOfFirstChildDiv !== 'noresultsfound' ) {
                //alert("Sí coincidences");

                //Si existe algún elemento de la clase 'focused', tomar el primero y mostrarlo en el #searcher.
                //De lo contrario, coger el primer elemento de la lista de resultados.
                var divFocused = $('#searchcontainer').children('.focused').length;

                if (divFocused === 0) {//No hay elementos div de la clase 'focused'. Tomar el primer elemento de la lista.
                    //Se obtiene la información del primer elemento en la lista de resultados.
                    var textOfSpan = $("#searchcontainer").children('div').first().children('span').first().text();
                    //var textOfSpan = spanOfFirstDiv.text();

                    //Se obtiene el id del primer elemento en la lista de resultados.
                    var eanOfItem = $("#searchcontainer").children('div').first().attr('id');


                    //Cargar el texto del primer hijo de #searchcontainer en el elemento #searcher
                    $("#searcher").val(textOfSpan);

                } else {//Existen elemento de la clase 'focused'. Cogerlo y copiarlo al #searcher.

                    var textOfFirstItemFocused = $("#searchcontainer").children('div.focused').first().children('span').first().text();

                    //Se obtiene el id del primer elemento con la clase 'focused'.
                    eanOfItem = $("#searchcontainer").children('div.focused').first().attr('id');

                    //Cargar el texto del primer hijo de #searchcontainer en el elemento #searcher
                    $("#searcher").val(textOfFirstItemFocused);

                }
                
                //Finalmente, activar script ajax para obtener los datos del artículo.
                get_item_info2(eanOfItem);                

            } else {
                //No hay caracteres o el artículo introducido en el buscador no está disponible.
                return;        
            }

        } else {//El usuario presionó alguna otra tecla en el elemento #searcher.

            if (keycode === 40) {//El usuario presionó la tecla FLECHA ABAJO.
                var divFocused = $('#searchcontainer').children('.focused').length;

                if (divFocused === 0) {
                    //Al elemento superior de la lista de resultados se le asignará la clase 'focused'.
                    //SIEMPRE Y CUANDO no sea el elemento con el id 'noresultsfound'.

                    var idOfFirstItem = $('#searchcontainer').children('div').first().attr('id');

                    if (idOfFirstItem !== 'noresultsfound') {
                        $('#searchcontainer').children('div').first().attr('class', 'resultitems focused');                    
                    }               

                    //Cargar la descripción del producto en el elemento #searcher.
                    add_focused_to_searcher();

                } else {
                    //Ya hay algún elemento con class 'focused' en la lista de resultados.
                    var idFocused = $('#searchcontainer').find('div.focused').attr('id');
                    var idLastItem = $('#searchcontainer').children('div').last().attr('id');

                    if (idFocused === idLastItem) {
                        //El último elemento de la lista ya está enfocado. Enfocar ahora el primer elemento de la lista.
                        $('#searchcontainer #' + idFocused).attr('class', 'resultitems');
                        $('#searchcontainer').children('div').first().attr('class', 'resultitems focused');
                    } else {
                        $('#searchcontainer #' + idFocused).attr('class', 'resultitems');
                        $('#searchcontainer #' + idFocused).next().attr('class', 'resultitems focused');
                    }

                    //Cargar la descripción del producto en el elemento #searcher.
                    add_focused_to_searcher();

                }                 
            } else if (keycode === 38) {//El usuario presionó la tecla FLECHA ARRIBA.

                var divFocused = $('#searchcontainer').children('.focused').length;

                if (divFocused === 0) {//Ningún elemento en la lista de resultados es de la clase 'focused'.
                    //Al elemento inferior de la lista de resultados se le asignará la clase 'focused',
                    //SIEMPRE Y CUANDO no sea el elemento con el id 'noresultsfound'.

                    var idOfLastItem = $('#searchcontainer').children('div').last().attr('id');

                    if (idOfLastItem !== 'noresultsfound') {
                        $('#searchcontainer').children('div').last().attr('class', 'resultitems focused');
                    }                              

                    //Cargar la descripción del producto en el elemento #searcher.
                    add_focused_to_searcher();


                } else {//Ya hay algún elemento con class 'focused' en la lista de resultados.

                    var idFocused = $('#searchcontainer').find('div.focused').attr('id');
                    var idFirstItem = $('#searchcontainer').children('div').first().attr('id');

                    if (idFocused === idFirstItem) {
                        //El primer elemento de la lista ya está enfocado. Enfocar ahora el último elemento de la lista.
                        $('#searchcontainer #' + idFocused).attr('class', 'resultitems');
                        $('#searchcontainer').children('div').last().attr('class', 'resultitems focused');
                    } else {
                        $('#searchcontainer #' + idFocused).attr('class', 'resultitems');
                        $('#searchcontainer #' + idFocused).prev().attr('class', 'resultitems focused');
                    }

                    //Cargar la descripción del producto en el elemento #searcher.
                    add_focused_to_searcher();
                }      


            } else {//La tecla presionada no es ni ENTER, ni KeyDown ni KeyUP. Buscar las coincidencias.

                if (searchTerm !== '') {//Si existe algún texto en el buscador, buscar las coincidencias...                    
            
                        //Buscar matches.
                        searchTerm = $("#searcher").val().toLowerCase();
                        search_for_matches();
                    
                } else {
                    //Cerrar el elemento #searchcontainer
                    close_instant_search();        
                } 
            }     
        }
    }
    
    
    
    function search_for_matches() {
        
        var searchTerm = $("#searcher").val().toLowerCase();
        
        if (searchTerm !== '') {
            var counter = 0;  //contador de coincidencias.
            var n = window.products.length;  //Total de productos en el documento JSON.
            var maxResults = 10;
            
            var i = 0;
            var itemObj = {};
            $("#searchcontainer").empty();   //Se limpia cualquier contenido previo del elemento #searchcontainer. 

            do {
                itemObj = window.products[i];
                var itemName = itemObj.name.toLowerCase();
                var itemEancode = itemObj.eancode;

                if (itemName.indexOf(searchTerm) !== -1) {//Se encontró una coincidencia...

                    $("#searchcontainer").append("<div class='resultitems' id='" + itemEancode + "'><span>" + itemName + "</span></div>");
                    counter++;
                }

                i++;

            } while (counter < maxResults && i < n);

            if (counter === 0) {
                //Agregar a #searchcontainer un div con la leyenda de que el artículo no está disponible                 
                $("#searchcontainer").append("<div class='noresultsfound' id='noresultsfound'><span>El artículo buscado no se encuentra disponible.</span></div>");
            } 

            //Volver visible el elemento #searchcontainer.
            if ($("#searchcontainer").css('display') === 'none') {
                $("#searchcontainer").fadeIn();
            }   
        }
    }    
    


    //Esta función se activa cuando el usuario hace click en alguna opción mostrada en el cuadro instant-search.
    function get_item_info(e) {
        var id_article = $('#searchcontainer').children('div.focused').first().attr('id');
        
        //Copiar en el campo de texto del elemento #searcher el texto de la opción seleccionada,
        //...siempre y cuando no se trate del DIV con la leyenda "No hay artículos disponibles"
        if (id_article !== 'noresultsfound') {
            var textToCopy = $('#searchcontainer').children('div.focused').first().children('span').first().text();

            $("#searcher").val(textToCopy);

            //Solicitar el envio de los datos del artículo seleccionado.
            get_item_info2(id_article);
        }   

        close_instant_search();     
    }

    
    //Esta función crea el history object para el item seleccionado desde el buscador.
    function create_object_for_item_searched(eancode, history_action) {
        
        var logged = (getCookie("auth") !== '') ? true:false;
        var subcategory = "search_item:" + eancode;
        var filename = "get_item_data.php";
        var path = "scripts_php/";

        var obj = {"origin": "searcher", "logged":logged, "data":{"subcategory":subcategory}, "script":{"filename":filename, "path": path}, "eancode": eancode};

        //Pasar el objeto 'obj' almodificador de escenario y al historia.
        modify_scenery(obj);
        
        if (history_action === "replace") {
            history.replceState(obj, "", "?page=" + subcategory);
        } else {
            history.pushState(obj, "", "?page=" + subcategory);
        }
        
    }



    //Esta función realiza una petición Ajax por los datos del artículo seleccionado en el buscador.
    //NOTA: Los resultados se buscan al realizar el usuario cualquiera de estas dos acciones:
    //a) Presionar ENTER habiendo resultados válidos en el cuadro de resultados de instant-search,
    //b) Al hacer click en alguna sugerencia válida mostrada en el cuadro de resultados de instant search.
    function get_item_info2(eancode) {
        
        //Limpiar elementos del buscador
        close_instant_search();   
        $('#searcher').val('');

        create_object_for_item_searched(eancode, "noreplace");   
    }



    function add_focused_to_searcher() {
        var itemInfo = $('#searchcontainer').find('div.focused').children('span').text();
        $("#searcher").val(itemInfo);
    }



    function update_focused_itemlist(e) {
        var itemFocusedId = e.target.id;

        //Limpiar cualquier posible resultado previamente asignado a la clase 'focused'.
        $('#searchcontainer').children('div').attr('class', 'resultitems');

        $(this).attr('class', 'resultitems focused');
    }


    function close_instant_search() {
        //Se ciertta el elemento #searchcontainer
        $("#searchcontainer").fadeOut();
    }


    //Esta función se activa cuando el usuario enfoca los campos del formulario de registro.
    function show_helper_tooltip(e) {

        var elem = e.target.id;
        var info = '';

        if (elem === 'registeremail') {
            info = "Introduzca un correo válido, con una longitud máxima de <span class='bold'>40 caracteres.</span>";
        }

        if (elem === 'registerpasswd1') {
            info = "Debe constar de caracteres alfanuméricos y los símbolos <span class='bold'>punto (.), coma(,), guión bajo (_), guión (-) y moneda ($) </span>únicamente. Longitud: <span class='bold'>mínimo 6 caracteres, máximo 10 caracteres.</span>";
        }

        if (elem === 'registerpasswd2') {
            info = 'Las contraseñas deben coincidir';
        }

        if (elem === 'registernombre') {
            info = "Debe estar formado por letras y los caracteres <span class='bold'>guión (-) y tilde (').</span> Longitud máxima: <span class='bold'>30 caracteres.</span>";
        }

        if (elem === 'registerappaterno') {
            info = "Debe estar formado por letras y los caracteres <span class='bold'>guión (-) y tilde (').</span> Longitud máxima: <span class='bold'>20 caracteres.</span>";
        }

        if (elem === 'registerapmaterno') {
            info = "Longitud máxima: <span class='bold'>20 caracteres.</span> Si carece de apellido materno, <span class='bold'>puede dejar este campo en blanco.</span>";
        }

        if (elem === 'registercp') {
            info = "Debe estar formado <span class='bold'>exactamente por 5 dígitos.</span>";
        }

        if (elem === 'registercalle') {
            info = "<span class='bold'>Seleccione una calle </span>del menú de la izquierda";
        }

        if (elem === 'registeredificio') {
            info = "Debe estar formado por caracteres alfanuméricos, y <span class='bold'>punto (.), coma(,), guión (-) y tilde (').</span> Longitud: <span class='bold'>máximo 15 caracteres.</span> Si no vive en edificio, <span class='bold'>deje este campo en blanco.</span>";
        }

        if (elem === 'registernumext') {
            info = "Debe estar formado por un <span class='bold'>máximo de 5 caracteres alfanuméricos</span>.  Por ejemplo: <span class='bold'>3, A-8, B 6, etc.</span>";
        }

        if (elem === 'registernumint') {
             info = "Debe estar formado por un <span class='bold'>máximo de 5 caracteres alfanuméricos</span>. Por ejemplo: <span class='bold'>3, A-8, B 6, etc.</span> Si no tiene número interior, <span class='bold'>deje este campo en blanco.</span>";
        }

        if (elem === 'registertelnum') {
            info = "Consta de <span class='bold'>exactamente 10 dígitos.</span>";
        }

        if (elem === 'registerentre1') {
            info = "Debe estar formado por caracteres alfanuméricos, y <span class='bold'>punto (.), coma(,), guión (-) y tilde (').</span> Longitud: <span class='bold'>máximo 30 caracteres.</span>";
        }

        if (elem === 'registerentre2') {
            info = "Debe estar formado por caracteres alfanuméricos, y <span class='bold'>punto (.), coma(,), guión (-) y tilde (').</span> Longitud: <span class='bold'>máximo 30 caracteres.</span>";
        }

        if (elem === 'registerref') {
            info = "Debe estar formado por caracteres alfanuméricos, y <span class='bold'>punto (.), coma(,), punto y coma (;), comilla doble (\"), guión (-) y tilde (')</span>. Longitud: <span class='bold'>máximo 40 caracteres.</span>";
        }

        
        if (elem === 'notify') {
            info = 'Indique si desea que le enviemos correos con ofertas o promociones';
        }
        

        /*
        if (elem === 'conditionsok') {
            info = "Para poder registrarse, <span class='bold'>debe aceptar las Condiciones de Compra.</span>";
        }
        */

        //Obtener la posición del elemento enfocado.
        var left = $(this).offset().left;
        var top = $(this).offset().top;

        $('#register_help').hide();
        var offset;
        
        if (elem === 'conditionsok') {
            offset = 475;
        } else {
            offset = 375;
        }
        
        //Asignar dicha posición al elemento #register_help.
        $('#register_help').css('left', left + offset);
        $('#register_help').css('top', top);

        $('#register_help').html(info);

        //Mostrar el elemento #register_help.
        $('#register_help').fadeIn(500);

    }


    //Esta función se activa cuando el usuario sale de los campos del formulario de registro (evento 'blur'):
    function check_field(e) {
        var elem = e.target.id;
        
        //Segundo, se validan los datos introducidos por el usuario.
        //Criterios:
        // nombre pertenece a la tabla USUARIOS. Debe constar únicamente de letras y los caracteres - y '. Longitud máxima: 30 caracteres.
        // appaterno pertenece a la tabla USUARIOS. Debe constar únicamente de letras y los caracteres - y '. Longitud máxima: 20 caracteres.
        // apmaterno pertenece a la tabla USUARIOS. Puede ser dejado en blanco. Longitud máxima: 20 caracteres.
        // gender pertenece a la tabla USUARIOS. Sus posibles valores son 'M' o 'F'.
        // email pertenece a la tabla USUARIOS. Debe ser un correo válido, con una longitud máxima de 40 caracteres.
        // passwd1 pertenece a la tabla USUARIOS. Debe constar de caracteres alfanuméricos y los símbolos .,_,-,$ únicamente. Longitud máxima: 10 caracteres.
        // passwd2 debe coincidir con el valor en passwd1. 
        // telnum pertenece a la tabla USUARIOS. Consta de exactamente 10 dígitos.
        // notify pertenece a la tabla USUARIOS. Sus posibles valores son 'Y' o 'N'.
        // tipousuario pertenece a la tabla USUARIOS. Su valor es 'C'.
        // loginstatus pertenece a la tabla USUARIOS. Su valor es 'RN'.

        // entidad pertenece a la tabla DIRENVIOS. Por ahora su valor es únicamente "Tabasco".
        // municipio pertenece a la tabla DIRENVIOS. Por ahora su valor es únicamente "Cárdenas".
        // localidadpertenece a la tabla DIRENVIOS. Por ahora su valor es únicamente "Cárdenas".
        // colonia pertenece a la tabla DIRENVIOS. Por ahora su valor es únicamente "Fraccionamiento Los Reyes Loma Alta".
        // codigopost pertenece a la tabla DIRENVIOS. Debe estar formado exactamente por 5 dígitos.
        // calle pertenece a la tabla DIRENVIOS. Por ahora su valor se elige de una lista.
        // calle_value pertenece a la tabla DIRENVIOS. Su valor debe ser distinto al de 'none'.
        // edificio = pertenece a la tabla DIRENVIOS. Debe estar formado por caracteres alfanuméricos, y [.,'-]. Longitud: máximo 15 caracteres.
        // numext = pertenece a la tabla DIRENVIOS. Debe estar formado por un máximo de 5 caracteres alfanuméricos.
        // numint = pertenece a la tabla DIRENVIOS. Debe estar formado por un máximo de 5 caracteres alfanuméricos.

        // entrecalle1 = pertenece a la tabla DIRENVIOS. Debe estar formado por caracteres alfanuméricos, y [.,'-]. Longitud: máximo 30 caracteres.
        // entrecalle2 = pertenece a la tabla DIRENVIOS. Debe estar formado por caracteres alfanuméricos, y [.,'-]. Longitud: máximo 30 caracteres.
        // referencia = pertenece a la tabla DIRENVIOS. Debe estar formado por caracteres alfanuméricos, y [.,;"'-]. Longitud: máximo 40 caracteres.

        //Por cada campo validado, se acumula un punto.
        //Cuando el puntaje es máximo, se procede al ergistro del usuario.

        //Con base en los criterios anteriores, se usarán los siguientes objetos RegExp:

        var regex_for_name = /^[A-Za-zñÑÁÉÍÓÚáéíóú]+([\s']?[a-zñÑÁÉÍÓÚáéíóú]+)*(\s[A-Za-zñÑÁÉÍÓÚáéíóú]+)*(-[A-Za-zñÑÁÉÍÓÚáéíóú]+)?$/;  //Done.
        var regex_for_appaterno = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+((\s[a-zA-ZñÑáéíóúÁÉÍÓÚ]+)*|([a-zA-ZñÑáéíóúÁÉÍÓÚ]+-[a-zA-ZñÑáéíóúÁÉÍÓÚ]+)*)*$/;  //Done.
        var regex_for_apmaterno = /(^\s{0,10}$)|(^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+((\s[a-zA-ZñÑáéíóúÁÉÍÓÚ]+)*|([a-zA-ZñÑáéíóúÁÉÍÓÚ]+-[a-zA-ZñÑáéíóúÁÉÍÓÚ]+)*)*$)/;  //Done.    
        var regex_for_email = /[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}/;  //Done.
        var regex_for_telnum = /^\d{10}$/;                                  //Done    
        var regex_for_codigopost = /^\d{5}$/;           //Done.
        var regex_for_calle = /^[A-Za-zñÑÁÉÍÓÚáéíóú]+(\s[A-Za-zñÑÁÉÍÓÚáéíóú]'?[A-Za-zñÑÁÉÍÓÚáéíóú]+)*(\s[A-Za-zñÑÁÉÍÓÚáéíóú]+)*(-[A-Za-zñÑÁÉÍÓÚáéíóú]+)?((\s|-)\d+)?$/;   //Done.
        var regex_for_edificio = /(^\s{0,10}$)|^[A-Za-zñÑÁÉÍÓÚáéíóú]+(\s[A-Za-zñÑÁÉÍÓÚáéíóú]'?[a-z]+)*(\s[A-Za-zñÑÁÉÍÓÚáéíóú]+)*(-[A-Za-zñÑÁÉÍÓÚáéíóú]+)?((\s|-)\d+)?$/;   //Done.
        var regex_for_numext = /^(\d+|([a-zA-Z]\s\d|[a-zA-Z]-\d))$/; //Done.
        var regex_for_numint = /(^\s{0,10}$)|^(\d+|([a-zA-Z]\s\d|[a-zA-Z]-\d))$/; //Done.
        var regex_for_entrecalle = /^[A-Za-zñÑÁÉÍÓÚáéíóú]+(\s[A-Za-zñÑÁÉÍÓÚáéíóú]'?[a-z]+)*(\s[A-Za-zñÑÁÉÍÓÚáéíóú]+)*(-[A-Za-zñÑÁÉÍÓÚáéíóú]+)?((\s|-)\d+)?$/;   //Done.
        var regex_for_referencia = /(^\s{0,10}$)|^[A-Za-zñÑÁÉÍÓÚáéíóú,;"'\.]+(\s[A-Za-zñÑÁÉÍÓÚáéíóú]'?[a-z]+)*(\s\d*|[A-Za-zñÑÁÉÍÓÚáéíóú,;"'\.]+)*(-[A-Za-zñÑÁÉÍÓÚáéíóú,;"']+)?((\s|-)\d+")?\.?$/;   //Done.    
        var regex_for_passwd = /([_a-zA-ZñÑáéíóúÁÉÍÓÚ\.\-\$]*\d*)+/;            //Done.   


        $('#register_help').fadeOut();    


        //Se eliminan los espacios antes y después del valor extraído, por medio de $.trim()

        if (elem === 'registeremail') {
            //Extraer el valor del campo.
            var email = $.trim($('#registeremail').val());

            if (!regex_for_email.test(email)) {
                window.registeremail = false;
                //Mostrar mensaje de advertencia al usuario.
                if ($('.mydata .register_error.no_valid_email').length === 0) {
                    $('.mydata .register_error.repeated_email').remove();
                    $('#registeremail').closest('tr').after("<tr class='register_error no_valid_email'><td class='error_heading'>Error:</td><td class='error_message'>Introduzca una dirección de email válida</td></tr>");
                }
            } else {//El correo tiene la estructura correcta.
                //Falta verficar que no existan coincidencias en la base de datos.

                $.post('scripts_php/check_duplicate_email.php', {'email': email}, function(data) {
                    var data = JSON.parse(data);                         
                    var status = data.status;                
                    
                    if (status === 'success') {//Los datos se procesaron en el servidor.

                        var repeated = data.repeated;  //true o false

                        if (repeated === true) {//Ya existe un correo idéntico en la base de datos.
                            $('#registeremail').next().css('color', 'red');
                            window.registeremail = false;
                            //Mostrar mensaje de advertencia al usuario.
                            if ($('.mydata .register_error.repeated_email').length === 0) {
                                $('.mydata .register_error.no_valid_email').remove();
                                $('#registeremail').closest('tr').after("<tr class='register_error repeated_email'><td class='error_heading'>Error:</td><td class='error_message'>Ya existe este correo. Pruebe con otro.</td></tr>");
                            }

                        } else {//No existe el correo introducido. Se acepta el correo.
                            $('.mydata .register_error.no_valid_email').remove();
                            $('.mydata .register_error.repeated_email').remove();
                            $('#registeremail').next().css('color', 'green');
                            window.registeremail = true; 
                        }
                    }
                });            
            }
        }



        if (elem === 'registerpasswd1') {
            //Extraer el valor del campo.
            var passwd1 = $.trim($('#registerpasswd1').val());

            //La contraseña debe contener caracteres válidos y debe tener la longitud requerida, de 6 a 10 caracteres, inclusive.
            if (!regex_for_passwd.test(passwd1) || passwd1.length < 6 ) {
                window.registerpasswd1 = false;
                //Mostrar mensaje de advertencia al usuario.
                if ($('.mydata .register_error.no_valid_passwd').length === 0) {
                    $('#registerpasswd1').closest('tr').after("<tr class='register_error no_valid_passwd'><td class='error_heading'>Error:</td><td class='error_message'>Ha introducido caracteres no válidos.</td></tr>");
                }
            } else {
                window.registerpasswd1 = true;
                $('.mydata .register_error.no_valid_passwd').remove();
            }
        }



        if (elem === 'registerpasswd2') {
            //Extraer el valor del campo.
            var passwd1 = $.trim($('#registerpasswd1').val());
            var passwd2 = $.trim($('#registerpasswd2').val());

            //(6) Se comprueba que las contraseñas sean no nulas, que coincidan y que tengan la longitud requerida.
            if (passwd1 === passwd2 && passwd2.length >=6) {

                $('#getaccesdata .register_error.passwd_not_equal').remove();
                $('#registerpasswd1').next().css('color', 'green');
                $('#registerpasswd2').next().css('color', 'green');
                window.registerpasswd2 = true;
                
            } else {
                
                $('#registerpasswd1').next().css('color', 'red');
                $('#registerpasswd2').next().css('color', 'red');
                window.registerpasswd2 = false;
                
                //Mostrar mensaje de advertencia al usuario.
                if ($('.mydata .register_error.passwd_not_equal').length === 0) {
                    $('#registerpasswd2').closest('tr').after("<tr class='register_error passwd_not_equal'><td class='error_heading'>Error:</td><td class='error_message'>Las contraseñas deben coincidir y tener una longitud de 6 a 10 caracteres.</td></tr>");
                }
            } 
        }



        if (elem === 'registernombre') {
            //Extraer el valor del campo.
            var nombre = $.trim($('#registernombre').val());

            if (!regex_for_name.test(nombre)) {
                
                $('#registernombre').next().css('color', 'red'); 
                window.registernombre = false;
                
                //Mostrar mensaje de advertencia al usuario.
                if ($('.mydata .register_error.no_valid_nombre').length === 0) {
                    $('#registernombre').closest('tr').after("<tr class='register_error no_valid_nombre'><td class='error_heading'>Error:</td><td class='error_message'>Introduzca un nombre válido.</td></tr>");    
                }
                
            } else {
                $('#registernombre').next().css('color', 'green');                
                $('.mydata .register_error.no_valid_nombre').remove();
                window.registernombre = true;
            }    
        }




        if (elem === 'registerappaterno') {
            //Extraer el valor del campo.
            var appaterno = $.trim($('#registerappaterno').val());

            if (!regex_for_appaterno.test(appaterno)) {
                $('#registerappaterno').next().css('color', 'red'); 
                window.registerappaterno = false;
                
                //Mostrar mensaje de advertencia al usuario.
                if ($('.mydata .register_error.no_valid_appaterno').length === 0) {
                    $('#registerappaterno').closest('tr').after("<tr class='register_error no_valid_appaterno'><td class='error_heading'>Error:</td><td class='error_message'>Introduzca un apellido válido.</td></tr>");
                }
                
            } else {
                $('.mydata .register_error.no_valid_appaterno').remove();
                $('#registerappaterno').next().css('color', 'green'); 
                window.registerappaterno = true;                
            }
        }



        if (elem === 'registerapmaterno') {
            //Extraer el valor del campo.
            var apmaterno = $.trim($('#registerapmaterno').val());

            if (!regex_for_apmaterno.test(apmaterno)) {
                window.registerapmaterno = false;
                //Mostrar mensaje de advertencia al usuario.
                if ($('.mydata .register_error.no_valid_apmaterno').length === 0) {
                    $('#registerapmaterno').closest('tr').after("<tr class='register_error no_valid_apmaterno'><td class='error_heading'>Error:</td><td class='error_message'>El apellido materno contiene caracteres no válidos.</td></tr>");
                }
            } else {
                window.registerapmaterno = true;
                $('.mydata .register_error.no_valid_apmaterno').remove();
            }
        }
        
        
        
        if (elem === 'registerbirth') {
            var elem_content = $("#registerbirth").val();
            
            if (elem_content !== '') {
                $('#registerbirth').next().css('color', 'green'); 
                window.registerbirth = true;
                
            } else {
                $('#registerbirth').next().css('color', 'red'); 
                window.registerbirth = false;
            }          
        }



        if (elem === 'registercp') {
            //Extraer el valor del campo.
            var codigopost = $.trim($('#registercp').val());

            if (!regex_for_codigopost.test(codigopost)) {
                $('#registercp').next().css('color', 'red'); 
                window.registercp = false;
                
                //Mostrar mensaje de advertencia al usuario.
                if ($('.mydata .register_error.no_valid_codigopost').length === 0) {
                    $('#registercp').closest('tr').after("<tr class='register_error no_valid_codigopost'><td class='error_heading'>Error:</td><td class='error_message'>Introduzca un código postal válido.</td></tr>");
                }
                
            } else {
                $('.mydata .register_error.no_valid_codigopost').remove();
                $('#registercp').next().css('color', 'green'); 
                window.registercp = true;                
            }
        }



        if (elem === 'registercalle') {
            //Extraer el valor del campo.
            var calle = $('#registercalle :selected').text();

            if (calle === 'none') {
                $('#registercalle').next().css('color', 'red');
                window.registercalle = false;
                
                //Mostrar mensaje de advertencia al usuario.
                if ($('.mydata .register_error.no_valid_calle').length === 0) {
                    $('#registercalle').closest('tr').after("<tr class='register_error no_valid_calle'><td class='error_heading'>Error:</td><td class='error_message'>Debe seleccionar el nombre de la calle.</td></tr>");
                }
                
            } else {
                $('.mydata .register_error.no_valid_calle').remove();
                $('#registercalle').next().css('color', 'green'); 
                window.registercalle = true;                
            }        
        }



        if (elem === 'registeredificio') {
            //Extraer el valor del campo.
            var edificio = $.trim($('#registeredificio').val());

            if (!regex_for_edificio.test(edificio)) {
                window.registeredificio = false;
                //Mostrar mensaje de advertencia al usuario.
                if ($('.mydata .register_error.no_valid_edificio').length === 0) {
                    $('#registeredificio').closest('tr').after("<tr class='register_error no_valid_edificio'><td class='error_heading'>Error:</td><td class='error_message'>El nombre del edificio contiene caracteres no válidos.</td></tr>");
                }
            } else {
                window.registeredificio = true;
                $('.mydata .register_error.no_valid_edificio').remove();
            }  
        }



        if (elem === 'registernumext') {
            //Extraer el valor del campo.
            var numext = $.trim($('#registernumext').val());

            if (!regex_for_numext.test(numext)) {
                $('#registernumext').next().css('color', 'red');
                window.registernumext = false;
                
                //Mostrar mensaje de advertencia al usuario.
                if ($('.mydata .register_error.no_valid_numext').length === 0) {
                    $('#registernumext').closest('tr').after("<tr class='register_error no_valid_numext'><td class='error_heading'>Error:</td><td class='error_message'>El formato del número exterior es incorrecto.</td></tr>");
                }
                
            } else {
                $('.mydata .register_error.no_valid_numext').remove();
                $('#registernumext').next().css('color', 'green'); 
                window.registernumext = true;                
            }
        }



        if (elem === 'registernumint') {
            //Extraer el valor del campo.
            var numint = $.trim($('#registernumint').val());

            if (!regex_for_numint.test(numint)) {
                window.registernumint = false;
                //Mostrar mensaje de advertencia al usuario.
                if ($('.mydata .register_error.no_valid_numint').length === 0) {
                    $('#registernumint').closest('tr').after("<tr class='register_error no_valid_numint'><td class='error_heading'>Error:</td><td class='error_message'>El formato del número exterior es incorrecto.</td></tr>");
                }
            } else {
                window.registernumint = true;
                $('.mydata .register_error.no_valid_numint').remove();
            }    
        }



        if (elem === 'registertelnum') {
            //Extraer el valor del campo.
            var telnum = $.trim($('#registertelnum').val());

            if (!regex_for_telnum.test(telnum)) {
                $('#registertelnum').next().css('color', 'red'); 
                window.registertelnum = false;
                
                //Mostrar mensaje de advertencia al usuario.
                if ($('.mydata .register_error.no_valid_telnum').length === 0) {
                    $('#registertelnum').closest('tr').after("<tr class='register_error no_valid_telnum'><td class='error_heading'>Error:</td><td class='error_message'>Ha instroducido caracteres no válidos.</td></tr>");
                }
                
            } else {
                $('.mydata .register_error.no_valid_telnum').remove();
                $('#registertelnum').next().css('color', 'green'); 
                window.registertelnum = true;                
            }        
        }



        if (elem === 'registerentre1') {
            //Extraer el valor del campo.
            var entrecalle1 = $.trim($('#registerentre1').val());

            if (!regex_for_entrecalle.test(entrecalle1)) {
                $('#registerentre1').next().css('color', 'red');
                window.registerentre1 = false;
                
                //Mostrar mensaje de advertencia al usuario.
                if ($('.mydata .register_error.no_valid_entrecalle1').length === 0) {
                    $('#registerentre1').closest('tr').after("<tr class='register_error no_valid_entrecalle1'><td class='error_heading'>Error:</td><td class='error_message'>El nombre de la calle contiene caracteres no válidos.</td></tr>");
                }
                
            } else {
                $('.mydata .register_error.no_valid_entrecalle1').remove();
                $('#registerentre1').next().css('color', 'green'); 
                window.registerentre1 = true;                
            }
        }



        if (elem === 'registerentre2') {
            //Extraer el valor del campo.
            var entrecalle2 = $.trim($('#registerentre2').val());

             if (!regex_for_entrecalle.test(entrecalle2)) {
                 $('#registerentre2').next().css('color', 'red'); 
                 window.registerentre2 = false;
                 
                //Mostrar mensaje de advertencia al usuario.
                if ($('.mydata .register_error.no_valid_entrecalle2').length === 0) {
                    $('#registerentre2').closest('tr').after("<tr class='register_error no_valid_entrecalle2'><td class='error_heading'>Error:</td><td class='error_message'>El nombre de la calle contiene caracteres no válidos</td></tr>");
                }
                
            } else {
                $('.mydata .register_error.no_valid_entrecalle2').remove();
                $('#registerentre2').next().css('color', 'green'); 
                window.registerentre2 = true;                
            }
        }



        if (elem === 'registerref') {
            //Extraer el valor del campo.
            var referencia = $.trim($('#registerref').val());

            if (!regex_for_referencia.test(referencia)) {
                //Mostrar mensaje de advertencia al usuario.
                window.registerref = false;
                if ($('.mydata .register_error.no_valid_referencia').length === 0) {
                    $('#registerref').closest('tr').after("<tr class='register_error no_valid_referencia'><td class='error_heading'>Error:</td><td class='error_message'>La referencia contiene caracteres no válidos.</td></tr>");
                }
            } else {
                window.registerref = true;
                $('.mydata .register_error.no_valid_referencia').remove();
            }
        }


        if (elem === 'conditionsok') {

            if ($('#conditionsok').is(':checked')) {
               window.conditionsok = true;

            } else {
                //Mostrar mensaje al usuario.
                var info = "Para poder registrarse, <span class='bold'>debe aceptar las Condiciones de Compra.</span>";

		//Obtener la posición del elemento enfocado.
                var mydata_left = $('.mydata').offset().left;
                var mydata_width = parseInt($('.mydata').css('width'));
                
                var top = $(this).offset().top;
		
		$('#register_help').hide();
                var offset = mydata_left + mydata_width;             
                
                //Asignar dicha posición al elemento #register_help.
                $('#register_help').css('left', offset + 10);
                $('#register_help').css('top', top);

                $('#register_help').html(info);

                //Mostrar el elemento #register_help.
                $('#register_help').fadeIn(500);
                
                window.conditionsok = false;           
            }

            //alert (window.registeremail + " " + window.registerpasswd1 + " " + window.registerpasswd2 + " " + window.registernombre + " " + window.registerappaterno + " " + window.registerapmaterno + " " + window.registercp + " " + window.registercalle + " " + window.registeredificio + " " + window.registernumext + " " + window.registernumint + " " + window.registertelnum + " " + window.registerentre1 + " " + window.registerentre2 + " " + window.registerref + " " + window.conditionsok);

        }


        if (window.registeremail && window.registerpasswd1 && window.registerpasswd2 && window.registernombre && window.registerappaterno && window.registerapmaterno && window.registerbirth && window.registercp && window.registercalle && window.registeredificio && window.registernumext && window.registernumint && window.registertelnum && window.registerentre1 && window.registerentre2 && window.registerref && window.conditionsok) { 
            //Activar el butón de envio (elemento #sendregister).
            $("#sendregister").attr("class", "active button");
        }
        else {
            $("#sendregister").attr("class", "inactive button");
        }
        
        return;
    }


    //Esta función oculta el submenú de criterios de ordenamiento de los productos.
    function hide_top_order_items_menu() {
        
        $("#auxiliarybanner").html("");       
    }
    
        
    
    
    //Esta función se activa cuando el usuario solicita renovar su contraseña.
    function set_object_for_restore_passwd() {
        var filename = "restore_login.html";
        var path = "scripts_php/";                
        
        var obj = {"origin": "restore_passwd_form", "logged" : false, "data":{}, "script":{"filename":filename, "path": path}};
        
        history.pushState(obj, "", "?page=" + obj.origin);

        //Pasar el objeto 'obj' almodificador de escenario y al historia.
        modify_scenery(obj);
    }
    
    
    
    function set_object_for_successful_restore_passwd() {
        
        var tableHTML = "<div class='cartcontainer'>";
        tableHTML += "<table>";
        tableHTML += "<tr><td><img src='icons/welcome2.png' width='381' height='184' /></td></tr>";
        tableHTML += "<tr><td align='center'>Estimado Cliente: </td></tr>";
        tableHTML += "<tr><td align='center'>&nbsp;</td></tr>";
        tableHTML += "<tr><td align='center'>Se ha generado una nueva contraseña</td></tr>";
        tableHTML += "<tr><td align='center'>Revise su bandeja de correo para recuperarla</td></tr>";        
        tableHTML += "<tr><td align='center'>&nbsp;</td></tr>";
        tableHTML += "<tr><td align='center'>En Carbon Copy estaremos encantados de poder servirle nuevamente.</td></tr>";           
        tableHTML += "</table>";       
        tableHTML += "</div>";        
        
        var obj = {"origin": "successfull_passwd_restore_screen", "logged" : false, "data":{}, "content": tableHTML};
        
        history.pushState(obj, "", "?page=" + obj.origin);   //Antes:  REPLACE

        //Pasar el objeto 'obj' almodificador de escenario y al historia.
        modify_scenery(obj);
    }
    
    
    
    //Esta función se invoca cuando, al intentar restaurar el passwd, el usuario introduce un correo inexistente en la bdd.
    function set_object_for_failed_restore_passwd() {
        
        var tableHTML = "<div class='cartcontainer'>";
        tableHTML += "<table>";
        tableHTML += "<tr><td><img src='icons/welcome2.png' width='381' height='184' /></td></tr>";
        tableHTML += "<tr><td align='center'>Estimado Cliente: </td></tr>";
        tableHTML += "<tr><td align='center'>&nbsp;</td></tr>";
        tableHTML += "<tr><td align='center'>El correo que usted introdujo </td></tr>";
        tableHTML += "<tr><td align='center'>no existe en nuestra base de datos.</td></tr>";        
        tableHTML += "<tr><td align='center'>&nbsp;</td></tr>";
        tableHTML += "<tr><td align='center'>Intente nuevamente.</td></tr>";           
        tableHTML += "</table>";       
        tableHTML += "</div>";        
        
        var obj = {"origin": "failed_restore_passwd_screen", "logged" : false, "data":{}, "content": tableHTML};
        
        history.pushState(obj, "", "?page=" + obj.origin);   //Antes:  REPLACE

        //Pasar el objeto 'obj' almodificador de escenario y al historia.
        modify_scenery(obj);
    }
    
    
    //Esta función se activa cuando el usuario presiona el botón "Enviar" en el formulario de restauración de passwd.
    function restore_login() {
        
        var regex_for_email = /[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}/;  //Done.
        var email = $("#restore_email").val();
        
        //Se examina la validez del formato de correo electrónico.
        if (!regex_for_email.test(email)) {
                window.registeremail = false;
                //Mostrar mensaje de advertencia al usuario.
                if ($('.mydata .register_error.no_valid_email').length === 0) {
                    $('.mydata .register_error.repeated_email').remove();
                    $('#restore_email').closest('tr').after("<tr class='register_error no_valid_email'><td class='error_heading'>Error:</td><td class='error_message'>Introduzca una dirección de email válida</td></tr>");
                }
        } else {//El correo tiene la estructura correcta.
                
            //Enviar correo via Ajax.
                
            //Objeto de verificación que se enviará al script.
            var obj = {"email": email};                
                
            $.ajax({
                    type: "POST",
                    url: "scripts_php/restore_login.php",            
                    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                    data: obj,
                    dataType: "json",                        
                    success: function(data) {
                        var status = data.status;  //'success' or 'failed'.                

                        if (status === 'failed') {//Los datos no se pudieron escribir.

                            //Colocar el mensaje en el elemento DOM adecuado.
                            set_object_for_failed_processing();                    

                        } else if (status === 'success') {//Los datos se pudieron escribir.
                           
                            var message = data.message;
                            
                            if (message === "okey") {//La contraseña fue renovada exitosamente.
                                set_object_for_successful_restore_passwd();
                            }
                            
                            if (message === "email_not_exists") {//El correo introducido no existe.
                                set_object_for_failed_restore_passwd();
                            }
                        }
                    }
                    }).fail(function() {//No se pudo establecer la conexión con el servidor.            
                            set_object_for_failed_processing();
                    });                 
            }
    }
    
    
        
    function show_progress(step, total) {
        var progressBar = "<div id='progress'><progress value='" + step + "' max='" + total + "'></progress></div>";
        $("#auxiliarybanner").html(progressBar);
        //$("#progress").fadeIn();
    }
    
    
    
    function hide_progress_bar() {
        $("#progress").remove();
    }
    

});
