const happyMining = {};


  // Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBEgGC7NMrHFFYM29L_bSvfk6DHx-N1GtM",
    authDomain: "mining-2c1b0.firebaseapp.com",
    databaseURL: "https://mining-2c1b0.firebaseio.com",
    projectId: "mining-2c1b0",
    storageBucket: "mining-2c1b0.appspot.com",
    messagingSenderId: "1076022333238",
    appId: "1:1076022333238:web:37417b60e4761906cc6d97"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const dbRef = firebase.database().ref();

// using const firebaseObj = firebase.database().ref('Resource').push(1); to register a firebase key

//currency
const userGold = `-MEpA3ftZG4uG-GCRQme`;
const userCrystal = `-MEpAHEthlxinQSjEBsC`;

//storage
const userStorageGold = `-MEpIbZ5KadbTyGM2_bt`;
const userStorageCrystal = `-MEpIcsCfJYZShxUBu9h`;


//income per minute
const userBaseInGold = `-MEpKLEHrc6hEpvQ8t8b`;
const userBaseInCrystal = `-MEpKLQuvAZ0XNummR-T`;
const userGoldMine = `-MEpLKLVtBotbrtkvcx7`;
const userCrystalMine = `-MEpLKQHjfbAuMYL-Eqd`;


happyMining.gold = function () {
    dbRef.once('value', (data) => {
        if (data.val().Resource[userGold] < data.val().Storage[userStorageGold]){
            //Unit in second
            const autoSourceG = data.val().Resource[userGold] + (data.val().Income[userBaseInGold] / 60);
            $(`.currentGold`).html(`Gold: ${Math.round(autoSourceG)}`);
            return firebase.database().ref(`Resource/${userGold}`).set(autoSourceG);
        } else if (data.val().Resource[userGold] + (data.val().Income[userBaseInGold] / 60) >= data.val().Storage[userStorageGold]){
            const autoSourceG = data.val().Storage[userStorageGold];
            $(`.currentGold`).html(`Gold: ${autoSourceG}`);
            return firebase.database().ref(`Resource/${userGold}`).set(autoSourceG);
        }
    });
}

happyMining.crystal = function () {
    dbRef.once('value', (data) => {
        if (data.val().Resource[userCrystal] < data.val().Storage[userStorageCrystal]){
            //Unit in second
            const autoSourceG = data.val().Resource[userCrystal] + (data.val().Income[userBaseInCrystal] / 60);
            $(`.currentCrystal`).html(`Crystal: ${Math.round(autoSourceG)}`);
            return firebase.database().ref(`Resource/${userCrystal}`).set(autoSourceG);
        } else if (data.val().Resource[userCrystal] + (data.val().Income[userBaseInCrystal] / 60) >= data.val().Storage[userStorageCrystal]){
            const autoSourceG = data.val().Storage[userStorageCrystal];
            $(`.currentCrystal`).html(`Crystal: ${autoSourceG}`);
            return firebase.database().ref(`Resource/${userCrystal}`).set(autoSourceG);
        }
    });
}

// Clock
happyMining.clock = function () {
    let dateVar = new Date();
	let time = dateVar.toLocaleTimeString();
	$('.clock').html(`${time}`);
}



// Start game
happyMining.title = function () {
    $('.mainBgm').hide();
    $('.beginBtn').click(function(){
        $('.headerBgm').hide();
        $('.mainBgm').show();
    })
}

happyMining.init = () => {
    setInterval(happyMining.clock, 1000);
    setInterval(happyMining.gold, 1000);
    setInterval(happyMining.crystal, 1000);
    happyMining.gold();
    happyMining.crystal();
}

$(document).ready(happyMining.init());