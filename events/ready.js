const { Events } = require("discord.js");

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    console.log(`Launched and logged as ${client.user.tag}`);
  },
};
