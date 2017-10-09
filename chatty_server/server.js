
const express      = require('express');
const SocketServer = require('ws').Server;
const uuid         = require('uuid/v4');
var randomColor    = require('randomcolor');

// Set the port to 3001, main server.js is running on 3000
const PORT = 3001;
// Create a new express server that is needed to run as websocket server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(
    PORT, '0.0.0.0', 'localhost', () =>
    console.log(`Listening on ${ PORT }`)
  );

// Create the WebSockets server
const wss = new SocketServer({ server });
//An array hold clients ids and color
let connections = [];

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  //assigned socket with id using the function uuid
  ws.id = uuid()

  console.log(`Client ${ws.id} connected`);
  //needs (user's id and connected) to broadcast the number of users
  broadcastNumUsers(ws.id, true);

  //braodcast back recieved messages to all clients
  ws.on('message', (message) => {
    broadcastBackMessages(ws.id, message)
  });

  // Set up a callback for when a client closes the socket.
  //This usually means they closed their browser.
  ws.on('close', () => {
    console.log(`Client ${ws.id} disconnected`)
    broadcastNumUsers(ws.id, false)
  });
});

//a function to broadcast the number of users online (connected and disconnected)
function broadcastNumUsers(id, connected){
  if (connected){
    connections.push({id: id, color: randomColor()})
  } else {
    //if disconnected connections is an array that use findIndex to return me the index that contain both id and color
    let index = connections.findIndex((connection)=>{
      return connection.id === id
    })
    //remove 1 element from the array starting from index defined above
    connections.splice(index, 1)
  };
  // Broadcast the number of online userMessage
  let message = {
    type: 'onlineUserCount',
    count: connections.length
  };
  wss.broadcast(JSON.stringify(message));
};

//messages from USERS --> handling these message to the server
  //1. assign ID receivedMessage of the connected user and a 2. COLOR on the connections
function broadcastBackMessages(id, message){

//receivedMessage from SERVER END, server only read PARSED message
  let receivedMessage = JSON.parse(message);

  receivedMessage.id = uuid();
  //all the connected users, find the one
  let index = connections.findIndex((connection)=>{
    return connection.id === id
  })

  receivedMessage.color = connections[index].color

  wss.broadcast(JSON.stringify(receivedMessage));
};

//broadcast goes through each users and sends message, needs to define the function to be used
//this function is used when you need to broadcast a message(data) from EACH CLIENT from the SERVER
wss.broadcast = function(data){
//from socketserver clients, for each of the CLIENT
  wss.clients.forEach((client) => {
    client.send(data);
  });
}
