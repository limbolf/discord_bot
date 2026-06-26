// * Prérequis d'importations

const { Client, Events, GatewayIntentBits } = require("discord.js");
const { BOT_TOKEN } = require("./.env");
require("dotenv").config();
// * On créer la nouvelle instance du bot
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Bot lancé en tant que : ${readyClient.user.tag} `);
});

client.login(process.env.BOT_TOKEN);
