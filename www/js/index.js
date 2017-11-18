// document.addEventListener("deviceready", onDeviceReady, false);

// function onDeviceReady() {
  var player = undefined;
  $(document).ready(function(){
    const dbRef = firebase.database().ref();
    dbRef.on('value', snap=>{
      let val = snap.val();

      if(val.players.red) $('#red').find('.taken').fadeIn(100);
      else $('#red').find('.taken').fadeOut(100);
      if(val.players.blue) $('#blue').find('.taken').fadeIn(100);
      else $('#blue').find('.taken').fadeOut(100);
      if(val.players.green) $('#green').find('.taken').fadeIn(100);
      else $('#green').find('.taken').fadeOut(100);
      if(val.players.yellow) $('#yellow').find('.taken').fadeIn(100);
      else $('#yellow').find('.taken').fadeOut(100);

      // console.log(Object.keys(val.players).length);
      console.log(Object.values(val.players));
      var playerValues = Object.values(val.players);
      var presentPlayers = 0;
      playerValues.forEach(function(isPresent){
        if(isPresent) presentPlayers++;
      });
      if(presentPlayers > 1 && player){
        $('#startBtn').fadeIn(200);
      }
    });

    $('.color').click(function(){
      if(player) return;
      var color = $(this).closest('.color').attr('id');
      player = new Player(color);
      $(this).find('.taken').html('You');
      dbRef.child('players/'+color).set(true);
    });

    $('#resetBtn').click(function(){
      player = undefined;
      dbRef.child('players/red').set(false);
      dbRef.child('players/blue').set(false);
      dbRef.child('players/green').set(false);
      dbRef.child('players/yellow').set(false);
    });

    $('#startBtn').click(function(){
      window.location.href = "game.html";
    });
  });

  function Player(color){
    this.color = color;
  }
// }
