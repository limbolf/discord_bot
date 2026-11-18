const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  MessageFlags,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("dmto")
    .setDescription("Envoie un message privé à un utilisateur")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("L'utilisateur à qui envoyer le message")
        .setRequired(true),
    )
    .addStringOption((option) =>
      option
        .setName("message")
        .setDescription("Le contenu du message")
        .setRequired(true),
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    const targetUser = interaction.options.getUser("target");
    const messageContent = interaction.options.getString("message");

    try {
      await targetUser.send(`${messageContent}`);

      await interaction.reply({
        content: `Le message privé a bien été envoyé à ${targetUser.tag} !`,
        flags: MessageFlags.Ephemeral,
      });
    } catch (error) {
      console.error(error);

      await interaction.reply({
        content: `Impossible d'envoyer un message privé à ${targetUser.tag}. L'utilisateur a probablement bloqué ses MP ou n'accepte pas les messages des membres de ce serveur.`,
        flags: MessageFlags.Ephemeral,
      });
    }
  },
};
