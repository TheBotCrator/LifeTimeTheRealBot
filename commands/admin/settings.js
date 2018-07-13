const {
  RichEmbed
} = require('discord.js');

module.exports.run = async (client, message, args) => {
  const settings = client.settings.get(message.guild.id);
  const success = (message, key, value) => {
    const embed = new RichEmbed()
      .setColor('GREEN')
      .setTitle('Success')
      .setDescription(`${client.emotes.check} Succcessfully set your \`${key}\` to \`${value}\``);
    message.channel.send(embed);
  };
  const fail = (message, error) => {
    const embed = new RichEmbed()
      .setColor('RED')
      .addField(`${client.emotes.x} Something Went Wrong`, `\`${error}\``);
    message.channel.send(embed);
  };
  const reset = (message, key) => {
    const embed = new RichEmbed()
      .setColor('GREEN')
      .setTitle('Success!')
      .setDescription(`${client.emotes.check} Successfully reset your \`${key}\``);
    return message.channel.send(embed);
  };
  if (!message.member.permissions.has('ADMINISTRATOR')) return client.permsError.member(client, message, 'ADMINISTRATOR');
  if (!message.guild.me.permissions.has('ADMINISTRATOR')) return client.permsError.self(client, message, 'ADMINISTRATOR');
  if (!args[0] || !args[1]) return client.usage(message, settings.prefix, 'settings');
  if (args[0].toLowerCase() === 'view') {
    let key = args[1];
    switch (key) {
      case 'all':
        {
          const embed = new RichEmbed()
            .setColor(message.guild.me.highestRole.hexColor)
            .addField(`Current Settings for ${message.guild.name}`, `\`\`\`prefix: ${settings.prefix}\nmute role: ${settings.muteRole}\nmod log: ${settings.modLog}\nmessage log: ${settings.msgLog}\nnickname log: ${settings.nickLog}\nserver log: ${settings.serverLog}\nwelcome_config: [Object]\nleave_config: [Object]\ndisabled commands: [${settings.disabled_commands.join(', ')}]\nembed: ${settings.embed}\nautorole: [Object]\`\`\``);
          return message.channel.send(embed);
        };
        break;
      case 'welcome_config':
        {
          let settings = client.settings.get(message.guild.id).welcome_config;
          let channel;
          if (settings.channel === 'not-set') channel = 'not-set';
          channel = message.guild.channels.get(settings.channel);
          if (!channel) channel = 'missing channel';
          channel = channel.name;
          const embed = new RichEmbed()
            .setColor(message.guild.me.highestRole.hexColor)
            .addField(`Current Welcome Settings for ${message.guild.name}`, `\`\`\`type: ${settings.type}\ncolor: ${settings.color}\nmessage: ${settings.message}\nfooter message: ${settings.footerMessage}\nenabled: ${settings.enabled}\nchannel: ${channel}\`\`\``);
          return message.channel.send(embed);
        };
        break;
      case 'leave_config':
        {
          let settings = client.settings.get(message.guild.id).leave_config;
          let channel;
          if (settings.channel === 'not-set') channel = 'not-set';
          channel = message.guild.channels.get(settings.channel);
          if (!channel) channel = 'missing channel';
          channel = channel.name;
          const embed = new RichEmbed()
            .setColor(message.guild.me.highestRole.hexColor)
            .addField(`Current Welcome Settings for ${message.guild.name}`, `\`\`\`type: ${settings.type}\ncolor: ${settings.color}\nmessage: ${settings.message}\nfooter message: ${settings.footerMessage}\nenabled: ${settings.enabled}\nchannel: ${channel}\`\`\``);
          return message.channel.send(embed);
        };
        break;
      case 'autorole':
        {
          let settings = client.settings.get(message.guild.id).autorole;
          let enabled = settings.enabled;
          let time = settings.time;
          let role;
          if (settings.role === undefined) role = 'not-set';
          role = message.guild.roles.get(settings.role);
          if (!role) role = 'invalid role';
          role = role.name;
          const embed = new RichEmbed()
            .setColor(message.guild.me.highestRole.hexColor)
            .addField(`Current Welcome Settings for ${message.guild.name}`, `\`\`\`enabled: ${enabled}\nrole: ${role}\ntime: ${time}\`\`\``);
          return message.channel.send(embed);
        };
        break;
    };
  };
  if (args[0].toLowerCase() === 'reset') {
    let key = args[1];
    switch (key) {
      case 'all':
        {
          client.settings.set(message.guild.id, client.defaultSettings);
          return reset(message, 'configuration');
        };
        break;
      case 'modlog':
        {
          settings.modLog = 'not-set';
          client.settings.set(message.guild.id, settings);
          return reset(message, 'moderation logs');
        };
        break;
      case 'msglog':
        {
          settings.msgLog = 'not-set';
          client.settings.set(message.guild.id, settings);
          return reset(message, 'message logs');
        };
        break;
      case 'nicklog':
        {
          settings.nickLog = 'not-set';
          client.settings.set(message.guild.id, settings);
          return reset(message, 'nickname logs');
        };
        break;
      case 'serverlog':
        {
          settings.serverLog = 'not-set';
          client.settings.set(message.guild.id, settings);
          return reset(message, 'server logs');
        };
        break;
      case 'rolelog':
        {
          settings.roleLog = 'not-set';
          client.settings.set(message.guild.id, settings);
          return reset(message, 'role logs');
        };
        break;
        break;
      case 'welcome':
        {
          settings.welcome_config = client.defaultSettings.welcome_config;
          client.settings.set(message.guild.id, settings);
          return reset(message, 'welcome configuration');
        };
        break;
      case 'leave':
        {
          settings.leave_config = client.defaultSettings.leave_config;
          client.settings.set(message.guild.id, settings);
          return reset(message, 'leave configuration');
        };
        break;
      case 'autorole':
        {
          settings.autorole = client.defaultSettings.autorole;
          client.settings.set(message.guild.id, settings);
          return reset(message, 'autorole configuration');
        };
        break;
      case 'embed':
        {
          settings.embed = 'default';
          client.settings.set(message.guild.id, settings);
          return reset(message, 'embed configuration');
        };
    };
  };
  //
  const action = args[0].toLowerCase();
  const key = args[1].toLowerCase();
  const value = args.slice(2).join(' ');
  switch (action) {
    case 'edit':
      {
        switch (key) {
          case 'prefix':
            {
              if (value.length > 12) return fail(message, `${value} seems like a long prefix. Try again.`);
              settings.prefix = value;
              client.settings.set(message.guild.id, settings);
              return success(message, 'prefix', value);
            };
            break;
          case 'modlog':
            {
              let channel = message.mentions.channels.first() || message.guild.channels.find(c => c.name === value) || message.guild.channels.find(c => c.name.includes(value)) || message.guild.channels.get(value);
              if (!channel) return fail(message, 'No channel could be found.');
              channel = channel.id;
              let channelName = message.guild.channels.get(channel).name;
              settings.modLog = channel;
              client.settings.set(message.guild.id, settings);
              return success(message, 'moderation logs', channelName);
            };
            break;
          case 'muterole':
            {
              let role = message.mentions.roles.first() || message.guild.roles.find(r => r.name.toLowerCase() === value.toLowerCase()) || message.guild.roles.find(r => r.name.toLowerCase().includes(value)) || message.guild.roles.get(value);
              if (!role) return fail(message, 'No role could be found.');
              role = role.id;
              let roleName = message.guild.roles.get(role).name;
              settings.muteRole = role;
              client.settings.set(message.guild.id, settings);
              return success(message, 'muted role', roleName);
            };
            break;
          case 'rolelog':
            {
              let channel = message.mentions.channels.first() || message.guild.channels.find(c => c.name === value) || message.guild.channels.find(c => c.name.includes(value)) || message.guild.channels.get(value);
              if (!channel) return fail(message, 'No channel could be found.');
              channel = channel.id;
              let channelName = message.guild.channels.get(channel).name;
              settings.roleLog = channel;
              client.settings.set(message.guild.id, settings);
              return success(message, 'role logs', channelName);
            };
            break;
          case 'msglog':
            {
              let channel = message.mentions.channels.first() || message.guild.channels.find(c => c.name === value) || message.guild.channels.find(c => c.name.includes(value)) || message.guild.channels.get(value);
              if (!channel) return fail(message, 'No channel could be found.');
              channel = channel.id;
              let channelName = message.guild.channels.get(channel).name;
              settings.msgLog = channel;
              client.settings.set(message.guild.id, settings);
              return success(message, 'message logs', channelName);
            };
            break;
          case 'nicklog':
            {
              let channel = message.mentions.channels.first() || message.guild.channels.find(c => c.name === value) || message.guild.channels.find(c => c.name.includes(value)) || message.guild.channels.get(value);
              if (!channel) return fail(message, 'No channel could be found.');
              channel = channel.id;
              let channelName = message.guild.channels.get(channel).name;
              settings.nickLog = channel;
              client.settings.set(message.guild.id, settings);
              return success(message, 'nickname logs', channelName);
            };
            break;
          case 'serverlog':
            {
              let channel = message.mentions.channels.first() || message.guild.channels.find(c => c.name === value) || message.guild.channels.find(c => c.name.includes(value)) || message.guild.channels.get(value);
              if (!channel) return fail(message, 'No channel could be found.');
              channel = channel.id;
              let channelName = message.guild.channels.get(channel).name;
              settings.serverLog = channel;
              client.settings.set(message.guild.id, settings);
              return success(message, 'server logs', channelName);
            };
            break;
          case 'welcome':
            {
              if (!args[2] || !args[3]) return client.usage(message, settings.prefix, 'settings');
              const subKey = args[2].toLowerCase();
              const subValue = args.slice(3).join(' ');
              switch (subKey) {
                case 'type':
                  {
                    let type = args[3].toLowerCase();
                    if (type !== 'text' && type !== 'embed') return fail(message, 'Embed types can only be text or embed');
                    settings.welcome_config.type = type;
                    client.settings.set(message.guild.id, settings);
                    return success(message, 'welcome type', type);
                  };
                  break;
                case 'color':
                  {
                    let color = args[3].toLowerCase();
                    settings.welcome_config.color = color;
                    client.settings.set(message.guild.id, settings);
                    return success(message, 'welcome embed color', color);
                  };
                  break;
                case 'message':
                  {
                    let msg = args.slice(3).join(' ');
                    settings.welcome_config.message = msg;
                    client.settings.set(message.guild.id, settings);
                    return success(message, 'welcome message', msg);
                  };
                  break;
                case 'footer':
                  {
                    let msg = args.slice(3).join(' ');
                    settings.welcome_config.footerMessage = msg;
                    client.settings.set(message.guild.id, settings);
                    return success(message, 'welcome embed footer', msg);
                  };
                  break;
                case 'enable':
                  {
                    let enabled = args[3].toLowerCase();
                    if (enabled !== 'true' && enabled !== 'false') return fail(message, 'Response should only be \'true\' or \'false\'');
                    settings.welcome_config.enabled = enabled;
                    client.settings.set(message.guild.id, settings);
                    return success(message, 'welcome', enabled);
                  };
                  break;
                case 'channel':
                  {
                    let channel = message.mentions.channels.first() || message.guild.channels.find(c => c.name === value) || message.guild.channels.find(c => c.name.includes(value)) || message.guild.channels.get(value);
                    if (!channel) return fail(message, 'No channel could be found.');
                    channel = channel.id;
                    let channelName = message.guild.channels.get(channel).name;
                    settings.welcome_config.channel = channel;
                    client.settings.set(message.guild.id, settings);
                    return success(message, 'welcome channel', channelName);
                  };
                  break;
              };
            };
            break;
          case 'leave':
          case 'welcome':
            {
              if (!args[2] || !args[3]) return client.usage(message, settings.prefix, 'settings');
              const subKey = args[2].toLowerCase();
              const subValue = args.slice(3).join(' ');
              switch (subKey) {
                case 'type':
                  {
                    let type = args[3].toLowerCase();
                    if (type !== 'text' && type !== 'embed') return fail(message, 'Embed types can only be text or embed');
                    settings.leave_config.type = type;
                    client.settings.set(message.guild.id, settings);
                    return success(message, 'leave type', type);
                  };
                  break;
                case 'color':
                  {
                    let color = args[3].toLowerCase();
                    settings.leave_config.color = color;
                    client.settings.set(message.guild.id, settings);
                    return success(message, 'leave embed color', color);
                  };
                  break;
                case 'message':
                  {
                    let msg = args.slice(3).join(' ');
                    settings.leave_config.message = msg;
                    client.settings.set(message.guild.id, settings);
                    return success(message, 'leave message', msg);
                  };
                  break;
                case 'footer':
                  {
                    let msg = args.slice(3).join(' ');
                    settings.leave_config.footerMessage = msg;
                    client.settings.set(message.guild.id, settings);
                    return success(message, 'leave embed footer', msg);
                  };
                  break;
                case 'enable':
                  {
                    let enabled = args[3].toLowerCase();
                    if (enabled !== 'true' && enabled !== 'false') return fail(message, 'Response should only be \'true\' or \'false\'');
                    settings.leave_config.enabled = enabled;
                    client.settings.set(message.guild.id, settings);
                    return success(message, 'leave', enabled);
                  };
                  break;
                case 'channel':
                  {
                    let channel = message.mentions.channels.first() || message.guild.channels.find(c => c.name === value) || message.guild.channels.find(c => c.name.includes(value)) || message.guild.channels.get(value);
                    if (!channel) return fail(message, 'No channel could be found.');
                    channel = channel.id;
                    let channelName = message.guild.channels.get(channel).name;
                    settings.leave_config.channel = channel;
                    client.settings.set(message.guild.id, settings);
                    return success(message, 'leave channel', channelName);
                  };
                  break;
              };
            };
            break;
          case 'embed':
            {
              let embedEnabled = args[2].toLowerCase();
              if (embedEnabled !== 'true' && embedEnabled !== 'false') return fail(message, 'Response should only be \'true\' or \'false\'');
              settings.embed = embedEnabled;
              client.settings.set(message.guild.id, settings);
              return success(message, 'embed', embedEnabled);
            };
            break;
          case 'autorole':
            {
              if (!args[2] || !args[3]) return client.usage(message, settings.prefix, 'settings');
              const subKey = args[2].toLowerCase();
              const subValue = args.slice(3).join(' ');
              switch (subKey) {
                case 'enable':
                  {
                    let enabled = args[3].toLowerCase();
                    if (enabled !== 'true' && enabled !== 'false') return fail(message, 'Response should only be \'true\' or \'false\'');
                    settings.autorole.enabled = enabled;
                    client.settings.set(message.guild.id, settings);
                    return success(message, 'autorole', enabled);
                  };
                  break;
                case 'role':
                  {
                    let role = message.mentions.roles.first() || message.guild.roles.find(r => r.name.toLowerCase() === subValue.toLowerCase()) || message.guild.roles.find(r => r.name.toLowerCase().includes(subValue)) || message.guild.roles.get(subValue);
                    if (!role) return fail(message, 'No role could be found.');
                    role = role.id;
                    let roleName = message.guild.roles.get(role).name;
                    settings.autorole.role = role;
                    client.settings.set(message.guild.id, settings);
                    return success(message, 'autorole', roleName);
                  };
                  break;
                case 'time':
                  {
                    let ms = require('ms');
                    let time = args[3];
                    if (isNaN(parseInt(time))) return fail(message, 'Invalid time input.');
                    let msTime = ms(time);
                    if (msTime > 3600000) return fail(message, 'Autorole times cannot exceed 1 hour.');
                    settings.autorole.time = msTime;
                    client.settings.set(message.guild.id, settings);
                    return success(message, 'autorole wait time', ms(ms(time), {
                      long: true
                    }));
                  };
                  break;
                default:
                  {

                  };
              };
            };
          default:
            {

            };
        };
      };
      break;
    case 'view':
      {

      };
      break;
    default:
      {

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
  name: "settings",
  category: "administrator",
  description: "View, edit, or reset the settings for your guild.",
  usage: "[prefix]settings <edit|view|reset> <key> <value>",
  parameters: "stringFlag, stringKey, stringValue",
  extended: 'The settings command can be a bit tricky. If you need help, run the `settings_help` command or join the support server by running the `support` command.'
};