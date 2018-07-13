const {
  RichEmbed
} = require('discord.js');

module.exports.run = async (client, message, args) => {
  const settings = client.settings.get(message.guild.id);
  const array = settings.ignored;
  if (!message.member.permissions.has('ADMINISTRATOR')) return client.permsError.member(client, message, 'ADMINISTRATOR');
  if (!args[0]) return client.usage(message, settings.prefix, 'ignore');
  switch (args[0].toLowerCase()) {
    case 'add':
      {
        if (!args[1]) return client.usage(message, settings.prefix, 'ignore');
        switch (args[1].toLowerCase()) {
          case 'channel':
            {
              let channel = message.mentions.channels.first() || message.guild.channels.find(c => c.name === args.slice(2).join(' ')) || message.guild.channels.get(args[2]);
              if (!channel) return client.argsError(client, message, 'Please provide a valid channel mention, name, or ID.');
              channel = channel.id;
              let name = message.guild.channels.get(channel).name;
              array.channels.push(channel);
              client.settings.set(message.guild.id, settings);
              return message.channel.send(`${client.emotes.check} Commands ran in <#${channel}> will now be ignored.`);
            };
            break;
          case 'user':
            {
              let str = args.slice(2).join(' ').toLowerCase();
              const member = message.mentions.members.first() || message.guild.members.get(args[2]);
              if (!member) return client.argsError(client, message, 'Please provide a valid user mention, or ID.');
              const id = member.user.id;
              const name = member.user.tag;
              if (array.users.includes(id)) return client.argsError(client, message, 'That user has already been added.');
              array.users.push(id);
              client.settings.set(message.guild.id, settings);
              return message.channel.send(`${client.emotes.check} The bot will now ignore commands ran by \`${name}\``);
            };
        };
      };
      break;
    case 'remove':
      {
        if (!args[1]) return client.usage(message, settings.prefix, 'ignore');
        switch (args[1].toLowerCase()) {
          case 'channel':
            {
              let channel = message.mentions.channels.first() || message.guild.channels.find(c => c.name === args.slice(2).join(' ')) || message.guild.channels.get(args[2]);
              if (!channel) return client.argsError(client, message, 'Please provide a valid channel mention, name, or ID.');
              channel = channel.id;
              let name = message.guild.channels.get(channel).name;
              if (!array.channels.includes(channel)) return client.argsError(client, message, 'That channel is not include in the ignored list.');
              let index = array.channels.indexOf(channel);
              array.channels.splice(index, 1);
              client.settings.set(message.guild.id, settings);
              return message.channel.send(`${client.emotes.check} Commands ran in <#${channel}> will now be executed.`);
            };
            break;
          case 'user':
            {
              let str = args.slice(2).join(' ').toLowerCase();
              const member = message.mentions.members.first() || message.guild.members.get(args[2]);
              if (!member) return client.argsError(client, message, 'Please provide a valid user mention, or ID.');
              const id = member.user.id;
              const name = member.user.tag;
              if (!array.users.includes(id)) return client.argsError(client, message, 'That user is not include in the ignored list.');
              let index = array.users.indexOf(id);
              array.users.splice(index, 1);
              return message.channel.send(`${client.emotes.check} The bot will now execute commands ran by \`${name}\``);
            };
        };
      };
      break;
    case 'view':
      {
        if (client.embedPerms(message) === false) {
          return message.channel.send(`\`\`\`Ignored Channels: [${array.channels.join(', ')}]\nIgnored Users: [${array.users.join(', ')}]\`\`\``);
        } else {
          const embed = new RichEmbed()
            .setColor(message.guild.me.highestRole.hexColor)
            .addField('Ignored Channels', `\`\`\`[${array.channels.join(', ')}]\`\`\``)
            .addField('Ignored Users', `\`\`\`[${array.users.join(', ')}]\`\`\``);
          return message.channel.send(embed);
        };
      };
  };
};

module.exports.conf = {
  enabled: true,
  reason: null,
  permission: 'ADMINISTRATOR',
  devOnly: false
};

module.exports.help = {
  name: "ignore",
  category: "administrator",
  description: "Add channels and/or users for the bot to ignore.",
  usage: "[prefix]ignore <add|remove|view> <@user|user ID|#channel|channel ID>",
  parameters: "stringFlag, snowflakeGuildMember|snowflakeGuildChannel",
  extended: 'If you add `view` after the command, no other parameters are needed.'
};