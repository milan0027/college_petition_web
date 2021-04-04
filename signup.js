function RegisterUser() {
    var email=document.getElementById('email').value;
    var password=document.getElementById('password').value;
    var name=document.getElementById('name').value;
  
    var fname=document.getElementById('admn').value;
    firebase.auth().createUserWithEmailAndPassword(email,password).then(function(){
    
        alert('You are Registered successfully. Please Log In to Continue');
 
     var id=firebase.auth().currentUser.uid;
     firebase.database().ref('Users/'+id).set({
     admissionno:fname,
     Username:name,
      
     });
   
    }).catch(function(error){
 
     var errorcode=error.code;
     var errormsg=error.message;
     window.alert(errormsg);
 
    });
   }