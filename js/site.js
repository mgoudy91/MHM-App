/* On Ready*/
$(document).ready(function() {

    // Init vars
    var powered = false;
    var minutes = true;
    var time = 0;

    // Helper/format functs
    function pad(num, size) {
        var s = num+"";
        while (s.length < size) s = "0" + s;
        return s;
    }
    function h2m(min) {
        return (min/60).toFixed(2);
    }


    // Main update function
    function update_time () {
        var time_str;
        if (minutes) {
            $('#clock_unit').html("MIN");
            time_str = pad(time,4);
        }
        else{
            $('#clock_unit').html("HRS");
            time_str = pad(h2m(time),4);
        }
        $('#clock_txt').html(time_str);
    }

    // Handlers
    $('#button_power').click(function() {
        if(powered){
            $("#clock_txt").animate({opacity: 0.0}, 0);
            $("#clock_unit").animate({opacity: 0.0}, 0);
        }
        else{
            $("#clock_txt").animate({opacity: 1.0}, 200);
            $("#clock_unit").animate({opacity: 1.0}, 200);
        }
        powered = !powered;     
    });
    $('#button_plus').click(function() {
        if (time < 9999 && powered) {
            time++;
            update_time();
        };
    });
    $('#button_minus').click(function() {
        if (time >0 && powered) {
            time--;
            update_time();
        };
    });
    // Min / Hrs
    $('.minute-toggle-label').click(function() {
        minutes = !minutes;
        update_time();
    });

    //Initialize clock
    update_time();

});

