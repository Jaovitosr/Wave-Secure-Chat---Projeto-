// const {subtle} = globalThis.crypto;
// const {subtle} = globalThis.crypto;

// import {TextDecoder, TextEncoder} from 'util'

async function generateRsaKey() {
  const keyPair = await window.crypto.subtle.generateKey({
    name: 'RSA-OAEP',
    modulusLength: 2048,
    publicExponent: new Uint8Array([1, 0, 1]),
    hash: 'SHA-256',
  }, true, ['encrypt','decrypt']);

  return keyPair
}

async function exportPublicKey(publicKey) {
    return await window.crypto.subtle.exportKey("spki", publicKey);
}
async function importPublicKey(spki) {
    const publicKey = await window.crypto.subtle.importKey("spki", spki, {
        name: "RSA-OAEP",
        hash: "SHA-256",
    }, true, ["encrypt"]);
    return publicKey;
}

async function importPrivateKey(pkcs8) {
    const privateKey = await window.crypto.subtle.importKey("pkcs8", pkcs8, {
        name: "RSA-OAEP",
        hash: "SHA-256",
    }, true, ["decrypt"]);
    return privateKey
}

async function encryptMessage(message, publicKey) {
    const encodedMessage = new TextEncoder().encode(message);
    const encryptedMessage = await window.crypto.subtle.encrypt({
        name: 'RSA-OAEP'
    }, publicKey, encodedMessage); 
    return encryptedMessage;
}

async function decryptMessage(encryptedMessage, privateKey) {
    const decryptedMessage = await window.crypto.subtle.decrypt({
        name: 'RSA-OAEP'
    }, privateKey, encryptedMessage);
    const decodedMessage = new TextDecoder().decode(decryptedMessage);
    return decodedMessage;
}


export {encryptMessage, decryptMessage, generateRsaKey, importPrivateKey, importPublicKey, exportPublicKey};