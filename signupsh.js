function RegisterUser() {
    var email=document.getElementById('email').value;
    var password=document.getElementById('password').value;
    var name=document.getElementById('name').value;
  
    var fname=document.getElementById('admn').value;
    if(name.trim()=="")
    {
        alert("Please fill your name");
    }
    else if(fname.trim()=="")
    {
        alert("Please fill your admission number");
    }
    else
   {
    firebase.auth().createUserWithEmailAndPassword(email,password).then(function(){
    
       
     var id=firebase.auth().currentUser.uid;
     firebase.database().ref('Users/'+id).set({
     admissionno:fname,
     Username:name,
      
     }).then(()=>{

        var diurl=localStorage.getItem('shurl');
        window.location.assign(diurl);
   
       
     }).catch(err => {
        window.alert(err.message);
    })
 }).catch(function(error){
 
     var errorcode=error.code;
     var errormsg=error.message;
     window.alert(errormsg);
 
    });
 }
}