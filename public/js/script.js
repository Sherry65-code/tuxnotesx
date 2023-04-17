var db;
window.addEventListener('DOMContentLoaded',()=>{
    db = firebase.firestore();
    var test = db.collection('general');
try {
    test.doc(`${localStorage.getItem('email')}`).get()
    .then((cred)=>{
        if (cred.data().randid === localStorage.getItem('specialkey')) {
            sucess();
        }
        else {

        }
    }).catch((err)=>{
        console.log(err);
    })
}
catch (err) {
    console.log(err);
}
})
function createAccount() {
    document.getElementById('load').style.display = 'block';
    document.getElementById('submit').style.display = 'grid';
    if (document.getElementById('email').value == '') {
        alertme("Input email");
        document.getElementById('load').style.display = 'none';
        document.getElementById('submit').style.display = 'block';
    return;
    }
    else if (document.getElementById('password').value == '') {
        alertme("Input password");
        document.getElementById('load').style.display = 'none';
    document.getElementById('submit').style.display = 'block';
    return;
    }
    const general = db.collection("general");
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    general.doc(email).get().then((doc)=>{
        if (doc.exists) {
            if (doc.data().password === password) {
                var randid = doc.data().randid;
                localStorage.setItem('email',`${email}`);
                localStorage.setItem('specialkey',`${randid}`);
                sucess();
                document.getElementById('load').style.display = 'none';
                document.getElementById('submit').style.display = 'block';            
                return;
            }
            else {
                wrongpass();
                document.getElementById('load').style.display = 'none';
                document.getElementById('submit').style.display = 'block';            
                return;
            }
        } 
        else {
            const randid = generateString(20);
        general.doc(email).set({
            password: `${password}`,
            randid: `${randid}`
        })
        localStorage.setItem('email',`${email}`);
        localStorage.setItem('specialkey',`${randid}`);
        document.getElementById('load').style.display = 'none';
        document.getElementById('submit').style.display = 'block';
    
    }
    })
}
function sucess() {
    alertme("Logged In");
    hideout('login');
}
function wrongpass() {
    alertme("The Password you provided is wrong!");
}
const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function generateString(length) {
    let result = ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}
function hideout(componentid) {
    document.getElementById(componentid).style.display = 'none';
}
function alertme(what) {
    document.getElementById('alert').innerHTML = what;
    document.getElementById('alert').style.transform = "translateY(0)";
    setTimeout(alertpull, 2000);
}
function alertpull() {
    document.getElementById('alert').style.transform = "translateY(-100vh)";
}
function back() {
        document.getElementById('login').style.backgroundImage = "url('https://source.unsplash.com/random/1920x1080/?space')";
}
window.addEventListener('load',back);
