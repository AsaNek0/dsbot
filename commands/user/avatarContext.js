const { ContextMenuCommandBuilder, ApplicationCommandType, EmbedBuilder} = require("discord.js");

module.exports = {
  data: new ContextMenuCommandBuilder()
    .setName("Avatar")
    .setType(ApplicationCommandType.User),

  async execute(interaction) {

    let user = interaction.options.getUser('user') || interaction.user;
    let userAvatar = user.displayAvatarURL({ dinamic: true, size: 4096 })

    const embed = new EmbedBuilder()
        .setColor(0x74c7ec)
        .setAuthor({ name: `Аватар пользователя: ${user.username} ` , url: userAvatar, })
        .setFooter({text: `Вызвал: ${interaction.user.username}`,
                    iconURL: interaction.user.displayAvatarURL({ ditamic: true, size: 4096 })})
        .setTimestamp()
        .setImage(`${userAvatar}`);


    await interaction.reply({
      embeds: [embed],
    });
  },
};
