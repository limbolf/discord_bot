// * Prérequis d'importations
const fs = require("node:fs");
const path = require("node:path");
const {
  Client,
  Events,
  GatewayIntentBits,
  resolveBuilder,
  Collection,
} = require("discord.js");
const { BOT_TOKEN } = require("./.env");
require("dotenv").config();
// * On créer la nouvelle instance du bot
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Bot lancé en tant que : ${readyClient.user.tag} `);
});

client.login(process.env.BOT_TOKEN);
client.commands = new Collection();

const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ("data" in command && "execute" in command) {
      client.commands.set(command.data.name, command);
    } else {
      console.log(
        '[WARNING] The comand at ${filePath} is missing a required "data" of "execute" property.',
      );
    }
  }
}
client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    console.error("No command matching ${interaction.commandName} was found");
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: "An error occured while executing the command !",
        flags: MessageFlags.Ephemeral,
      });
    } else {
      await interaction.reply({
        content: "An error occured while executing the command !",
        flags: MessageFlags.Ephemeral,
      });
    }
  }
  console.log(interaction);
});
