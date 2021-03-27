const form = document.getElementById('form');

form.addEventListener('submit', e => {
    e.preventDefault();
    const petis = form['petis'].value;
    const dept = form['deprt'].value;
    let date = new Date();
let time = date.getTime();
let counter = time;
    let id = 1e14-counter;
    
    auth.onAuthStateChanged(user => {
        var userI=firebase.auth().currentUser.uid;
        if (user) {
            db.ref('Users/'+userI).once('value').then(function(snapshot){
                var fname=(snapshot.val() && snapshot.val().Username);
                var ad=(snapshot.val() && snapshot.val().admissionno);
               
            fs.collection("petitions").doc('_' + id).set({
                id: '_' + id,
                petis,
                upvote: 0,
                downvote: 0,
                uname: fname,
                admno: ad,
                times: time,
                dept: dept,
            })}).then(() => {
                console.log('petis added');
            }).catch(err => {
                console.log(err.message);
            })
        }
    })
})