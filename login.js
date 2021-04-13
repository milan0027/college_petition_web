
function login()
{

  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).then(function() {
   
    var id=firebase.auth().currentUser.uid;
   
    window.location.assign('userpage.html');
   
    
   }).catch(function(error){

    var errorCode=error.code;
    var errorMsg=error.message;
window.alert("error: "+errorMsg)
   });
  }

function logout(){
  firebase.auth().signOut();
}

