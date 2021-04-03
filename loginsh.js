function login()
{

  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).then(function() {
    
    var id=firebase.auth().currentUser.uid;
    var diurl=localStorage.getItem('shurl');
    window.location.replace(diurl);
   
    
   }).catch(function(error){

    var errorCode=error.code;
    var errorMsg=error.message;
window.alert("error: "+errorMsg)
   });
  }

function logout(){
  firebase.auth().signOut();
}