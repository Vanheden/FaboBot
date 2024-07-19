const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'mute',
    description: 'Mute a user in the server',
    adminOnly: true,
    async execute(message, args) {
        const usageEmbed = new EmbedBuilder()
            .setTitle('Mute Usage')
            .setColor('#3498db')
            .addFields(
                { name: 'Usage', value: '`!mute @user [reason]`' }
            );

        if (!message.member.permissions.has('MANAGE_ROLES')) {
            return message.reply('You do not have permission to use this command.');
        }

        if (args.length < 1) {
            return message.reply({ embeds: [usageEmbed] });
        }

        const user = message.mentions.users.first();
        if (!user) {
            return message.reply('You need to mention a user to mute them.');
        }

        const member = message.guild.members.resolve(user);
        if (!member) {
            return message.reply('The mentioned user is not a member of this server.');
        }

        const reason = args.slice(1).join(' ') || 'No reason provided';

        const muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');
        if (!muteRole) {
            return message.reply('Muted role not found. Please create a role named "Muted" with appropriate permissions.');
        }

        try {
            await member.roles.add(muteRole, reason);
            message.reply(`Successfully muted ${user.tag} for: ${reason}`);
        } catch (error) {
            console.error(error);
            message.reply('There was an error muting the user.');
        }
    },
};
