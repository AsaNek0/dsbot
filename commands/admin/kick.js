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
        .addStringOption(option =>
            option
                .setName("reason")
                .setDescription("Причина"))
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),

        async execute (interaction) {

            const user = interaction.options.getUser('user');
            const member = await interaction.guild.members.fetch(user.id);
            const reason = interaction.options.getString('reason') || "Не указано";
            
            const embedErr = new EmbedBuilder()
                .setColor(0xf38ba8)
                .setDescription(`Невозможно исключить ${user.username}: пользователь имеет роль выше вашей.`)
                .setFooter({text: `Вызвал: ${interaction.user.username}`,
                            iconURL: interaction.user.displayAvatarURL({ ditamic: true, size: 4096 })})
                .setTimestamp()

            
            if ( member.roles.highest.position >= interaction.member.roles.highest.position )
                return interaction.reply({
                    embeds: [embedErr],
                    ephemeral: true
                });
            
            await member.kick(reason)

            await interaction.reply({ content: `${user.username}: был исключён по причине: ${reason}` , ephemeral: true });
    },
};