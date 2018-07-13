const { RichEmbed } = require("discord.js");
const moment = require("moment");

module.exports = (client, guild) => {
    const time = moment(guild.createdTimestamp).format("dddd, MMMM Do YYYY, h:mm:ss a");
    let embed = new RichEmbed()
        .setColor("DARK_RED")
        .setAuthor(guild.owner.user.tag, guild.owner.user.displayAvatarURL)
        .setDescription("**Left a guild.**")
        .addField("Guild Name", guild.name, true)
        .addField("Guild ID", guild.id, true)
        .addField("Owned By:", `${guild.owner.user.tag} \n(${guild.owner.user.id})`, true)
        .addField("Member Count", guild.members.size, true)
        .addField("Created On", time, true)
        .setFooter(guild.name, guild.iconURL)
    //client.channels.get("456271425792376843").send(embed);
    client.settings.delete(guild.id);
    client.cases.delete(guild.id);
};
