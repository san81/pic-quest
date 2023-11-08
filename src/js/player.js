var placeholder = 'ANON_' + pubnub.getUUID().substring(0, 4)
var username = placeholder
setText(username)
function registerPlayer() {
    username = document.getElementById('nameInput').value
    if (username.length <= 0) {
        username = placeholder
    }
    setText(username)
    publishMessage('player-join', username)
}

function pressTheBuzzer() {
    var buttonEle = document.getElementById("play_pause_button");
    buttonEle.classList.toggle('active');
    publishMessage('pause', username)
}

function setText (txt) {
    pubnub.setState({
      channels: [pubnub_channel],
      state: {
        txt: txt
      }
    })
  }