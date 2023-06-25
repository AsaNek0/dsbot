const { EmbedBuilder, SlashCommandBuilder,} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('serverinfo')
        .setDescription('Выводит информацию о сервере'),

        async execute (interaction) {

//            let user = interaction.user;
            let guildAvatar = interaction.guild.iconURL({ ditamic: true, size: 4096 })
            let guild = interaction.guild;

            const embed = new EmbedBuilder()
                .setColor(0x74c7ec)
                .setAuthor({ name: `Информация о пользователе`})
                .setTitle(`${guild.name}`)
                .setURL(`${guildAvatar}`)
                .setThumbnail(`${guildAvatar}`)
                .addFields(
                    { name: 'Пользователь:', value: `${guild.owner}` },
//                    { name: 'На сервере c:', value: `<t:${parseInt(guild.createdAt / 1000)}:R>`, inline: true },
                    { name: 'В дс:', value: `<t:${parseInt(guild.createdAt / 1000)}:R>`, inline: true })
                .setFooter({text: `Вызвал: ${interaction.user.username}`,
                    iconURL: interaction.user.displayAvatarURL({ ditamic: true, size: 32 })})
                .setTimestamp()
                

            await interaction.reply({embeds: [embed],});

            
            
           
    },
};