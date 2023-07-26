const { SlashCommandBuilder, AttachmentBuilder,} = require("discord.js");
const Canvas = require('@napi-rs/canvas');
const { request } = require('undici');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('canvacard')
        .setDescription('Выводит автар пользователя')
        .addUserOption((option) =>
        option.setName('user')
        .setDescription('user')
        .setRequired(false)
        ),

        async execute (interaction) {

            let user = interaction.options.getUser('user') || interaction.user;
            let member = await interaction.guild.members.fetch(user.id);

            const canvas = Canvas.createCanvas(800, 1000);
		    const c = canvas.getContext('2d');

            const { body } = await request(user.displayAvatarURL({ extension: 'jpg', ditamic: true, size: 4096 }));
            const bg = await Canvas.loadImage('./wall.jpg');
            const avatar = await Canvas.loadImage(await body);
            //const gradient = c.createLinearGradient(0, 0, 800, 1000);
            
            c.drawImage(bg, -1000, -500);
            
            //gradient.addColorStop(0, "green");
            //gradient.addColorStop(0.5, "cyan");
            //gradient.addColorStop(1, "green");

            //c.fillStyle = gradient;
            //c.fillRect(0, 0, canvas.width, canvas.height);

        
            c.font = '60px FiraCode Nerd Font';
            c.fillStyle = 'ffffff';
            c.fillText(member.displayName, 210, 135);

            c.font = '25px FiraCode Nerd Font';
            c.fillStyle = 'ffffff';
            c.fillText(user.displayName, 210, 165);

            c.beginPath();
            c.arc(105, 105, 80, 0, Math.PI * 2, true);
            c.closePath();
            c.clip();


            c.drawImage(avatar, 25, 25, 160, 160);
            
            const attachment = new AttachmentBuilder(await canvas.encode('png'), { name: 'profile-image.png' });
        
            await interaction.reply({ files: [attachment] });    
    },
};