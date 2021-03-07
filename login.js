
function login()
{

  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).then(function() {
    // Handle Errors here.
    var id=firebase.auth().currentUser.uid;
    window.location.replace("userpage.html");
    localStorage.setItem('id',id);
    
   }).catch(function(error){

    var errorCode=error.code;
    var errorMsg=error.message;
window.alert("error: "+errorMsg)
   });
  }

function logout(){
  firebase.auth().signOut();
}

function login1(){
 
  window.location.replace("GameBase.html");
}