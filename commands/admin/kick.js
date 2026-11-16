const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Kick un utilisateur du serveur")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("Le membre à expulser")
        .setRequired(true),
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("La raison de l'expulsion")
        .setRequired(false),
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),

  async execute(interaction) {
    const member = interaction.options.getMember("target");
    const reason =
      interaction.options.getString("reason") ?? "Aucune raison fournie";

    if (!member) {
      return interaction.reply({
        content: "Impossible de trouver ce membre sur le serveur.",
        flags: 64, // Ephemeral (visible uniquement par l'admin)
      });
    }

    if (!member.kickable) {
      return interaction.reply({
        content:
          "Je n'ai pas les permissions nécessaires pour expulser ce membre.",
        flags: 64,
      });
    }

    // Expulsion du membre
    await member.kick(reason);

    // *Verification:* Le message s'affiche dans le salon pour notifier tout le monde
    await interaction.reply({
      content: `🚪 **${member.user.tag}** a été expulsé du serveur par ${interaction.user} !\n**Raison :** ${reason}, dehors salope !`,
    });
  },
};
