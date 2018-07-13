const {
  Client
} = require('discord.js');
const Enmap = require('enmap');
const EnmapLevel = require('enmap-level');
const fs = require('fs');
require('dotenv').config()

class Utilidex extends Client {
  constructor(options) {
    super(options);
    this.chalk = require('chalk');
    this.moment = require('moment');
    this.defaultSettings = require('./functions/defaultSettings.js');
    this.emotes = {
      x: '<:burritobotREDx:454452324455284738>',
      check: '<:burritobotGREENcheckmark:454452324413210624>',
      warn: '<:burritobotYELLOWwarning:454452324807475222>'
    };
    this.settings = new Enmap({ provider: new EnmapLevel({ name: 'settings' }) });
    this.cases = new Enmap({ provider: new EnmapLevel({ name: 'moderation_cases' }) });
    this.defaultCases = {
      'cases': 0
    };
    this.moderation = [];
    this.color = '36393E';
    this.runHelp = require('./functions/help.js');
    this.commands = {
      'bot': ['help', 'ping', 'bug', 'suggestion', 'info', 'uptime'],
      'moderation': ['reason', 'give', 'take', 'vwarn', 'warn', 'mute', 'unmute', 'kick', 'softban', 'tempban', 'ban', 'hardban', 'forceban', 'unban', 'vcmute', 'vcunmute', 'prune', 'clean'],
      'admin': ['hwarn','ignore', 'command', 'lockdown', 'unlock', 'alert', 'settings'],
      'utility': ['user', 'guild', 'invites', 'invite', 'bans', 'audit', 'channel', 'delchannel', 'emote', 'emotes', 'fetch', 'find', 'guild', 'setname', 'poll', 'remind', 'role', 'makerole', 'delrole'],
      'fun': ['8ball', 'compliment', 'insult', 'fact', 'flip', 'say', 'sayc', 'urban', 'roll', 'rps'],
      'developer': ['blacklist', 'reload', 'eval'],
      'misc': ['selfrole']
    };
    this.blacklist = [];
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
  };
};

const client = new Utilidex();
fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    console.log(client.chalk.cyanBright(`Loaded the event ${file}`));
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
    delete require.cache[require.resolve(`./events/${file}`)];
  });
});
client.login(process.env.TOKEN);
process.on('uhandledRejection', (e) => {
  console.log(e.stack)
});
