const { RichEmbed } = require("discord.js");

module.exports = (client, guild) => {
    const time = client.moment(guild.createdTimestamp).format("dddd, MMMM Do YYYY, h:mm:ss a");
    let embed = new RichEmbed()
        .setColor('DARK_GREEN')
        .setAuthor(guild.owner.user.tag, guild.owner.user.displayAvatarURL)
        .setDescription("**Joined a new guild.**")
        .addField("Guild Name", guild.name, true)
        .addField("Guild ID", guild.id, true)
        .addField("Owned By:", `${guild.owner.user.tag} \n(${guild.owner.user.id})`, true)
        .addField("Member Count", guild.members.size, true)
        .addField("Created On", time, true)
        .setFooter(guild.name, guild.iconURL)
    //client.channels.get("456271425792376843").send(embed);
    client.settings.set(guild.id, client.defaultSettings);
    client.cases.set(guild.id, client.defaultCases);
    // client.commands.set(guild.id, client.cmdDefault);
};
