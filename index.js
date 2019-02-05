const { Client } = require('discord.js');
const Enmap = require('enmap');
const EnmapLevel = require('enmap-level');
const { promisify } = require('util');
const readdir = promisify(require("fs").readdir);
const klaw = require('klaw');
const path = require('path');
require('dotenv').config()

class LifeTimeBot extends Client {
  constructor(options) {
    super(options);
    this.chalk = require('chalk');
    this.moment = require('moment');
    this.defaultSettings = require('./functions/defaultSettings.js');
    this.emotes = {
      x: '<:burritobotREDx:454452324455284738>',
      check: '<:burritobotGREENcheckmark:454452324413210624>',
      warn: '<:smile:>'
    };
    this.settings = new Enmap({ provider: new EnmapLevel({ name: 'settings' }) });
    this.cases = new Enmap({ provider: new EnmapLevel({ name: 'moderation_cases' }) });
    this.defaultCases = {
      'cases': 0
    };
    this.color = '36393E';
    this.commands = {
      'bot': ['help', 'ping', 'ding', 'bug', 'suggestion', 'info', 'uptime'],
      'moderation': ['case', 'reason', 'give', 'take', 'vwarn', 'warn', 'mute', 'unmute', 'kick', 'softban', 'tempban', 'ban', 'hardban', 'forceban', 'unban', 'vcmute', 'vcunmute', 'prune', 'clean'],
      'admin': ['automod', 'hwarn','ignore', 'command', 'lockdown', 'unlock', 'alert', 'settings'],
      'utility': ['members', 'user', 'guild', 'invites', 'invite', 'bans', 'audit', 'channel', 'delchannel', 'emote', 'emotes', 'fetch', 'find', 'guild', 'setname', 'poll', 'remind', 'role', 'makechannel', 'makerole', 'delrole'],
      'fun': ['8ball', 'compliment', 'insult', 'fact', 'flip', 'say', 'sayc', 'urban', 'roll', 'rps'],
      'developer': ['serverdata', 'blacklist', 'reload', 'eval'],
      'music':['play', 'skip', 'end', 'pause', 'resume', 'np', 'volume', 'queue', 'q', 'search']
    };
    this.cmds = new Enmap();
    this.aliases = new Enmap();
    this.embedPerms = require('./functions/embedPerms.js');
    this.channelExists = require('./functions/channelExists.js');
    this.roleExists = require('./functions/roleExists.js');
    this.argsError = require('./functions/errors/arguments.js');
    this.permsError = require('./functions/errors/permissions.js');
    this.misc = require('./functions/errors/misc.js');
    this.roleHierarchy = require('./functions/roleHierarchy.js');
    this.usage = (message, prefix, cmd) => {
      message.delete(), message.channel.send(`${this.emotes.x} Incorrect usage. Run \`${prefix}help ${cmd}\` for help.`);
    };
    this.total = require('./modules/total_commands.js');
  };
  loadCommand(commandPath, commandName) {
    try {
      const props = new (require(`${commandPath}${path.sep}${commandName}`))(this);
      console.log(this.chalk.bgBlack.green(`Loaded Command: ${props.help.name} | Aliases: [${props.conf.aliases.join(', ')}]`));
      props.conf.location = commandPath;
      if (props.init) {
        props.init(this);
      }
      this.cmds.set(props.help.name, props);
      props.conf.aliases.forEach(alias => {
        this.aliases.set(alias, props.help.name);
      });
      return false;
    } catch (e) {
      return this.chalk.bgBlack.redBright(`Unable to load command ${commandName}: ${e.message}`);
    };
  };
  async unloadCommand(commandPath, commandName) {
    let command;
    if (this.cmds.has(commandName)) {
      command = this.cmds.get(commandName);
    } else if (this.aliases.has(commandName)) {
      command = this.cmds.get(this.aliases.get(commandName));
    }
    if (!command) return `The command \`${commandName}\` is not recognized by the bot.`;

    if (command.shutdown) {
      await command.shutdown(this);
    }
    delete require.cache[require.resolve(`${commandPath}${path.sep}${commandName}.js`)];
    return false;
  };
};

const client = new Utilidex();
const init = async () => {
  klaw("./commands").on("data", (item) => {
    const cmdFile = path.parse(item.path);
    if (!cmdFile.ext || cmdFile.ext !== ".js") return;
    const response = client.loadCommand(cmdFile.dir, `${cmdFile.name}${cmdFile.ext}`);
    if (response) console.error(response);
  });
  const evtFiles = await readdir("./events/");
  console.log(`Loading a total of ${evtFiles.length} events`);
  evtFiles.forEach(file => {
    const eventName = file.split(".")[0];
    console.log(client.chalk.bgBlack.green(`Loaded the event ${eventName}`));
    const event = new (require(`./events/${file}`))(client);
    client.on(eventName, (...args) => event.run(...args));
    delete require.cache[require.resolve(`./events/${file}`)];
  });
};

init();

client.login(process.env.NTQxOTUxNTQ4NDk0ODM5ODA4.DzuiFA.TOHhfzYp4GcsuxzEU2fveMFNzPU);
process.on('uhandledRejection', (e) => {
  console.log(e.stack)
});
