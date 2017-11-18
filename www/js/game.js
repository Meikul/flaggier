$(document).ready(function(){
  const dbRef = firebase.database().ref();

  dbRef.on('value', snap => {

  });

  $('#resetBtn').click(function(){
    console.log('click');
    console.log(dbRef);
    for(base in dbRef.child('bases')){
      console.log(base);
    }
  });
});
