const {
  RichEmbed
} = require("discord.js");

module.exports.run = (client, message, args) => {;
  let then = Date.now();
  return message.channel.send(":stopwatch: ***Pinging...***").then(msg => {
    let embed = new RichEmbed()
      .setColor(message.guild.me.highestRole.hexColor)
      .setAuthor(client.user.username, client.user.displayAvatarURL)
      .setDescription(`Pong! It took me **${Date.now() - then}**ms to send that message.`)
      .addField(':heartbeat:Discord Heartbeat', `**${client.ping.toFixed()}**ms`);
    msg.edit(embed);
  });
};
module.exports.conf = {
  enabled: true,
  reason: null,
  permission: 'SEND_MESSAGES',
  devOnly: false
};

module.exports.help = {
  name: "ping",
  category: "bot",
  description: "Checks the bot's latency and connection speed to the Discord API.",
  usage: "[prefix]ping",
  parameters: "None",
  extended: false
};