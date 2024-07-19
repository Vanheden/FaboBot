const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'help',
    description: 'Help Usage',
    execute(message, args) {
        // Create an embed for the help command
        const embed = new EmbedBuilder()
            .setTitle('Available Commands')
            .setColor('#3498db') // You can choose any color you like
            .addFields(
                { name: '!help', value: 'Display this help message', inline: true },
                { name: '!addrole', value: 'Add a role to a user', inline: true },
                { name: '!addrole list', value: 'List all available roles', inline: true },
                { name: '!delrole', value: 'Remove a role from a user', inline: true },
                { name: '!kick', value: 'Kick a user', inline: true },
                { name: '!ban', value: 'Ban a user', inline: true },
                { name: '!mute', value: 'Mute a user', inline: true }
            );

        // Send the embed to the channel
        message.reply({ embeds: [embed] });
    },
};
