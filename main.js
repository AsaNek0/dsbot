const fs = require('node:fs');
//const { request } = require('undici');
//const { createCanvas, Image } = require('@napi-rs/canvas');
const path = require('node:path');
const { Client, Events, GatewayIntentBits, Collection, ActivityType} = require('discord.js');
const { clientId, guildId, token } = require('./config.json');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

client.once(Events.ClientReady, c => {
    console.log(`Запущенa ${c.user.tag}`);
});


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

client.once(Events.ClientReady, (c) => {
    client.user.setPresence({ activities: [{ name: "nekolover.", type: ActivityType.Listening }], status: 'dnd' });
});

client.login(token);