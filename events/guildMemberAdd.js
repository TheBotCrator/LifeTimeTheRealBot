const { RichEmbed } = require('discord.js');
const ms = require('ms');

class GuildMemberAdd {
    constructor(client) {
        this.client = client;
    };

    async run(member) {
      const { welcome_config, autorole } = this.client.settings.get(member.guild.id);
      let msg = welcome_config.message;
        msg = msg.replace('{user}', member.user.username);
        msg = msg.replace('{tag}', member.user.tag);
        msg = msg.replace('{mention}', member.toString());
        msg = msg.replace('{age}', this.client.moment(member.user.createdAt).fromNow());
        msg = msg.replace('{created}', this.client.moment(member.user.createdAt).format('dddd, MMMM Do, YYYY, hh:mm:ss A'));
        msg = msg.replace('{guild}', member.guild.name);
        msg = msg.replace('{size}', member.guild.members.size);
      //both disabled
      if (welcome_config.enabled === false && autorole.enabled === false) return;
      //welcome enabled | autorole disabled
      if (welcome_config.enabled === true && autorole.enabled === false) {
        const channel = member.guild.channels.find(c => c.name === welcome_config.channel) || member.guild.channels.get(welcome_config.channel);
        if (!channel) return;
        if (welcome_config.type === 'text') {
            return channel.send(msg);
        } else {
            const embed = new RichEmbed()
                .setColor(welcome_config.color !== null ? welcome_config.color : this.client.color)
                .setAuthor(member.user.username, member.user.displayAvatarURL)
                .setDescription(msg)
                .setFooter(welcome_config.footerMessage !== 'not-set' ? welcome_config.footerMessage : '')
                .setThumbnail(member.user.displayAvatarURL)
            return channel.send(member.toString(), embed);
        };
       };
      //welcome disabled | autorole enabled
      if (welcome_config.enabled === false && autorole.enabled === true) {
        const role = member.guild.roles.find(r => r.name === autorole.role) || member.guild.roles.get(autorole.role);
        if (!role) return;
        if (autorole.time === null) {
            try {
                await member.addRole(role);
            } catch (e) {
                throw new Error(e.stack);
            };
        } else {
            setTimeout(async () => {
                try {
                    await member.addRole(role);
                } catch (e) {
                    throw new Error(e.stack);
                };
            }, (autorole.time));
        };
      };
      //both enabled
    };
};

module.exports = GuildMemberAdd;
