const fs = require('node:fs');
const path = require('node:path');
const { Client, Events, GatewayIntentBits, Collection, ActivityType, EmbedBuilder, GuildChannelManager, AttachmentBuilder, ChannelManager, Partials} = require('discord.js');
const { clientId, guildId, token } = require('./config.json');
const { channel } = require('node:diagnostics_channel');
const { Guilds, GuildMembers, GuildMessages, GuildPresences } = GatewayIntentBits;
//



const { User, Message, GuildMember, ThreadMember, Channel } = Partials;

const client = new Client({
    intents: [Guilds, GuildMembers, GuildMessages, GuildPresences],
    partials: [User, Message, GuildMember, ThreadMember, Channel]
});

client.commands = new Collection();

client.once(Events.ClientReady, c => {
    console.log(`Запущенa ${c.user.tag}`);
    client.user.setPresence({ activities: [{ name: "nekolover.", type: ActivityType.Listening }], status: 'invisible' });
});

const folders = fs.readdirSync('./event');
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

client.on(Events.InteractionCreate, async(interaction,client) => {
    if (interaction.isChatInputCommand()) {
        const command = interaction.client.commands.get(interaction.commandName);
        try {
            await command.execute(interaction, client);
        } catch (error) {
            console.error(error);
            return
        }

    }

    if (interaction.isContextMenuCommand()) {
        const contextCommand = interaction.client.commands.get(interaction.commandName);
        
        if(!contextCommand) return;

        try {
            await contextCommand.execute(interaction, client);
        } catch (error) {
            console.error(error);
            return
        }
    }
});

client.on(Events.GuildMemberAdd, async (member) => {
    var role = member.guild.roles.cache.find(role => role.id === "1129083122802245705");
    member.roles.add(role);
    console.log('User: ' + member.user.username + ' has joined the server!');
});

client.on(Events.MessageCreate, async (message) => {
    if(message.channel.id === "1133424504283070515") {
        
    }


});

const { loadEvents } = require('./event.js');

client.login(token).then(() => {
    loadEvents(client);
//    loadCommands(client);
});
