const { EmbedBuilder, SlashCommandBuilder, GuildMember,} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('userinfo')
        .setDescription('Выводит автар пользователя')
        .addUserOption((option) =>
        option.setName('user')
        .setDescription('user')
        .setRequired(false)
        ),

        async execute (interaction) {

            let user = interaction.options.getUser('user') || interaction.user;
            let userAvatar = user.displayAvatarURL({ ditamic: true, size: 4096 })
            let member = await interaction.guild.members.fetch(user.id);

            const embed = new EmbedBuilder()
                .setColor(0x74c7ec)
                .setAuthor({ name: `Информация о пользователе` , url: userAvatar, })
                .setTitle(`${user.username}`)
                .setURL(`${userAvatar}`)
                .setThumbnail(`${userAvatar}`)
                .addFields(
                    { name: 'Пользователь:', value: `${user}` },
                    { name: 'На сервере c:', value: `<t:${parseInt(member.joinedAt / 1000)}:R>`, inline: true },
                    { name: 'В дс:', value: `<t:${parseInt(user.createdAt / 1000)}:R>`, inline: true },
//                    { name: '\u200B', value: '\u200B' },
//                    { name: `111`, value: `${user.bot}`, inline: true },
                )
                .setFooter({text: `Вызвал: ${interaction.user.username}`,
                            iconURL: interaction.user.displayAvatarURL({ ditamic: true, size: 32 })})
                .setTimestamp()
                
            const embedBot = new EmbedBuilder()
                .setColor(0x74c7ec)
                .setAuthor({ name: `Информация о Боте` , url: userAvatar, })
                .setTitle(`${user.username} (Бот)`)
                .setURL(`${userAvatar}`)
                .setThumbnail(`${userAvatar}`)
                .addFields(
                    { name: 'Пользователь:', value: `${user}` },
                    { name: 'На сервере c:', value: `<t:${parseInt(member.joinedAt / 1000)}:R>`, inline: true },
                    { name: 'Создан:', value: `<t:${parseInt(user.createdAt / 1000)}:R>`, inline: true },
                )
                .setFooter({text: `Вызвал: ${interaction.user.username}`,
                            iconURL: interaction.user.displayAvatarURL({ ditamic: true, size: 32 })})
                .setTimestamp()
            
            if ( user.bot === true ) 
                return await interaction.reply({embeds: [embedBot]});
            2
            await interaction.reply({embeds: [embed],});

            
            
           
    },
};