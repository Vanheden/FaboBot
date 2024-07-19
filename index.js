require('dotenv').config();

const token = process.env.TOKEN;
const prefix = process.env.PREFIX;

const config = {
    token: token,
    prefix: prefix
};

const fs = require('fs');
const path = require('path');
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const config = require('./config.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
client.commands = new Collection();

// Load command files
const commandFiles = fs.readdirSync(path.join(__dirname, 'commands')).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(path.join(__dirname, 'commands', file));
    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('Ready!');
});

client.on('guildCreate', guild => {
    // Find a default channel to send the welcome message
    let defaultChannel = "";
    guild.channels.cache.forEach((channel) => {
        if(channel.type === 0 && defaultChannel === "") {
            if(channel.permissionsFor(guild.me).has("SEND_MESSAGES")) {
                defaultChannel = channel;
            }
        }
    });
    
    // Send the welcome message to the default channel
    if (defaultChannel) {
        defaultChannel.send("Hello, I'm **FäboBot**, thanks for choosing me!");
    }
});

client.login(config.token);

client.on('messageCreate', message => {
    if (message.author.bot) return;
    if (!message.content.startsWith(config.prefix)) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName);

    if (command.adminOnly && !message.member.permissions.has('ADMINISTRATOR')) {
        return message.reply('You do not have permission to use this command.');
    }

    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('There was an error executing that command.');
    }
});
