const { EmbedBuilder, SlashCommandBuilder, PermissionFlagsBits, GuildMember, } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('timeout')
        .setDescription('Отправляет пользователя подумать над своим поведением')
        .addUserOption((option) =>
          option
            .setName('user')
            .setDescription('Пользователь')
            .setRequired(true))
        .addStringOption((option) =>
          option
            .setName("reason")
            .setDescription("Причина")
            .setRequired(true))
        .addIntegerOption((option) =>
            option
                .setName("time")
                .setDescription("Время в минутах")
                .setRequired(true)
                .setMinValue(1)
                .setMaxValue(40320))
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),

        async execute (interaction) {

            const user = interaction.options.getUser('user');
            const member = await interaction.guild.members.fetch(user.id);
            const time = interaction.options.getInteger('time');
            const reason = interaction.options.getString('reason') || "Не указано";
            
            const embedErr = new EmbedBuilder()
                .setColor(0xf38ba8)
                .setDescription(`Невозможно исключить ${user.username}: пользователь имеет роль выше вашей.`)
                .setFooter({text: `Вызвал: ${interaction.user.username}`,
                            iconURL: interaction.user.displayAvatarURL({ ditamic: true, size: 4096 })})
                .setTimestamp()

            const embed = new EmbedBuilder()
                .setColor(0xf38ba8)
                .setDescription(`${user.username}: был отправлен думать на ${time} минут, по причине: ${reason}`)
                .setFooter({text: `Вызвал: ${interaction.user.username}`,
                            iconURL: interaction.user.displayAvatarURL({ ditamic: true, size: 4096 })})
                .setTimestamp()

            const embedDM = new EmbedBuilder()
                .setDescription(`Модератор ${interaction.user.username} выдал вам таймаут на ${time} минут, по причине: ${reason}`)
            
            if ( member.roles.highest.position >= interaction.member.roles.highest.position )
                return interaction.reply({
                    embeds: [embedErr],
                    ephemeral: true
                });
            
            member.timeout(time * 60 * 1000)

            interaction.reply({ embeds: [embed] , ephemeral: true });
            await member.user.send({embeds : [embedDM]})
    },
};