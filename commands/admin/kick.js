const { EmbedBuilder, SlashCommandBuilder, PermissionFlagsBits, GuildMember, } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Исключает пользователя с сервера.')
        .addUserOption((option) =>
          option
            .setName('user')
            .setDescription('Пользователь')
            .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),

        async execute (interaction) {

            const user = interaction.options.getUser('user');
            const member = await interaction.guild.members.fetch(user.id);
            console.log(
                GuildMember,
                user.username);
            
            const embedErr = new EmbedBuilder()
                .setColor(Red)
                .setDescription(`Невозможно исключить ${user.username}: пользователь имеет роль выше вашей.`)
                .setFooter({text: `Вызвал: ${interaction.user.username}`,
                            iconURL: interaction.user.displayAvatarURL({ ditamic: true, size: 4096 })})
                .setTimestamp()

            
            if ( member.roles.highest.position >= interaction.member.roles.highest.position )
                return interaction.reply({
                    embeds: [embedErr],
                    ephemeral: true
                });
            
            await member.kick()

            await interaction.reply({ content: `${user.username}: был исключён` , ephemeral: true });
    },
};