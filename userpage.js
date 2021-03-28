var depart=["None","Academics","Sports","Library","Hostel","Mess"];
const petti = document.getElementById('peti-container');
var deptmailid=["iitismdefault27@gmail.com","iitismacademics27@gmail.com","iitismsports27@gmail.com","iitismlibrary27@gmail.com","iitismhostel27@gmail.com","iitismmess27@gmail.com"];
function renderData(individualDoc) {

    let parentDiv = document.createElement("div");
    parentDiv.className = "container peti-box";
    parentDiv.setAttribute('data-id', individualDoc.id);

    let yname = document.createElement("div");
    yname.className="yesname yestag";
    yname.textContent = individualDoc.data().uname;

    let der=document.createElement("div");
   var de=parseInt(individualDoc.data().dept);
   der.className="yestag yestag2";
    der.textContent="#"+depart[de];

  let tim= document.createElement("div");
 
   var tym=individualDoc.data().times;
   var dater=new Date(tym);
   
   tim.innerHTML="Posted on "+dater.getDate()+
   "/"+(dater.getMonth()+1)+
   "/"+dater.getFullYear()+
   " at "+dater.getHours()+
   ":"+dater.getMinutes()+
   ":"+dater.getSeconds();
    

    let petDiv = document.createElement("div");
    petDiv.textContent = individualDoc.data().petis;
    petDiv.className="yespet";

    let upv= document.createElement("div");
    upv.className="bttn btnupv";
    var upt=individualDoc.data().upvote;
    upv.innerText=upt;

   
    let dpv= document.createElement("div");
    dpv.className="bttn btndpv";
    var dpt=individualDoc.data().downvote;
    dpv.innerText=dpt;
   
    let ub=document.createElement("button");
    ub.className="bttn btncl";
   

    let dv= document.createElement("button");
    dv.className="bttn";
    let j=document.createElement("i");
    j.className="fa fa-thumbs-up bttn1";
    let k=document.createElement("i");
    k.className="fa fa-thumbs-down bttn2";
    let iup=document.createElement("input");
    iup.setAttribute("type", "number");
    iup.setAttribute("value",individualDoc.data().upvote );


    let trash = document.createElement("button");
    trash.className="bttn";
    let i = document.createElement("i");
    i.className = "fa fa-trash bttn3";
    
   
   ub.appendChild(j);
    trash.appendChild(i);
    parentDiv.appendChild(yname);
    parentDiv.appendChild(der);
    parentDiv.appendChild(tim);
   

    parentDiv.appendChild(petDiv);
   
    dv.appendChild(k);
    parentDiv.appendChild(upv);
    parentDiv.appendChild(ub);
    parentDiv.appendChild(dpv);
    parentDiv.appendChild(dv);
   
    parentDiv.appendChild(trash);

   
    petti.appendChild(parentDiv);


    ub.addEventListener('click', e=> {
        
       
       
        let id1 = e.target.parentElement.parentElement.getAttribute('data-id');
        var upref = fs.collection("petitions").doc(id1);

        
        upref.update({
            upvote: firebase.firestore.FieldValue.increment(1)
        });
        
        
    })
    ub.addEventListener('click', e=> {

        parentDiv.querySelector(".btnupv").innerText=parseInt(upv.innerText)+1;
       
       

        if(parseInt(upv.innerText)==5)
        {
            console.log("mail will be sent");
            let id3 = e.target.parentElement.parentElement.getAttribute('data-id');
            var docRef = fs.collection("petitions").doc(id3);
            docRef.get().then((doc) => {
           
            var name1=doc.data().uname;
            var dept1=parseInt(doc.data().dept);
            var petis1=doc.data().petis;
    
           
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
            })
        }
      

    })

    dv.addEventListener('click', e=> {
        
       
       
        let id2 = e.target.parentElement.parentElement.getAttribute('data-id');
        var dpref = fs.collection("petitions").doc(id2);

        
        dpref.update({
            downvote: firebase.firestore.FieldValue.increment(1)
        });
        
        
    })
    dv.addEventListener('click', e=> {

        parentDiv.querySelector(".btndpv").innerText=parseInt(dpv.innerText)+1;
      

    })

    trash.addEventListener('click', e => {
        let id = e.target.parentElement.parentElement.getAttribute('data-id');
        auth.onAuthStateChanged(user => {
            if (user) {
                fs.collection("petitions").doc(id).delete();
            }
        })
    })
}
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