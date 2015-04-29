/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var wsUri = "ws://" + document.location.host + document.location.pathname + "echo";
var websocket = new WebSocket(wsUri);
var username;

websocket.onOpen=function(evt)(onOpen(evt));
websocket.onMessage=function(evt)(onMessage(evt));
websocket.onError=function(evt)(onError(evt));

var output = document.getElementById("output");

function join() {
    username = textField.value;
    websocket.send(username + "enlazado");
}

function send_message() {
    websocket.send(username + ":" + textField.value);
}

function onOpen() {
    writeToScreen("Conectado a " + wsUri);
}

function onMessage() {
    console.log("onMessage");
    writeToScreen("Recibido:" + evt.data);
    if (evt.data.indexOf("enlazado") !== -1) {
        userField.innerHTML += evt.data.substring(0, evt.data.indexOf("enlazado")) + "\n";
    } else {
        chatlogField.innerHTML += evt.data + "\n";
    }
}

function OnError(evt){
    writeToScreen('<span style="color:red;">ERROR:</span>' + evt.data);
}

function writeToScreen(message) {
    output.innerHTML += message + "<br>";
}



