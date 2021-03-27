
const petti = document.getElementById('peti-container');
function renderData(individualDoc) {

    let parentDiv = document.createElement("div");
    parentDiv.className = "container peti-box";
    parentDiv.setAttribute('data-id', individualDoc.id);

    let yname = document.createElement("div");
    yname.className="yesname";
    yname.textContent = individualDoc.data().uname;

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

    let upv= document.createElement("button");
    upv.className="bttn";
    
    let dv= document.createElement("button");
    dv.className="bttn";
let j=document.createElement("i");
j.className="fa fa-thumbs-o-up";
let k=document.createElement("i");
k.className="fa fa-thumbs-o-down";
   

    let trash = document.createElement("button");
    trash.className="bttn";
    let i = document.createElement("i");
    i.className = "fa fa-trash";

    trash.appendChild(i);
    parentDiv.appendChild(yname);
    parentDiv.appendChild(tim);
   

    parentDiv.appendChild(petDiv);
    upv.appendChild(j);
    dv.appendChild(k);
    parentDiv.appendChild(upv);
    parentDiv.appendChild(dv);
   
    parentDiv.appendChild(trash);

   
    petti.appendChild(parentDiv);

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