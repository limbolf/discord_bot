const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rpc")
    .setDescription("Joue à pierre feuille ciseaux contre le bot")
    .addStringOption((option) =>
      option
        .setName("choix")
        .setDescription("Choisis ton signe")
        .setRequired(true)
        .addChoices(
          { name: "Pierre", value: "pierre" },
          { name: "Feuille", value: "feuille" },
          { name: "Ciseaux", value: "ciseaux" },
        ),
    ),

  async execute(interaction) {
    // ? Récupération du choix du joueur
    const userChoice = interaction.options.getString("choix");

    // ? Choix aléatoire du bot
    const choices = ["pierre", "feuille", "ciseaux"];
    const botChoice = choices[Math.floor(Math.random() * choices.length)];

    try {
      if (botChoice === userChoice) {
        await interaction.reply({
          content: `Égalité ! J'avais aussi choisi **${botChoice}**.`,
        });
      } else if (botChoice === "pierre" && userChoice === "ciseaux") {
        await interaction.reply({
          content: `J'ai joué **${botChoice}**... J'ai gagné !`,
        });
      } else if (botChoice === "feuille" && userChoice === "ciseaux") {
        await interaction.reply({
          content: `J'ai joué **${botChoice}**... Tu as gagné.`,
        });
      } else if (botChoice === "feuille" && userChoice === "pierre") {
        await interaction.reply({
          content: `J'ai joué **${botChoice}**... Couvre ton seum, j'ai gagné !`,
        });
      } else if (botChoice === "pierre" && userChoice === "feuille") {
        await interaction.reply({
          content: `J'ai joué **${botChoice}**... J'ai perdu, mais c'est que de la chance.`,
        });
      } else if (botChoice === "ciseaux" && userChoice === "feuille") {
        await interaction.reply({
          content: `J'ai joué **${botChoice}**... J'ai gagné !`,
        });
      } else if (botChoice === "ciseaux" && userChoice === "pierre") {
        await interaction.reply({
          content: `J'ai perdu cette fois malheureusement, j'ai choisi **${botChoice}**.`,
        });
      }
    } catch (error) {
      console.error(error);
    }
  },
};
