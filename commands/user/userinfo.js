const { EmbedBuilder, SlashCommandBuilder,} = require("discord.js");

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
            let flags = user.flags.toArray();

        
            let badges = [];

            await Promise.all (flags.map( async badge => {
                if (badge === 'Staff') badges.push('Discord');
                if (badge === 'Partner') badges.push('Discord');
                if (badge === 'DISCORD_EMPLOYEE') badges.push('Discord');
                if (badge === 'Hypesquad') badges.push('Discord');
                if (badge === 'HypeSquadOnlineHouse1') badges.push('<:hypesquadbravery:1122923344862380092>');
                if (badge === 'HypeSquadOnlineHouse2') badges.push('<:hypesquadbrilliance:1122923342614233149>');
                if (badge === 'HypeSquadOnlineHouse3') badges.push('<:hypesquadbalance:1122923346124877956>');
                if (badge === 'BugHunterLevel1') badges.push('Discord');
                if (badge === 'BugHunterLevel2') badges.push('Discord');
                if (badge === 'ActiveDeveloper') badges.push('Discord');
                if (badge === 'VerifiedDeveloper') badges.push('Discord');
                if (badge === 'PremiumEarlySupporter') badges.push('Discord');
                if (badge === 'VerifiedBot') badges.push('Discord');
            }));

            const embed = new EmbedBuilder()
                .setColor(0x74c7ec)
                .setAuthor({ name: `Информация о пользователе`})
                .setTitle(`${user.username}`)
                .setURL(`${userAvatar}`)
                .setThumbnail(`${userAvatar}`)
                .addFields(
                    { name: 'Псевдоним:', value: `${user}` },
                    { name: 'Значки: ', value: `${badges.join('') || '**Нема таковых(**'}`, inline: true },
                    { name: '\u200B', value: '\u200B' },
                    { name: 'Участник c:', value: `<t:${parseInt(member.joinedAt / 1000)}:F>`, inline: true },
                    { name: 'В дс с:', value: `<t:${parseInt(user.createdAt / 1000)}:F>`, inline: true },
//                    { name: '\u200B', value: '\u200B' },
//                    { name: `111`,value: `${user.bot}`, inline: true },
                )
                .setFooter({text: `Вызвал: ${interaction.user.username}`,
                            iconURL: interaction.user.displayAvatarURL({ ditamic: true, size: 32 })})
                .setTimestamp()
            
            if (user.bot === true) badges.push('<:SlashCommands:1122977943841415310>');

            const embedBot = new EmbedBuilder()
                .setColor(0x74c7ec)
                .setAuthor({ name: `Информация о Боте`, url: userAvatar, })
                .setTitle(`${user.username} ${badges.join('')}`)
                .setURL(`${userAvatar}`)
                .setThumbnail(`${userAvatar}`)
                .addFields(
                    { name: 'Имя:', value: `${user}` },
                    { name: 'Добавлен в:', value: `<t:${parseInt(member.joinedAt / 1000)}:F>`, inline: true },
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