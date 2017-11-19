// document.addEventListener("deviceready", onDeviceReady, false);

// function onDeviceReady() {
  var player = undefined;
  var mode = undefined;

  document.addEventListener('deviceready', function() {
    


  //$(document).ready(function(){
    const dbRef = firebase.database().ref();

    // console.log(dbRef.child('bases'));
    dbRef.on('value', snap=>{
      let val = snap.val();
      if(mode == undefined) mode = val.mode;
      if(val.mode == 'start'){
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
      }
      else{
        if(mode == 'start') {
          mode = 'game';
          $('#startScreen').fadeOut(300, function(){
            $('#gameScreen').fadeIn(300, initGame);
          });
        }
        $('#b1').css('background', val.bases.b1);
        $('#b2').css('background', val.bases.b2);
        $('#b3').css('background', val.bases.b3);
        $('#b4').css('background', val.bases.b4);
      }
    });

    $('.color').click(function(){
      if(player) return;
      var color = $(this).closest('.color').attr('id');
      player = new Player(color);
      $(this).find('.taken').html('You');
      dbRef.child('players/'+color).set(true);
    });

    try {
    
    if(nfc == null) {
      $('.title').html('yes');
    } else {
      $('.title').html('nonon');
    }

    nfc.addNdefListener(function(ndef) {
      var string = nfc.bytesToString(ndef.tag.ndefMessage[0].payload);
      string = string.substring(3);
      nfcHandle(string);
    })

    nfc.addTagDiscoveredListener(function(nfcevent) {
      $('.subtitle').html(JSON.stringify(nfcevent.tag));
      $('.title').html(nfc.bytesToString(nfcevent.tag.id));
    }, function() {
      $('.subtitle').html('yes');
    }, function() {
      $('.subtitle').html('yes');
    });
  } catch(ex) {
    alert(ex.message);
  }
    $('#resetBtn').click(function(){
      player = undefined;
      dbRef.child('players/red').set(false);
      dbRef.child('players/blue').set(false);
      dbRef.child('players/green').set(false);
      dbRef.child('players/yellow').set(false);
      dbRef.child('mode').set('start');
      dbRef.child('bases/b1').set('white');
      dbRef.child('bases/b2').set('white');
      dbRef.child('bases/b3').set('white');
      dbRef.child('bases/b4').set('white');
      console.log('reseted');
    });

    $('#startBtn').click(function(){
      dbRef.child('mode').set('game');
    });
  //});

  function nfcHandle(contents){
    dbRef.child('bases/'+contents).set(player.color);
  }

  function initGame(){
    console.log('inited');
  }

  function Player(color){
    this.color = color;
  }
}, false);
// }
