//an array to fetch the authority name by their index
var depart=["None","Academics","Sports","Library","Hostel","Mess"];

const petti = document.getElementById('peti-container');

//an array to store the respective email ids of the authorities
// password of every id is asdfgh27#
var deptmailid=["iitismdefault27@gmail.com","iitismacademics27@gmail.com","iitismsports27@gmail.com","iitismlibrary27@gmail.com","iitismhostel27@gmail.com","iitismmess27@gmail.com"];

function renderData(individualDoc) {

    let parentDiv = document.createElement("div");
    parentDiv.className = "container peti-box";
    parentDiv.setAttribute('data-id', individualDoc.id);

    //getting the name of the person who created petition
    let yname = document.createElement("div");
    yname.className="yesname yestag";
    yname.textContent = individualDoc.data().uname;

    //getting the authority that he/she had tagged
    let der=document.createElement("div");
   var de=parseInt(individualDoc.data().dept);
   der.className="yestag yestag2";
    der.textContent="#"+depart[de];

    //getting the time at which he/she posted
  let tim= document.createElement("div");
   var tym=individualDoc.data().times;
   var dater=new Date(tym); 
   tim.innerHTML="Posted on "+dater.getDate()+
   "/"+(dater.getMonth()+1)+
   "/"+dater.getFullYear()+
   " at "+dater.getHours()+
   ":"+dater.getMinutes()+
   ":"+dater.getSeconds();
    

   //getting the petition text content
    let petDiv = document.createElement("div");
    petDiv.textContent = individualDoc.data().petis;
    petDiv.className="yespet";


    //getting upvotes count on that petition
    let upv= document.createElement("div");
    upv.className="bttn btnupv bttnx";
    var upt=individualDoc.data().upvote;
    upv.innerText=upt;

   //getting downvotes count on that petition
    let dpv= document.createElement("div");
    dpv.className="bttn btndpv bttnx";
    var dpt=individualDoc.data().downvote;
    dpv.innerText=dpt;
   
    //button to upvote
    let ub=document.createElement("button");
    ub.className="bttn btncl bttnx";
   

    //button to downvote
    let dv= document.createElement("button");
    dv.className="bttn bttnx";


    //checking if the user who is currently logged in has liked the post or not
    //then assigning corresponding classname for button states active/inactive
    let j=document.createElement("i");
    var userlol=firebase.auth().currentUser.uid;
    var docRef =fs.collection("petitions").doc(individualDoc.id).collection("likes").doc(userlol)
    docRef.get().then((doc) => {
        if (doc.exists) {
            j.className="fa fa-thumbs-up bttn1 bttn4";
        } else {
            j.className="fa fa-thumbs-up bttn1";
        }
    })
    
   //checking if the user who is currently logged in has disliked the post or not
   //then assigning corresponding classname for button states active/inactive
    let k=document.createElement("i");
    var docRef2 =fs.collection("petitions").doc(individualDoc.id).collection("dislikes").doc(userlol)
    docRef2.get().then((doc) => {
        if (doc.exists) {
            k.className="fa fa-thumbs-down bttn2 bttn5";
        } else {
            k.className="fa fa-thumbs-down bttn2";
        }
    })
    
    //getting url of current page
    var urlt=window.location.href;
   
    //trimming url and adding filename of shared post page
    //also adding doc id for creating unique link to every petition
    urlt=urlt.substring(0,urlt.length-13)+"shared.html%23"+individualDoc.id;

    //making share links for respective social medias
    var tweet="https://twitter.com/share?url="+urlt;
    var wa="https://web.whatsapp.com/send?text="+urlt;
    var tele="https://telegram.me/share/url?url="+urlt;
   



    //making a div for share feature
   let share=document.createElement("div");
    share.className=" wrapper bttnx";

//this is a long line which has inner html for dropdown menu having buttons for social medias
 share.innerHTML='<ul><li>share <i class="fa fa-share" aria-hidden="true"></i><ul><li ><a href='+tweet+'><button class="fb" ><i class="fa fa-twitter" aria-hidden="true"></i> Twitter</button></a></li><li ><a href='+wa+'><button class="fb" ><i class="fa fa-whatsapp" aria-hidden="true"></i> WhatsApp</button></a></li><li ><a href='+tele+'><button class="fb" ><i class="fa fa-telegram" aria-hidden="true"></i> Telegram</button></a></li></ul></li></ul>';
   
 
 
//appending all the contents and placing them inside a container
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
    parentDiv.appendChild(share);


   //displaying all the petitions
    petti.insertBefore(parentDiv,petti.childNodes[0]);

   

    /*on clicking like button like count is updated on firebase database
    if the it is already liked then like count is reduced by one and button state is also changed to inactive
    by changing class bttn4*/
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
                  
                       //deleting uid of user on reversing the liked state
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

        var dpref1 = fs.collection("petitions").doc(id5);
        if(  parentDiv.querySelector(".bttn2").classList.contains("bttn5"))
        {
            dpref1.update({
                downvote: firebase.firestore.FieldValue.increment(-1)
            });

            parentDiv.querySelector(".btndpv").innerText=parseInt(dpv.innerText)-1;
            parentDiv.querySelector(".bttn2").classList.remove("bttn5");

            auth.onAuthStateChanged(user => {
                var userk21=firebase.auth().currentUser.uid;
                if (user) {
                  
                      //deleting the stored uid of user on reversing the disliked state 
                    fs.collection("petitions").doc(id5).collection("dislikes").doc(userk21).delete().then(() => {
                        console.log("Document successfully deleted!");
                    }).catch((error) => {
                        console.error("Error removing document: ", error);
                    });
                }
            })         

        }
        auth.onAuthStateChanged(user => {
            var userL=firebase.auth().currentUser.uid;
            if (user) {
              
                  //adding uid of user who liked the post 
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
            if(emailcnt==0&&upvotes1>=5) //checkng if likes count crossed limit of 5
            {
           //sending email 
            Email.send({
                Host: "smtp.gmail.com",
                Username: "petism27@gmail.com",
                Password: "asdfgh27#",
                To: deptmailid[dept1], //fetching email of respective authority
                From: "petism27@gmail.com",
                Subject: "Alert for an important issue",
                Body: "Respected Sir/Ma'am, A petition has been posted on PetISM by "+name1+", which reads as: "+"\""+petis1+"\""+". It is kindly requested to look into the matter as soon as possible.",
              })
                .then(function (message) {
                  console.log("mail sent successfully");
                });
                docRef.update(
                    {
                        emailct:1, //updating email count to 1 so that emails are not sent repeatedly
                    }
                )
            }
        })
        
      

    })

    //doing similar stuffs for downvote too as that for upvotes
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
                  
                      //deleting the stored uid of user on reversing the disliked state 
                    fs.collection("petitions").doc(id2).collection("dislikes").doc(userk2).delete().then(() => {
                        console.log("Document successfully deleted!");
                    }).catch((error) => {
                        console.error("Error removing document: ", error);
                    });
                }
            })         

        }
        else{
            var upref11 = fs.collection("petitions").doc(id2);
            if(  parentDiv.querySelector(".bttn1").classList.contains("bttn4"))
            {
                upref11.update({
                    upvote: firebase.firestore.FieldValue.increment(-1)
                });
                parentDiv.querySelector(".btnupv").innerText=parseInt(upv.innerText)-1;
                parentDiv.querySelector(".bttn1").classList.remove("bttn4");
    
                auth.onAuthStateChanged(user => {
                    var userk123=firebase.auth().currentUser.uid;
                    if (user) {
                      
                           //deleting uid of user on reversing the liked state
                        fs.collection("petitions").doc(id2).collection("likes").doc(userk123).delete().then(() => {
                            console.log("Document successfully deleted!");
                        }).catch((error) => {
                            console.error("Error removing document: ", error);
                        });
                    }
                })         
            }
        dpref.update({
            downvote: firebase.firestore.FieldValue.increment(1)
        });

        parentDiv.querySelector(".btndpv").innerText=parseInt(dpv.innerText)+1;
        parentDiv.querySelector(".bttn2").classList.add("bttn5");

        auth.onAuthStateChanged(user => {
            var userL2=firebase.auth().currentUser.uid;
            if (user) {
              
                  // adding uid of user who disliked the post 
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
}

//fetching contents of petition form
const form = document.getElementById('form');

form.addEventListener('submit', e => {
    e.preventDefault();
    const petis = form['exampleFormControlTextarea1'].value;
    if(petis.trim()=="")
    {
        alert("Please Fill Something");
        form.reset();
    }
    else
    {
    const dept = form['deprt'].value;
    let date = new Date();
    let time = date.getTime();
    let counter = time;
    let id =counter;
    form.reset();
    
    auth.onAuthStateChanged(user => {
        var userI=firebase.auth().currentUser.uid;
        if (user) {
            db.ref('Users/'+userI).once('value').then(function(snapshot){
                var fname=(snapshot.val() && snapshot.val().Username);
                var ad=(snapshot.val() && snapshot.val().admissionno);

            //setting values of different parameters to be displayed on petition 
            fs.collection("petitions").doc('_' + id).set({
                id: '_' + id,
                petis,
                upvote: 0,
                downvote: 0,
                uname: fname,
                admno: ad,
                times: time,
                dept: dept,
                emailct:0,
            })}).then(() => {
               console.log('petis added');
            }).catch(err => {
                console.log(err.message);
            })

            fs.collection("petitions").doc('_' + id).collection("owner").doc(userI).set({
                uidowner: userI,
            })
            fs.collection("petitions").doc('_' + id).collection("likes").doc("none").set({
                userLi: "none" ,
            })
            fs.collection("petitions").doc('_' + id).collection("dislikes").doc("none").set({
                userLi2: "none" ,
            })


        }
    })
    sideNav1.style.left = "-350px";
}
})

//realtime listeners for updating content on home page as soon as any petition is added or deleted
//changes are made instantly
auth.onAuthStateChanged(user => {
    if (user) {
        fs.collection("petitions").onSnapshot((snapshot) => {
            let changes = snapshot.docChanges();
            changes.forEach(change => {
                if (change.type == "added") {
                    renderData(change.doc);
                }
               else if (change.type == 'removed') {
                   let li =petti.querySelector('[data-id=' + change.doc.id + ']');
                    petti.removeChild(li);
                }
            })
        })
    }
}) 
var filt=document.getElementById('filt');
filt.addEventListener('keyup', searchin);
function searchin(e)
{
    var val=e.target.value.toUpperCase();
    var naam=petti.getElementsByClassName('container peti-box');
    Array.from(naam).forEach(function(item){
        var itemName = item.firstChild.textContent;
        if(itemName.toUpperCase().indexOf(val) != -1){
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
}