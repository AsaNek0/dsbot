const { EmbedBuilder, SlashCommandBuilder,} = require("discord.js");
const { QuickDB } = require("quick.db");
const db = new QuickDB();

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

            let userlvl = await db.get(`${user.id}.xp`) / 1000 + 1
            let lvl = Math.floor(userlvl)
            

            console.log(userlvl)

        
            let badges = [];

            await Promise.all (flags.map( async badge => {
                if (badge === 'Staff') badges.push('<:discordstaff:1122923347651600507>');
                if (badge === 'Partner') badges.push('<:discordpartner:1122923351279673406>');
                if (badge === 'DISCORD_EMPLOYEE') badges.push('Discord');
                if (badge === 'Hypesquad') badges.push('<:hypesquadevents:1122923339539808377>');
                if (badge === 'HypeSquadOnlineHouse1') badges.push('<:hypesquadbravery:1122923344862380092>');
                if (badge === 'HypeSquadOnlineHouse2') badges.push('<:hypesquadbrilliance:1122923342614233149>');
                if (badge === 'HypeSquadOnlineHouse3') badges.push('<:hypesquadbalance:1122923346124877956>');
                if (badge === 'BugHunterLevel1') badges.push('<:discordbughunter1:1122923362134532136>');
                if (badge === 'BugHunterLevel2') badges.push('<:discordbughunter2:1122923359886376960>');
                if (badge === 'ActiveDeveloper') badges.push('<:activedeveloper:1122923369734606888>');
                if (badge === 'VerifiedDeveloper') badges.push('<:discordbotdev:1122923364441391135> ');
                if (badge === 'PremiumEarlySupporter') badges.push('<:discordearlysupporter:1122923357042659348>');
                if (badge === 'VerifiedBot') badges.push('<:activedeveloper:1122923369734606888>');
            }));

            if (user.tag === `${user.username}0`) badges.push('<:Knownas:1122999154663243816>');

            const embed = new EmbedBuilder()
                .setColor(0x74c7ec)
                .setAuthor({ name: `Информация о пользователе`})
                .setTitle(`${user.username}`)
                .setURL(`${userAvatar}`)
                .setThumbnail(`${userAvatar}`)
                .addFields(
                    { name: 'Псевдоним:', value: `${user} ${badges.join('') || ''}`, inline: false },
                    // { name: 'Бейджики: ', value: ``, inline: true },
                    { name: 'Участник c:', value: `<t:${parseInt(member.joinedAt / 1000)}:F>`, inline: true },
                    { name: 'Зарегался:', value: `<t:${parseInt(user.createdAt / 1000)}:R>`, inline: true },
                    { name: 'Уровень:', value: `${lvl}`, inline: true },
                )
                .setFooter({text: `Вызвал: ${interaction.user.username}`,
                            iconURL: interaction.user.displayAvatarURL({ ditamic: true, size: 32 })})
                .setTimestamp()
            
            if (user.bot === true) badges.push('<:SlashCommands:1122977943841415310>');

            const embedBot = new EmbedBuilder()
                .setColor(0x74c7ec)
                .setAuthor({ name: `Информация о Боте`, url: userAvatar, })
                .setTitle(`${user.username}`)
                .setURL(`${userAvatar}`)
                .setThumbnail(`${userAvatar}`)
                .addFields(
                    { name: 'Имя:', value: `${user} ${badges.join('')}` },
                    { name: 'Добавлен в:', value: `<t:${parseInt(member.joinedAt / 1000)}:F>`, inline: true },
                    { name: 'Создан:', value: `<t:${parseInt(user.createdAt / 1000)}:R>`, inline: true },
                    //{ name: 'Создан:', value: `${}`}
                )
                .setFooter({text: `Вызвал: ${interaction.user.username}`,
                            iconURL: interaction.user.displayAvatarURL({ ditamic: true, size: 32 })})
                .setTimestamp()
            
            if ( user.bot === true ) 
                return await interaction.reply({embeds: [embedBot]});

            await interaction.reply({embeds: [embed],});

            
            
           
    },
};