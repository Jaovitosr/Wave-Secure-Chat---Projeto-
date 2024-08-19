import consumer from "channels/consumer"

import {encryptMessage, decryptMessage, generateRsaKey, importPrivateKey, importPublicKey, exportPublicKey} from "../crypto_keys";

const roomChannel = consumer.subscriptions.create("RoomsChannel", {
  async connected() {
    // Called when the subscription is ready for use on the server
    console.log("Room connected")

    this.keyPair = await generateRsaKey();
    this.publicKey = await exportPublicKey(this.keyPair.publicKey);
    this.privateKey = this.keyPair.privateKey;

    initFormHandler.call(this);
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
  },

  async received(data) {
    // Called when there's incoming data on the websocket for this channel
    console.log(data)
    message = JSON.parte(data.message)
    decryptMessage(message, this.privateKey).then((decryptedMessage) => {
      const messageContainer = document.getElementById('messages');
      messageContainer.innerHTML += `<p><strong>${data.username}:</strong> ${decryptedMessage}</p>`;
    })
  },

  sendMessage(message){
    this.perform('send_message', {message: message.message, user: message.user, room: message.room });
  }

});

function initFormHandler(){
  const form = document.querySelector('.msg-form form');
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const textField = document.querySelector('#chat-text');
    const originalMessage = textField.value;

    const recipientPublicKey = await importPublicKey(this.publicKey);
    const encryptedMessage = await encryptMessage(originalMessage, recipientPublicKey);

    const user = document.querySelector('#user-id')
    const room = document.querySelector('#room-id')

    roomChannel.sendMessage({'message':encryptedMessage,"user":user,"room":room})

    textField.value = '';

  })
}