const { RichEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {
  const { prefix } = client.settings.get(message.guild.id);
  if (!message.member.permissions.has('MANAGE_CHANNELS')) return client.permsError.member(client, message, 'MANAGE_CHANNELS');
  if (!message.guild.me.permissions.has('MANAGE_CHANNELS')) return client.permsError.bot(client, message, 'MANAGE_CHANNELS');
  if (!args[0]) return client.usage(message, prefix, 'delchannel');
  let channel = message.mentions.channels.first() || message.guild.channels.find(c => c.name === args.join(' ')) || message.guild.channels.find(c => c.name.includes(args.join(' '))) || message.guild.channels.get(args[0]);
  if (!channel) return message.delete(), message.channel.send(`${client.emotes.x} You did not provide a valid channel mention, name, or ID.`);
  const filter = (reaction, user) => {
    return reaction.emoji.name === 'utilidexCheck' || reaction.emoji.name === 'utilidexX'  && user.id === message.author.id;
  };
  message.delete();
  const error = (msg, err) => {
    const embed = new RichEmbed()
      .setColor('RED')
      .setDescription(`${client.emotes.x} **Something Went Wrong:**\n\n\`${err}\``);
    msg.edit(embed);
  };
  const embed = new RichEmbed()
    .setColor(client.color)
    .setDescription(`Are you sure you want to delete \`#${channel.name}\`?\n\nReact with ${client.emotes.check} to proceed, or ${client.emotes.x} to exit.`)
    .setFooter('[!] This menu will time out after 2 minutes.');
  const msg = await message.channel.send(embed);
  await msg.react(client.emojis.find(e => e.name === 'utilidexCheck'));
  await msg.react(client.emojis.find(e => e.name === 'utilidexX'));
  const collector =  msg.createReactionCollector(filter, { time: 120000 });
  collector.on('collect', async (reaction) => {
    if (reaction.emoji.name === 'utilidexCheck') {
      const embed = new RichEmbed()
        .setColor('GREEN')
        .setDescription(`${client.emotes.check} Successfully deleted the channel \`#${channel.name}\`!`);
      try {
        await channel.delete(`Deleted by ${message.author.tag}`);
        await msg.clearReactions();
        return msg.edit(embed);
      } catch (e) {
        return error(msg, e.message);
      };
    } else if (reaction.emoji.name === 'utilidexX') {
      const embed = new RichEmbed()
        .setColor('GREEN')
        .setDescription(`${client.emotes.check} Successfully stopped the process.`);
      await msg.clearReactions();
      return msg.edit(embed);
    } else {
      return;
    };
  });
  collector.on('end', async () => {

  });
};

module.exports.conf = {
  enabled: true,
  reason: null,
  permission: 'MANAGE_CHANNELS',
  devOnly: false
};

module.exports.help = {
  name: 'delchannel',
  category: 'utility',
  description: 'Deletes a channel.',
  usage: '[prefix]delchannel <#channel|channel name|channel ID>',
  parameters: 'snowflakeGuildChannel',
  extended: false
};
