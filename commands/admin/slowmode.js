const set = new Set();
const { RichEmbed } = require('discord.js');
const ms = require('ms');
const array = [];
module.exports.run = async (client, message, args) => {
  const { prefix, modLog } = client.settings.get(message.guild.id);
  if (!message.member.permissions.has('ADMINISTRATOR')) return client.permsError.member(client, message, 'ADMINISTRATOR');
  if (!message.guild.me.permissions.has('MANAGE_MESSAGES')) return client.permsError.bot(client, message, 'MANAGE_MESSAGES');
  if (!args[0]) return client.usage(message, prefix, 'slowmode');
  if (args[0].toLowerCase() === '-off') {
    //unlock
    if (!array.includes(message.channel.id)) return message.delete(), message.channel.send(`${client.emotes.x} This channel is not in slowmode.`);
    message.delete();
    const index = array.indexOf(message.channel.id);
    array.splice(index, 1);
    set.clear();
    return message.channel.send(`${client.emotes.check} Slowmode is now off.`);
  } else {
    //lock
    const time = args[0];
    if (isNaN(parseInt(time))) return client.argsError(client, message, 'The time you inputted was invalid.');
    await message.delete();
    array.push(message.channel.id);
    message.channel.send(`${client.emotes.check} Slowmode is now active.`);
    //ignore mods
    // if (message.member.permissions.has('KICK_MEMBERS')) return;
    set.add(message.author.id);
    if (set.has(message.author.id)) {
      message.delete();
    };
    console.log(set);
    setTimeout(() => {
      set.delete(message.author.id);
    }, ms(time));
  };
};

module.exports.conf = {
  enabled: true,
  reason: null,
  permission: 'ADMINISTRATOR',
  devOnly: false
};
