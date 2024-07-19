const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'ban',
    description: 'Ban a user from the server',
    adminOnly: true,
    async execute(message, args) {
        const usageEmbed = new EmbedBuilder()
            .setTitle('Ban Usage')
            .setColor('#3498db')
            .addFields(
                { name: 'Usage', value: '`!ban @user [reason]`' }
            );

        if (!message.member.permissions.has('BAN_MEMBERS')) {
            return message.reply('You do not have permission to use this command.');
        }

        if (args.length < 1) {
            return message.reply({ embeds: [usageEmbed] });
        }

        const user = message.mentions.users.first();
        if (!user) {
            return message.reply('You need to mention a user to ban them.');
        }

        const member = message.guild.members.resolve(user);
        if (!member) {
            return message.reply('The mentioned user is not a member of this server.');
        }

        const reason = args.slice(1).join(' ') || 'No reason provided';

        try {
            await member.ban({ reason });
            message.reply(`Successfully banned ${user.tag} for: ${reason}`);
        } catch (error) {
            console.error(error);
            message.reply('There was an error banning the user.');
        }
    },
};
