// function navChange(){

// }

// $(window).on('scroll', function() {
//     var y_scroll_pos = window.pageYOffset;
//     var scroll_pos_1 = 100             // set to whatever you want it to be
//     var scroll_pos_2 = 900;
//     var nav = document.getElementById('nav-gradient');

//     if(y_scroll_pos > scroll_pos_1) {
//         //do stuff
//         nav.classList.remove('position-1');
//         nav.classList.add('position-2');
//         console.log(y_scroll_pos)
//     }
//     else if(y_scroll_pos > scroll_pos_2) {
//         // nav.classList.add('position-2');
//         nav.classList.remove('position-2');
//         nav.classList.add('position-1');
//         console.log(y_scroll_pos)
//     }
// });

var nav = document.getElementById('nav-gradient');

$('#link-1').hover(
    function(){ $(nav).addClass('position-1') },
    function(){ $(nav).removeClass('position-1') }
)
$('#link-2').hover(
    function(){ $(nav).addClass('position-2') },
    function(){ $(nav).removeClass('position-2') }
)
$('#link-3').hover(
    function(){ $(nav).addClass('position-3') },
    function(){ $(nav).removeClass('position-3') }
)
$('#link-4').hover(
    function(){ $(nav).addClass('position-4') },
    function(){ $(nav).removeClass('position-4') }
)
$('#link-5').hover(
    function(){ $(nav).addClass('position-5') },
    function(){ $(nav).removeClass('position-5') }
)