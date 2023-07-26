// 

const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Отчищает выбранное количество сообщений')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
        .addIntegerOption((option) =>
            option.setName('amount')
                .setDescription('Количество сообщений')
                .setRequired(true)
                .setMinValue(1)
                .setMaxValue(100)
        ),

        async execute(interaction) {
            const { channel, options } = interaction;

            const amount = options.getInteger('amount');

            const messages = await channel.messages.fetch({ 
                limit: amount +1,
            });

            const embed = new EmbedBuilder()
                .setColor('#cdd6f4')


            await channel.bulkDelete(amount).then(messages => {
                embed.setDescription(`Удалено ${messages.size} сообщений.`);
                interaction.reply({
                        embeds: [embed],
                        ephemeral: true
                    });
                })
            }
    }

