const PUBLISH_KEY = 'pub-c-0bbabc39-0ac0-45b2-9255-ffeb2e0baf6f'
const SUBSCRIBE_KEY = 'sub-c-66a947cb-606a-4849-9425-4fe249a6464c'
let pubnub_channel = "guessing_game"
const UUID = '' + self.crypto.getRandomValues(new Uint32Array(1));
var token = null;
// PubNub Connection Object.
var pubnub = new PubNub({
  publishKey: PUBLISH_KEY,
  subscribeKey: SUBSCRIBE_KEY,
  uuid: UUID,
  presenceTimeout: 20
});

const setupPubNub = () => {
    console.log("in setup pubnub");
    // add listener
    const listener = {
        status: (statusEvent) => {
            if (statusEvent.category === "PNConnectedCategory") {
                console.log("Connected");
            }
        },
        message: (messageEvent) => {
            var m = messageEvent.message;
            if(messageEvent.message.uuid == UUID) {
                //ignore self received messages
                return;
            }
            console.log(messageEvent);
            switch (m.action) {
                case 'player-join':
                case 'update-player-name':
                    if(updateUser!=undefined) {
                        updateUser(m.uuid, m.description)
                    }
                  break
                case 'pause':
                    updateStatusMsg(m.uuid, m.description);
                    playPause();
                    break
                case 'leave':
                case 'timeout':
                  removeUser(m.uuid, m.state)
                  break
                default:
                  break
              }
        },
        presence: (presenceEvent) => {
            // handle presence
        }
    };
    pubnub.addListener(listener);

    // subscribe to a channel
    pubnub.subscribe({
        channels: [pubnub_channel]
    });
}; 

const publishMessage = async (action, message) => {
    // With the right payload, you can publish a message, add a reaction to a message,
    // send a push notification, or send a small payload called a signal.
    console.log(message);
    const publishPayload = {
        channel : pubnub_channel,
        message: {
            action: action,
            uuid: UUID,
            title: "greeting",
            description: message
        }
    };
    await pubnub.publish(publishPayload);
}
