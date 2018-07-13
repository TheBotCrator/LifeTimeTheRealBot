const { RichEmbed } = require('discord.js');
const regex = /(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li)|discordapp\.com\/invite)\/.+[a-z]/ig;
module.exports.run = async (client, message, args) => {
  const { prefix } = client.settings.get(message.guild.id);
  const invites = await message.guild.fetchInvites();
  if (!args[0]) return client.usage(message, prefix, 'invite');
  message.delete();
  if (client.embedPerms(message) === false) {
    if (invites.size < 1) return message.channel.send(`${client.emotes.warn} \`There are no invite links for this server.\``);
    if (regex.test(message.content) === false) return client.argsError(client, message, 'It appears you did not provide a valid invite, or no invite was provided.');
    if (!invites.has(invite)) return message.channel.send(`${client.emotes.x} That invite is not valid on this server.`);
    invite = invites.find(i => i.code === invite);
    const inviter = `${invite.inviter.username}#${invite.inviter.discriminator}`;
    const createdAt = client.moment(invite.createdAt).format('dddd, MMMM Do, YYYY, hh:mm:ss A');
    const expiresAt = client.moment(invite.expiresAt).format('dddd, MMMM Do, YYYY, hh:mm:ss A');
    const maxAge = invite.maxAge;
    const maxUses = invite.maxUses;
    const members = invite.membercount === undefined ? 'N/A' : invite.membercount;
    const temp = invite.temporary ? 'No' : 'Yes';
    const uses = invite.uses;
    const code = invite.code;
    return message.channel.send(`Invite information for \`${code}\`\n\`\`\`Inviter: ${inviter}\nCreated On: ${createdAt}\nExpires On: ${expiresAt}\nMax Age: ${maxAge}\nMax Uses: ${maxUses}\nMembers: ${members}\nTemporary: ${temp}\n\n${uses} members have used this invite.\`\`\``);
  } else {
    if (invites.size < 1) return client.argsError(client, message, 'There are no invites for this server.');
        if (regex.test(message.content) === false) return client.argsError(client, message, 'It appears you did not provide a valid invite, or no invite was provided.');
    if (!invites.has(invite)) return client.argsError(client, message, 'That invite is not valid on this server.');
    invite = invites.find(i => i.code === invite);
    const inviter = `${invite.inviter.username}#${invite.inviter.discriminator}`;
    const createdAt = client.moment(invite.createdAt).format('dddd, MMMM Do, YYYY, hh:mm:ss A');
    const expiresAt = client.moment(invite.expiresAt).format('dddd, MMMM Do, YYYY, hh:mm:ss A');
    const maxAge = invite.maxAge;
    const maxUses = invite.maxUses;
    const members = invite.membercount === undefined ? 'N/A' : invite.membercount;
    const temp = invite.temporary ? 'No' : 'Yes';
    const uses = invite.uses;
    const code = invite.code;
    const embed = new RichEmbed()
      .setColor(message.guild.me.highestRole.hexColor)
      .setAuthor(message.guild.name, message.guild.iconURL)
      .setDescription(`Invite information for \`${code}\``)
      .addField('Inviter', inviter, true)
      .addField('Members', members, true)
      .addField('Temporary?', temp, true)
      .addField('Maximum Age', maxAge, true)
      .addBlankField(true)
      .addField('Maximum Uses', maxUses, true)
      .addField('Created On', createdAt, true)
      .addField('Expires On', expiresAt, true)
      .setFooter(`${uses} members have used this invite.`);
    return message.channel.send(embed);
  };
};

module.exports.conf = {
  enabled: true,
  reason: null,
  permission: 'SEND_MESSAGES',
  devOnly: false
};

module.exports.help = {
  name: 'invite',
  category: 'UTILITY',
  description: 'Returns information on an invite link in the guild.',
  usage: '[prefix]invite <code>',
  parameters: 'snowflakeGuildInvite',
  extended: 'Emotes can contain the `discord.gg/` found on most invites, or just the invite code.'
};
