var users = {} //Houses the users connected to app.

function countdown(start, end) {
    countDownTimer = setInterval(function() {
     if (start < end) {
       clearInterval(countDownTimer);
     } else {
       start--;
       document.getElementById("countdown").innerHTML = start/10;
     }
   }, 10);
 }

 function updateStatusMsg(uuid, state){
  var statusDiv = document.getElementById("status-message");
  statusDiv.innerHTML = users[uuid]+" pressed the buzzer";
 }

function playPause(){
    var buttonEle = document.getElementById("play_pause_button");
    buttonEle.classList.toggle('active');
    var imgDiv = document.getElementById("img-displayed");
    if (imgDiv.style.animationPlayState === "paused") {
        imgDiv.style.animationPlayState = "running";
        var counter = document.getElementById("countdown").textContent;
        countdown(counter*10, 1);
    } else {
        imgDiv.style.animationPlayState = "paused";
        clearTimeout(countDownTimer);
    }
}


async function updateUser(uuid, state) {
  if (!users[uuid]) {
    // Add new user div
    var message = document.createElement('div');
    message.id = uuid;
    message.innerText = state;
    document.getElementById('users').appendChild(message);
  }else {
    //update user
    var message = document.getElementById(uuid);
    message.innerText = state;
  }
  users[uuid] = state;
}

function onPageLoad(){
  document.getElementById("img-displayed").style.animationPlayState = "paused";
  setupPubNub();
    
}