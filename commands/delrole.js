const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'delrole',
    description: 'Remove a role from a user',
    adminOnly: true,
    async execute(message, args) {
        // Ensure correct usage
        if (args.length < 2) {
            return message.reply('**Usage:** `!delrole role username`');
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

        // Remove the role from the user
        try {
            await member.roles.remove(role);
            message.reply(`Successfully removed role "${roleName}" from user "${username}".`);
        } catch (error) {
            console.error(error);
            message.reply('There was an error removing the role.');
        }
    },
};
