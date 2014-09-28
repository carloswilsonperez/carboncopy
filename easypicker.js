 $(document).ready(function() {
  
    var dias = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
    window.meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    window.bisiestos = [1904, 1908, 1912, 1916, 1920, 1924, 1928, 1932, 1936, 1940, 1944, 1948, 1952, 1956, 1960, 1964, 1968, 1972, 1976, 1980, 1984, 1988, 1992, 1996, 2000, 2004, 2008, 2012, 2016, 2020];
    window.diasEnMes = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    window.currentYear = 2014;
    window.currentMonth = "septiembre";
    window.calendar_is_active = false;           

    $(document).delegate(".easypicker", "click", show_calendar);
    $(document).delegate("#calendar td.close_calendar", "click", close_picker);
    $(document).delegate("#calendar #left_year", "click", {offset: -1}, update_year);
    $(document).delegate("#calendar #right_year", "click", {offset: 1}, update_year);
    $(document).delegate("#calendar #left_month", "click", {offset: -1}, update_month);
    $(document).delegate("#calendar #right_month", "click", {offset: 1}, update_month);                

    $(document).delegate("#calendar_body td.activeday", "click", get_date);

    function show_calendar(event) {
        //Se obtiene el ID del elemento que activó el picker.
        var targetID = event.target.id; 
        
        calculate_first_day_of_current_month(window.currentYear, window.currentMonth);

        $("#calendar").addClass(targetID); //Se agrega al calendar la clase igual al ID del elemento que lo activó.        
        
        $("#currentYear").val(window.currentYear);
        $("#currentMonth").val(window.currentMonth);

        //Posicionar el elemento #active_criteria.
        //Obtener la posición del elemento #orderby span.
        var left = $(this).offset().left;
        var top = $(this).offset().top;
        var target_width = $(this).css('width');             

        //Asignar dicha posición al elemento #calendar.
        $('#calendar').css('left', left + parseInt(target_width));
        $('#calendar').css('top', top);
        $("#calendar").fadeIn();
    }
    
    function close_picker() {
        $("#calendar").fadeOut();
    }
  
    function update_year(event) {
        var currentYear = parseInt($("#currentYear").val());  
        var finalYear = currentYear + event.data.offset;

        $("#currentYear").val(finalYear);
        window.currentYear = finalYear;

        calculate_first_day_of_current_month(window.currentYear, window.currentMonth);
    }
  
    function update_month(event) {
        var currentMonth = $("#currentMonth").val();  
        var currentMonthIndex = window.meses.indexOf(currentMonth);
        var finalMonthIndex = currentMonthIndex + event.data.offset;
             
        if (finalMonthIndex < 0) {
            finalMonthIndex = 11;
            window.currentYear--;
            $("#currentYear").val(window.currentYear);
        }
      
        if (finalMonthIndex > 11) {
            finalMonthIndex = 0;
            window.currentYear++;
            $("#currentYear").val(window.currentYear);
        }
      
        var finalMonthName = window.meses[finalMonthIndex];
        $("#currentMonth").val(finalMonthName);

        window.currentMonth = finalMonthName;

        calculate_first_day_of_current_month(window.currentYear, window.currentMonth);
    }
  
    function get_date(event) {
        var calendarClassName = $(this).closest("div#calendar").attr("class");

        var day = event.target.childNodes[0].nodeValue;

        var month = String(window.meses.indexOf($("#calendar #currentMonth").val()) + 1);

        var year = $("#calendar #currentYear").val();

        if (day.length === 1) {
            day = "0" + day;
        }

        if (month.length === 1) {
            month = "0" + month;
        }

        var dateString = day + "/" + month + "/" + year;
      
        //Escribir en el elemento DOM cuyo ID es el mismo que calendarName.
      
        var selector = "#" + calendarClassName + ".easypicker";
        $(selector).val(dateString);
    }
  
    function calculate_first_day_of_current_month(currentYear, currentMonth) {
      
        var baseYear = 1901;
        var offset = 2;

        //var currentYear = parseInt($("#currentYear").val());   //1901 hasta 2020
        var yearsSinceBaseYear = currentYear - baseYear;

        var numPrevBisiestos = checkPrev(window.bisiestos, currentYear);
        //alert("Hay " + numPrevBisiestos + "bisiestos previos!");
        var L = numPrevBisiestos*366 + (yearsSinceBaseYear - numPrevBisiestos)*365;
        var index = (L + offset)%7;

        //alert("El 1 de enero del año en curso fue " + dias[index]);
      
        var daysElapsedBeforeCurrentMonth = [];      

        var suma = 0;

        for (var i = 0; i <= 12; i++) {
            
            for (var j = 0; j < i; j++) {
                suma += window.diasEnMes[j];
            }
            
            daysElapsedBeforeCurrentMonth.push(suma);
            suma = 0;
        }

        var currentMonthIndex = window.meses.indexOf(currentMonth);
        var daysElapsedBeforeThisMonth;
        
        if (window.bisiestos.indexOf(currentYear) !== -1) {//El currentYear es bisiesto...
            
            if (currentMonthIndex >= 2) {//Si el currentMonth es de marzo a diciembre...
                daysElapsedBeforeThisMonth = daysElapsedBeforeCurrentMonth[currentMonthIndex] + 1;
            } else {
                daysElapsedBeforeThisMonth = daysElapsedBeforeCurrentMonth[currentMonthIndex];
            }
   
        } else {
            daysElapsedBeforeThisMonth = daysElapsedBeforeCurrentMonth[currentMonthIndex];
        }                

        var indexOfFirstDayForThisMonth = (L + offset + daysElapsedBeforeThisMonth) % 7;
        //alert("El 1 de este mes cae en " + dias[indexOfFirstDayForThisMonth]);

        var indexOfLastDayForThisMonth = (L + offset + daysElapsedBeforeThisMonth + window.diasEnMes[currentMonthIndex] - 1) % 7;

        var counter = 1;

        //var content = "Este mes tiene " + diasEnMes[currentMonthIndex] + "días<br>";
        var content = "";

        if (!window.calendar_is_active) {
            content += "<div id='calendar'>";
            content += "<div><span><div id='left_year'>&lt;</div><input type='text' id='currentYear' readonly><div id='right_year'>&gt;</div></span></div>";
            content += "<div><span><div id='left_month'>&lt;</div><input type='text' id='currentMonth' readonly><div id='right_month'>&gt;</div></span></div>";       
            content += "<div id='calendar_body'>";
        } 
        
        content += "<table>";
        content += "<thead>";
        content += "<tr>";
        content += "<th>Do</th><th>Lu</th><th>Ma</th><th>Mi</th><th>Ju</th><th>Vi</th><th>Sa</th>";      
        content += "</tr>";
        content += "</thead>";
        content += "<tr>";
      
        for (var i = 0; i < 42; i++) {   
   
            if (i <= (indexOfFirstDayForThisMonth-1) || i > (window.diasEnMes[currentMonthIndex] + indexOfFirstDayForThisMonth - 1)) {
                if (i === 41) {
                    content += "<td id='close_calendar' class='close_calendar'>";
                    content += "x";
                } else {
                    content += "<td class='noactiveday'>";
                    content += "";
                }
            } else {
                content += "<td class='activeday'>";
                content += counter;
                counter++;
            }

            content += "</td>";

            if ((i+1)%7 === 0 && i < 41) {
                content += "</tr><tr>";
            }
        }
        
        content += "</table>";

        if (!window.calendar_is_active) {
          content += "</div>";
          content += "</div>";
        }      

        if (window.calendar_is_active) {
          $("#calendar_body").html(content);
             } else {
          window.calendar_is_active = true;
          $("body").append(content);
        }
      
        //alert("El último día de este mes cae en " + dias[indexOfLastDayForThisMonth]);
    }
  
  
    function checkPrev(bisiestos, currentYear) {
        var long = bisiestos.length;
        var i = 0;
        var count = 1;
        var notFound = true;

        if (currentYear <= window.bisiestos[0]) {
            return 0;

        } else {
            do {
                if (window.bisiestos[count] >= currentYear) {    
                    notFound = false;
                    return count;

                } else {
                    count++;
                }
            } while (notFound && count < long);
        }      
    } 
});