//storing url of page to be used in case user was logged out
localStorage.setItem('shurl', window.location.href);


//checking if the user is signed in or not
auth.onAuthStateChanged(user => {
    if (user) {
    var userId=auth.currentUser.uid;
    firebase.database().ref('Users/'+userId).once('value').then(function(snapshot){
     var fname=(snapshot.val() && snapshot.val().Username);
    
   
     document.getElementById('fname').innerHTML="Hey, "+fname;
     
    });
}
    else {
    //this is a different login page which will take user to this page on logging in
    location = "loginsh.html";
    alert('you are not logged in, kindly login again to continue');
    }
})

function logout() {
auth.signOut();
}

//getting hash of shared url
var ha=window.location.hash;

//on removing hash we get the doc id of the post
ha=ha.substring(1);
if(ha!="")
{
    //displaying the content of shared post
    //rest all the things are same as that of userpage.js file
var docRefe = fs.collection("petitions").doc(ha);
docRefe.get().then((doc) => {
    var depart=["None","Academics","Sports","Library","Hostel","Mess"];
const petti = document.getElementById('peti-container');
var deptmailid=["iitismdefault27@gmail.com","iitismacademics27@gmail.com","iitismsports27@gmail.com","iitismlibrary27@gmail.com","iitismhostel27@gmail.com","iitismmess27@gmail.com"];





    let parentDiv = document.createElement("div");
    parentDiv.className = "container peti-box";
    
    parentDiv.setAttribute('data-id', doc.data().id);

    let yname = document.createElement("div");
    yname.className="yesname yestag";
    yname.textContent = doc.data().uname;

    let der=document.createElement("div");
   var de=parseInt(doc.data().dept);
   der.className="yestag yestag2";
    der.textContent="#"+depart[de];

  let tim= document.createElement("div");
 
   var tym=doc.data().times;
   var dater=new Date(tym);
   
   tim.innerHTML="Posted on "+dater.getDate()+
   "/"+(dater.getMonth()+1)+
   "/"+dater.getFullYear()+
   " at "+dater.getHours()+
   ":"+dater.getMinutes()+
   ":"+dater.getSeconds();
    

    let petDiv = document.createElement("div");
    petDiv.textContent = doc.data().petis;
    petDiv.className="yespet";

    let upv= document.createElement("div");
    upv.className="bttn btnupv";
    var upt=doc.data().upvote;
    upv.innerText=upt;

   
    let dpv= document.createElement("div");
    dpv.className="bttn btndpv";
    var dpt=doc.data().downvote;
    dpv.innerText=dpt;
   
    let ub=document.createElement("button");
    ub.className="bttn btncl";
   

    let dv= document.createElement("button");
    dv.className="bttn";


    let j=document.createElement("i");
    var userlol=firebase.auth().currentUser.uid;
    var docRef =fs.collection("petitions").doc(doc.data().id).collection("likes").doc(userlol)
    docRef.get().then((doc) => {
        if (doc.exists) {
            j.className="fa fa-thumbs-up bttn1 bttn4";
        } else {
            j.className="fa fa-thumbs-up bttn1";
        }
    })
    

    let k=document.createElement("i");
    var docRef2 =fs.collection("petitions").doc(doc.data().id).collection("dislikes").doc(userlol)
    docRef2.get().then((doc) => {
        if (doc.exists) {
            k.className="fa fa-thumbs-down bttn2 bttn5";
        } else {
            k.className="fa fa-thumbs-down bttn2";
        }
    })
  

    
   
   
   ub.appendChild(j);
    
  
    parentDiv.appendChild(yname);
    parentDiv.appendChild(der);
    parentDiv.appendChild(tim);
   

    parentDiv.appendChild(petDiv);
   
    dv.appendChild(k);
    parentDiv.appendChild(upv);
    parentDiv.appendChild(ub);
    parentDiv.appendChild(dpv);
    parentDiv.appendChild(dv);
  
   
   
   
    petti.insertBefore(parentDiv,petti.childNodes[0]);


    ub.addEventListener('click', e=> {
        
       
       
        let id1 = e.target.parentElement.parentElement.getAttribute('data-id');
        var upref = fs.collection("petitions").doc(id1);

        if(  parentDiv.querySelector(".bttn1").classList.contains("bttn4"))
        {
            upref.update({
                upvote: firebase.firestore.FieldValue.increment(-1)
            });

        }
        else{
        upref.update({
            upvote: firebase.firestore.FieldValue.increment(1)
        });
    }
        
    })
    ub.addEventListener('click', e=> {
        let id5 = e.target.parentElement.parentElement.getAttribute('data-id');
        if(  parentDiv.querySelector(".bttn1").classList.contains("bttn4"))
        {
            parentDiv.querySelector(".btnupv").innerText=parseInt(upv.innerText)-1;
            parentDiv.querySelector(".bttn1").classList.remove("bttn4");

            auth.onAuthStateChanged(user => {
                var userk=firebase.auth().currentUser.uid;
                if (user) {
                  
                       
                    fs.collection("petitions").doc(id5).collection("likes").doc(userk).delete().then(() => {
                        console.log("Document successfully deleted!");
                    }).catch((error) => {
                        console.error("Error removing document: ", error);
                    });
                }
            })         
        }

        else
        {
        parentDiv.querySelector(".btnupv").innerText=parseInt(upv.innerText)+1;
        parentDiv.querySelector(".bttn1").classList.add("bttn4");

        auth.onAuthStateChanged(user => {
            var userL=firebase.auth().currentUser.uid;
            if (user) {
              
                   
                fs.collection("petitions").doc(id5).collection("likes").doc(userL).set({
                  userLi: userL,
                }).then(() => {
                   console.log('likeduser uid added');
                }).catch(err => {
                    console.log(err.message);
                })
            }
        })
        }
       

       
           
            let id3 = e.target.parentElement.parentElement.getAttribute('data-id');
            var docRef = fs.collection("petitions").doc(id3);
            docRef.get().then((doc) => {
           
            var name1=doc.data().uname;
            var dept1=parseInt(doc.data().dept);
            var petis1=doc.data().petis;
    
            var upvotes1=doc.data().upvote;
            var emailcnt=doc.data().emailct;
            if(emailcnt==0&&upvotes1>=5)
            {
            Email.send({
                Host: "smtp.gmail.com",
                Username: "petism27@gmail.com",
                Password: "asdfgh27#",
                To: deptmailid[dept1],
                From: "petism27@gmail.com",
                Subject: "Alert for an important issue",
                Body: "Respected Sir/Ma'am, A petition has been posted on PetISM by "+name1+", which reads as: "+"\""+petis1+"\""+". It is kindly requested to look into the matter as soon as possible.",
              })
                .then(function (message) {
                  console.log("mail sent successfully");
                });
                docRef.update(
                    {
                        emailct:1,
                    }
                )
            }
            })
    
      

    })

    dv.addEventListener('click', e=> {
         
        let id2 = e.target.parentElement.parentElement.getAttribute('data-id');
        var dpref = fs.collection("petitions").doc(id2);

        if(  parentDiv.querySelector(".bttn2").classList.contains("bttn5"))
        {
            dpref.update({
                downvote: firebase.firestore.FieldValue.increment(-1)
            });

            parentDiv.querySelector(".btndpv").innerText=parseInt(dpv.innerText)-1;
            parentDiv.querySelector(".bttn2").classList.remove("bttn5");

            auth.onAuthStateChanged(user => {
                var userk2=firebase.auth().currentUser.uid;
                if (user) {
                  
                       
                    fs.collection("petitions").doc(id2).collection("dislikes").doc(userk2).delete().then(() => {
                        console.log("Document successfully deleted!");
                    }).catch((error) => {
                        console.error("Error removing document: ", error);
                    });
                }
            })         

        }
        else{
        dpref.update({
            downvote: firebase.firestore.FieldValue.increment(1)
        });

        parentDiv.querySelector(".btndpv").innerText=parseInt(dpv.innerText)+1;
        parentDiv.querySelector(".bttn2").classList.add("bttn5");

        auth.onAuthStateChanged(user => {
            var userL2=firebase.auth().currentUser.uid;
            if (user) {
              
                   
                fs.collection("petitions").doc(id2).collection("dislikes").doc(userL2).set({
                  userLi2: userL2,
                }).then(() => {
                   console.log('dislikeduser uid added');
                }).catch(err => {
                    console.log(err.message);
                })
            }
        })
    }
      
        
        
    })

})
}

