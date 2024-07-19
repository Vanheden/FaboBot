const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'addrole',
    description: 'Add a role to a user or list all roles',
    adminOnly: true,
    async execute(message, args) {
        // If no arguments are provided, show usage message
        if (args.length === 0) {
            return message.reply('**Usage:** `!addrole role username` or `!addrole list` to list all roles');
        }

        // If 'list' subcommand is used, list all roles
        if (args[0] === 'list') {
            // Create an embed to list all roles excluding the "everyone" role
            const embed = new EmbedBuilder()
                .setTitle('Available Roles')
                .setColor('#3498db'); // Default color

            // Add roles to the embed
            message.guild.roles.cache
                .filter(role => role.name !== '@everyone')
                .forEach(role => {
                    embed.addFields({ name: role.name, value: '\u200B', inline: true });
                });

            return message.reply({ embeds: [embed] });
        }

        // Ensure correct usage
        if (args.length < 2) {
            return message.reply('**Usage:** `!addrole role username` or `!addrole list` to list all roles');
        }

        // Extract role and username from arguments
        const roleName = args[0];
        const username = args.slice(1).join(' ');

        // Find the role by name
        const role = message.guild.roles.cache.find(role => role.name === roleName);
        if (!role) {
            return message.reply(`Role "${roleName}" not found. Use \`!addrole list\` to see all roles.`);
        }

        // Find the user by username
        const member = message.guild.members.cache.find(member => member.user.username === username);
        if (!member) {
            return message.reply(`User "${username}" not found.`);
        }

        // Add the role to the user
        try {
            await member.roles.add(role);
            message.reply(`Successfully added role "${roleName}" to user "${username}".`);
        } catch (error) {
            console.error(error);
            message.reply('There was an error adding the role.');
        }
    },
};
