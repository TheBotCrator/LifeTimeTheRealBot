const Command = require('../base/command.js');
const { RichEmbed } = require('discord.js');
const ms = require('ms');

class Ban extends Command {
  constructor(client) {
    super(client, {
      name: 'ban',
      category: 'moderation',
      description: 'Bans a user from the user.',
      usage: '{prefix}ban <@user|user ID> <reason> [--days:<number>|--soft|--hard|--temp:<time>]',
      parameters: 'snowflakeGuildMember, stringReason, integerNumber, stringFlag',
      extended: true,
      extended_help: 'By adding a number (between `1` and `7`) at the end of the reason will result in the bot deleting that number of messages sent by that user.\nThe `--soft` flag will ban the user, delete their messages sent in the previous 24 hours, then unban them.\nThe `--hard` flag will ban the user, and delete their messages sent in the previous 7 days.\nThe `--time:time` flag will temp-ban the user for the time specified after `time:`.',
      enabled: true,
      reason: null,
      permission: 'BAN_MEMBERS',
      guildOnly: true,
      devOnly: false,
      cooldown: 5,
      aliases: ['pban']
    });
  };

  async run(message, args) {
    const { prefix, modLog } = this.client.settings.get(message.guild.id);
    let cases = this.client.cases.get(message.guild.id);
    if (!message.member.permissions.has('BAN_MEMBERS')) return this.client.permsError.member(this.client, message, 'BAN_MEMBERS');
    if (!message.guild.me.permissions.has('BAN_MEMBERS')) return this.client.permsError.self(this.client, message, 'BAN_MEMBERS');
    if (!args[0]) return this.client.usage(message, prefix, 'ban');
    const member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!member) return this.client.argsError(this.client, message, 'That user does not seem to be in this server.');
    if (member.user.id === message.author.id) return this.client.argsError(this.client, message, 'You can\'t ban yourself - selfharm is bad!');
    if (this.client.roleHierarchy.bot(message, member)) return this.client.argsError(this.client, message, 'That user cannot be moderared as they have a higher or equal role than the bot\'s highest role.');
    if (member.user.id === message.guild.owner.user.id) return this.client.argsError(this.client, message, 'Really, trying to ban the server owner? No can do.');
    let flag;
    let reason;
    if (args.slice(1).join(' ').length < 1) return this.client.argsError(this.client, message, 'Please provide a reason for the ban.');
    await message.delete();
    const time = this.client.moment().format('dddd, MMMM Do, YYYY, hh:mm:ss A');
    if (message.content.includes('--')) flag = true; else flag = false;
    flag ? reason = args.slice(1).join(' ').split('--')[0] : reason = args.slice(1).join(' ');
    const DM = async (message, member, reason, action, footer = null) => {
      try {
        const embed = new RichEmbed()
          .setColor('RED')
          .setAuthor(message.guild.name, message.guild.iconURL)
          .setDescription(`You have been ${action} in __${message.guild.name}__ by ${message.author.tag}`)
          .addField('Reason', reason)
          .setFooter(footer ? footer : '');
        await member.send(`You have been moderated in ${message.guild.name}:`, embed);
      } catch (e) {
        console.log(e);
      };
    };
    if (flag && message.content.split('--')[1].toLowerCase().includes('days')) {
      const days = message.content.split('--')[1].split(':')[1];
      if (days > 0 && days < 8) {
        await DM(message, member, reason, 'banned', null);
        try {
         await member.ban({
            days: days,
            reason: `Banned by ${message.author.tag} | Reason: ${reason}`
          });
        } catch (e) {
          return this.client.argsError(this.client, message, e.message);
        };
      const embed = new RichEmbed()
        .setColor('RED')
        .setAuthor(message.author.username, message.author.displayAvatarURL)
        .setTitle('User Banned')
        .setDescription(`**${member.user.username}** has been banned by ${message.author.username}`)
        .addField('Reason', reason);
        //.setThumbnail();
      await message.channel.send(member.user, embed);
      const log = message.guilds.channels.find(c => c.name === modLog) || message.guild.channels.get(modLog);
      if (!log) return;
      cases = cases++;
      this.client.cases.set(message.guild.id, cases);
      const log_embed = new RichEmbed()
        .setColor('RED')
        .setAuthor(`${member.user.username} | Ban`)
        .setDescription(`**${member.user.tag}** (\`${member.user.id}\`) was banned by ${message.author.username}`)
        .addField('Reason', reason)
        .setFooter(`Case #${cases} | ${time}`)
    } else {
        return this.client.argsError(this.client, message, 'The number of days provided was either below 1 or above 8.');
      };
    } else if (flag && message.content.split('--')[1].toLowerCase() === 'soft') {
      //execute soft-ban command
      await DM(message, member, reason, 'soft-banned', '[!] You can join back with a valid invite link.');
      try {
        await member.ban({
          days: 1,
          reason: `Soft-Banned by ${message.author.tag} | Reason: ${reason}`});
      } catch (e) {
        return this.client.argsError(this.client, message, e.message);
      };
      const embed = new RichEmbed()
        .setColor('RED')
        .setAuthor(message.author.username, message.author.displayAvatarURL)
        .setTitle('User Banned')
        .setDescription(`**${member.user.username}** has been soft-banned by ${message.author.username}`)
        .addField('Reason', reason);
      //.setThumbnail();
      await message.channel.send(member.user, embed);
      setTimeout(() => {
        message.guild.unban(member.user.id);
      },(3000));
      const log = message.guilds.channels.find(c => c.name === modLog) || message.guild.channels.get(modLog);
      if (!log) return;
      cases = cases++;
      this.client.cases.set(message.guild.id, cases);
      const log_embed = new RichEmbed()
        .setColor('RED')
        .setAuthor(`${member.user.username} | Ban`)
        .setDescription(`**${member.user.tag}** (\`${member.user.id}\`) was banned by ${message.author.username}`)
        .addField('Reason', reason)
        .setFooter(`Case #${cases} | ${time}`)
      setTimeout(() => {
        cases = cases++;
        this.client.cases.set(message.guild.id, cases);
        const log_embed = new RichEmbed()
          .setColor('GREEN')
          .setAuthor(`${member.user.username} | Unban`)
          .setDescription(`**${member.user.tag}** (\`${member.user.id}\`) was unbanned by ${this.client.user.username}`)
          .addField('Reason', 'Ban Expired')
          .setFooter(`Case #${cases} | ${time}`)
      }, (3000));
      // 
    } else if (flag && message.content.split('--')[1].toLowerCase() === 'hard') {
      //execute hard-ban command
      await DM(message, member, reason, 'hard-banned', null);
      try {
        await member.ban({
          days: 7,
          reason: `Banned by ${message.author.tag} | Reason: ${reason}`
        });
      } catch (e) {
        return this.client.argsError(this.client, message, e.message);
      };
      const embed = new RichEmbed()
        .setColor('RED')
        .setAuthor(message.author.username, message.author.displayAvatarURL)
        .setTitle('User Banned')
        .setDescription(`**${member.user.username}** has been hard-banned by ${message.author.username}`)
        .addField('Reason', reason);
      //.setThumbnail();
      await message.channel.send(member.user, embed);
      const log = message.guilds.channels.find(c => c.name === modLog) || message.guild.channels.get(modLog);
      if (!log) return;
      cases = cases++;
      this.client.cases.set(message.guild.id, cases);
      const log_embed = new RichEmbed()
        .setColor('RED')
        .setAuthor(`${member.user.username} | Hard-Ban`)
        .setDescription(`**${member.user.tag}** (\`${member.user.id}\`) was hard-banned by ${message.author.username}`)
        .addField('Reason', reason)
        .setFooter(`Case #${cases} | ${time}`)
    } else if (flag && message.content.split('--')[1].toLowerCase().includes('time')) {
      //temp-ban!
      const ban_time = message.content.split('--')[1].split(':')[1];
      if (isNaN(parseInt(ban_time)) || ms(ban_time) >= 2419200000) return this.client.argsError(this.client, message, 'Invalid time inputted, or the time provided exceeded a 4 week ban.');
      await DM(message, member, reason, `temp-banned for ${ms(ms(ban_time), { long: true})}`, '[!] You can join back with a valid invite link after your ban expires.');
      try {
        await member.ban(`Temp-Banned by ${message.author.tag} | Reason: ${reason}`);
      } catch (e) {
        return this.client.argsError(this.client, message, e.message);
      };
      const embed = new RichEmbed()
        .setColor('RED')
        .setAuthor(message.author.username, message.author.displayAvatarURL)
        .setTitle('User Banned')
        .setDescription(`**${member.user.username}** has been temp-banned for ${ms(ms(ban_time), { long: true})} by ${message.author.username}`)
        .addField('Reason', reason);
      //.setThumbnail();
      await message.channel.send(member.user, embed);
      setTimeout(() => {
        message.guild.unban(member.user.id);
      }, ms(ban_time));
      const log = message.guilds.channels.find(c => c.name === modLog) || message.guild.channels.get(modLog);
      if (!log) return;
      cases = cases++;
      this.client.cases.set(message.guild.id, cases);
      const log_embed = new RichEmbed()
        .setColor('RED')
        .setAuthor(`${member.user.username} | Temp-Ban`)
        .setDescription(`**${member.user.tag}** (\`${member.user.id}\`) was banned for ${ms(ms(ban_time), { long: true})} by ${message.author.username}`)
        .addField('Reason', reason)
        .setFooter(`Case #${cases} | ${time}`)
      setTimeout(() => {
        cases = cases++;
        this.client.cases.set(message.guild.id, cases);
        const log_embed = new RichEmbed()
          .setColor('GREEN')
          .setAuthor(`${member.user.username} | Unban`)
          .setDescription(`**${member.user.tag}** (\`${member.user.id}\`) was unbanned by ${this.client.user.username}`)
          .addField('Reason', 'Ban Expired')
          .setFooter(`Case #${cases} | ${time}`)
      }, (3000));
      //
    } else if (!flag) {
      //reg ban
      await DM(message, member, reason, 'banned', null);
      try {
        await member.ban(`Banned by ${message.author.tag} | Reason: ${reason}`);
      } catch (e) {
        return this.client.argsError(this.client, message, e.message);
      };
      const embed = new RichEmbed()
        .setColor('RED')
        .setAuthor(message.author.username, message.author.displayAvatarURL)
        .setTitle('User Banned')
        .setDescription(`**${member.user.username}** has been banned by ${message.author.username}`)
        .addField('Reason', reason);
      //.setThumbnail();
      await message.channel.send(member.user, embed);
      const log = message.guild.channels.find(c => c.name === modLog) || message.guild.channels.get(modLog);
      if (!log) return;;
      cases = cases++;;
      this.client.cases.set(message.guild.id, cases);
      const log_embed = new RichEmbed()
        .setColor('RED')
        .setAuthor(`${member.user.username} | Ban`)
        .setDescription(`**${member.user.tag}** (\`${member.user.id}\`) was banned by ${message.author.username}`)
        .addField('Reason', reason)
        .setFooter(`Case #${cases} | ${time}`)
    };
  };
};

module.exports = Ban;
