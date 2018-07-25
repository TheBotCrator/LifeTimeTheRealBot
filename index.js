const {
  Client
} = require('discord.js');
const Enmap = require('enmap');
const EnmapLevel = require('enmap-level');
const fs = require('fs');
require('dotenv').config()
const ytapi = require('simple-youtube-api');

class Utilidex extends Client {
  constructor(options) {
    super(options);
    this.queue = new Map();
    this.YouTube = new ytapi(process.env.YT_API);
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
      'bot': ['help', 'ping', 'ding', 'bug', 'suggestion', 'info', 'uptime'],
      'moderation': ['case', 'reason', 'give', 'take', 'vwarn', 'warn', 'mute', 'unmute', 'kick', 'softban', 'tempban', 'ban', 'hardban', 'forceban', 'unban', 'vcmute', 'vcunmute', 'prune', 'clean'],
      'admin': ['automod', 'hwarn','ignore', 'command', 'lockdown', 'unlock', 'alert', 'settings'],
      'utility': ['members', 'user', 'guild', 'invites', 'invite', 'bans', 'audit', 'channel', 'delchannel', 'emote', 'emotes', 'fetch', 'find', 'guild', 'setname', 'poll', 'remind', 'role', 'makechannel', 'makerole', 'delrole'],
      'fun': ['8ball', 'compliment', 'insult', 'fact', 'flip', 'say', 'sayc', 'urban', 'roll', 'rps'],
      'developer': ['blacklist', 'reload', 'eval'],
      'music':['play', 'skip', 'end', 'pause', 'resume', 'np', 'volume', 'queue', 'q', 'search']
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
fs.readdir('./events/', (err, files) => {
    files.forEach(file => {
        if (!file.endsWith('.js')) return;
        if (err) return console.log(err);
        console.log(client.chalk.green(`Loaded the even ${file}`));
        const eventName = file.split(".")[0];
        const event = new (require(`./events/${file}`))(client);
        client.on(eventName, (...args) => event.run(...args));
        delete require.cache[require.resolve(`./events/${file}`)];
    });
})
client.login(process.env.TOKEN);
process.on('uhandledRejection', (e) => {
  console.log(e.stack)
});

process.on('unhandledPromise', e => console.log(e.stack));
