var Player;
$(document).ready(function(){
  const dbRef = firebase.database().ref();

  dbRef.on('value', snap=>{
    let val = snap.val();
    console.log(val);
  });

  $('.color').click(function(){
    $(this).find('.taken').fadeIn(100, function(){
      $('.color').off('click');

      console.log('players/'+$(this).closest('.color').attr('id'));

      dbRef.child('players/'+$(this).closest('.color').attr('id')).set(true);
    });
  });

});

function Player(color){
  this.color = color;
}
