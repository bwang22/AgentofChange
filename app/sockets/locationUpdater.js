var profileService = require("../mongoose/services/profileService.js");
const logger = require("../logger.js");
var WebSocket = require('ws');

function setup(socket) {
    socket.on("connection", function(ws) {
        ws.on("message", async function(msg) {
            var data = JSON.parse(msg);
            try {
                await profileService.updateLoc(data.id, data.loc);

                // send notification to other clients that this user's location changed
                socket.clients.forEach(client => {
                    if (client !== ws && client.readyState === WebSocket.OPEN)
                        client.send(msg);
                });
            } catch (err) {}
        });
        
        ws.send("OK");
    });
}

module.exports = { setup };