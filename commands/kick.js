const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'kick',
    description: 'Kick a user from the server',
    adminOnly: true,
    async execute(message, args) {
        const usageEmbed = new EmbedBuilder()
            .setTitle('Kick Usage')
            .setColor('#3498db')
            .addFields(
                { name: 'Usage', value: '`!kick @user [reason]`' }
            );

        if (!message.member.permissions.has('KICK_MEMBERS')) {
            return message.reply('You do not have permission to use this command.');
        }

        if (args.length < 1) {
            return message.reply({ embeds: [usageEmbed] });
        }

        const user = message.mentions.users.first();
        if (!user) {
            return message.reply('You need to mention a user to kick them.');
        }

        const member = message.guild.members.resolve(user);
        if (!member) {
            return message.reply('The mentioned user is not a member of this server.');
        }

        const reason = args.slice(1).join(' ') || 'No reason provided';

        try {
            await member.kick(reason);
            message.reply(`Successfully kicked ${user.tag} for: ${reason}`);
        } catch (error) {
            console.error(error);
            message.reply('There was an error kicking the user.');
        }
    },
};
