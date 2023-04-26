/* function play(){
    document.getElementById("card1").style.animationPlayState = "running";
    
        } */

$(document).ready(function(){
$('#card1').click(function(e) {
    e.preventDefault();
    href = $(this).attr('href');
    /* play(); */
    /* $('#card1').animate( {height: "100vh", width: "100vw"}, 2000, function() {
        window.location = href;
        }); */
        
    /* document.getElementById('card1').style.animation="flip 4s linear 2"; */
        /* (
         [
            {transform: 'scale(3, 3,)'},
          { transform: 'rotate(0) translate3D(-50%, -50%, 0)', color: '#000' },
          { color: '#431236', offset: 0.3 },
          { transform: 'rotate(360deg) translate3D(-50%, -50%, 0)', color: '#000' }
        ], {
          duration: 3000, iterations: 2
        } 
      ); */
        
    setTimeout(function() {window.location = href}, 3000);
    return false;

});
});

$(document).ready(function(){
    $('#card2').click(function(e) {
        e.preventDefault();
        href = $(this).attr('href');
        $('#card2').animate( {height: "100vh", width: "100vw", top:"0px", left: "0px"}, 2000, function() {
            window.location = href;
        });
    });
});

$(document).ready(function(){
    $('#card3').click(function(e) {
        e.preventDefault();
        href = $(this).attr('href');
        $('#card3').animate( {height: "100vh", width: "100vw"}, 2000, function() {
            window.location = href;
        });
    });
});

$(document).ready(function(){
    $('#card4').click(function(e) {
        e.preventDefault();
        href = $(this).attr('href');
        $('#card4').animate( {height: "100vh", width: "100vw"}, 2000, function() {
            window.location = href;
        });
    });
});

    

console.log('h1');

/* $(document).ready(function(){
    $(".card").on("click", function(){
      $(this).hide();
    });
  }); */

  /*   $('#card1').click(function() {
        
    });
 */