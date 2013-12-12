/* On Ready*/
$(document).ready(function() {

    /* Init vars */
    var powered = false;
    var minutes = true;
    var time = 0;
    const MAX_TIME = 999;

    /* Helper/format functions */
    // Pad number to 4 digits
    function pad(num, size) {
        var s = num+"";
        while (s.length < size) s = "0" + s;
        return s;
    }
    // Minutes to hours formatting
    function m2h(min) {
        return (min/60).toFixed(2);
    }

    /* Main update function */
    function update_time () {
        var time_str;
        if (minutes) {
            $('#clock_unit').html("MIN");
            time_str = pad(time,4);
        }
        else{
            $('#clock_unit').html("HRS");
            time_str = pad(m2h(time),4);
        }
        //Update each digit in display
        $('#dig_1').html(time_str.substring(0,1));
        $('#dig_2').html(time_str.substring(1,2));
        $('#dig_3').html(time_str.substring(2,3));
        $('#dig_4').html(time_str.substring(3,4));
        $( "#slider" ).slider( "option", "value", time );
    }

    /* Handlers */
    $('#button_power').click(function() {
        if(powered){
            // Turn off
            $("#clock_txt").animate({opacity: 0.0}, 0);
            $("#clock_unit").animate({opacity: 0.0}, 0);
        }
        else{
            // Turn on
            $("#clock_txt").animate({opacity: 1.0}, 200);
            $("#clock_unit").animate({opacity: 1.0}, 200);
        }
        powered = !powered;     
    });
    $('#button_plus').click(function() {
        if (time < MAX_TIME && powered) {
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

    /*Initialize app */
    // Slider widget
    $( "#slider" ).slider({
        range: "min",
        min: 0,
        max: MAX_TIME,
        value: 0,
        slide: function( event, ui ) {
            time = ui.value;
            update_time();
        }
    });
    // First time update
    update_time();
});

