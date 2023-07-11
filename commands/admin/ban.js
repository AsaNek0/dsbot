const { EmbedBuilder, SlashCommandBuilder, PermissionFlagsBits, GuildMember, } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Банит пользователя на сервере.')
        .addUserOption((option) =>
          option
            .setName('user')
            .setDescription('Пользователь')
            .setRequired(true))
        .addStringOption(option =>
            option
                .setName("reason")
                .setDescription("Причина"))
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembersMembers),

        async execute (interaction) {

            const user = interaction.options.getUser('user');
            const member = await interaction.guild.members.fetch(user.id);
            const reason = interaction.options.getString('reason') || "Не указана";
            
            const embedErr = new EmbedBuilder()
                .setColor(0xf38ba8)
                .setDescription(`Невозможно исключить ${user.username}: пользователь имеет роль выше вашей.`)
                .setFooter({text: `Вызвал: ${interaction.user.username}`,
                            iconURL: interaction.user.displayAvatarURL({ ditamic: true, size: 4096 })})
                .setTimestamp()

            const embedDM = new EmbedBuilder()
                .setDescription(`Модератор ${interaction.user.username} забанил вас по причине: ${reason}`)
                .setTimestamp()

            const embed = new EmbedBuilder()
                .setColor(0xa6e3a1)
                .setDescription(`${user.username}: был исключён по причине: ${reason}`)
                .setFooter({text: `Вызвал: ${interaction.user.username}`,
                            iconURL: interaction.user.displayAvatarURL({ ditamic: true, size: 4096 })})
                .setTimestamp()


            
            if ( member.roles.highest.position >= interaction.member.roles.highest.position )
                return interaction.reply({
                    embeds: [embedErr],
                    ephemeral: true
                });
            
            await member.ban(reason)

            member.user.send({
                embeds : [embedDM]
            })

            await interaction.reply({ 
                embeds: [embed],
                ephemeral: true
            });
    },
};