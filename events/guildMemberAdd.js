const { RichEmbed } = require('discord.js');

module.exports = async (client, member) => {
      console.log('oof')
  const { welcome_config, autorole } = client.settings.get(member.guild.id);
      console.log('oof')
  //check if both the welcome config and autorole are disabled
  // if (welcome_config.enabled === false && autorole.enabled === false) return;
  // console.log('oofdsss')
  //''
  //check if the welcome config is enabled but autorole is not
  console.log(autorole.enabled);
  if (welcome_config.enabled === true) {
    console.log('oof2')
    const channel = member.guild.channels.get(welcome_config.channel);
    console.log(channel);
    if (!channel) return;
    if (welcome_config.type === 'text') {
      let msg = welcome_config.message;
      //{user}, {tag}, {mention}, {actage}, {size}, {guild}
      msg = msg.replace('{user}', member.user.username);
      msg = msg.replace('{tag}', member.user.tag);
      msg = msg.replace('{mention}', member.user);
      msg = msg.replace('{actage}', client.moment(member.user.createdAt).fromNow());
      msg = msg.replace('{size}', member.guild.members.size);
      msg = msg.replace('{guild}', member.guild.name);
      return channel.send(msg);
    } else if (welcome_config.type === 'embed') {
      let msg = welcome_config.message;
      //{user}, {tag}, {mention}, {actage}, {size}, {guild}
      msg = msg.replace('{user}', member.user.username);
      msg = msg.replace('{tag}', member.user.tag);
      msg = msg.replace('{mention}', member.user);
      msg = msg.replace('{actage}', client.moment(member.user.createdAt).fromNow());
      msg = msg.replace('{size}', member.guild.members.size);
      msg = msg.replace('{guild}', member.guild.name);
      const embed = new RichEmbed()
        .setColor(welcome_config.color)
        .setAuthor(member.guild.name, member.guild.iconURL)
        .setDescription(msg)
        .setThumbnail(member.user.displayAvatarURL)
        .setFooter(welcome_config.footerMessage === 'not-set' ? ' ' : welcome_config.footerMessage);
      return channel.send(member.user, embed);
    };
  };
  //chck if autorole is enabled but welcome config is not
  // if (welcome_config.enabled === false && autorole.enabled === true) {
  //   const toRole = member.guild.roles.get(autorole.role);
  //   if (!toRole) return;
  //   if (client.roleHierarchy(message, toRole) === true) return;
  //   const waitTime = setTimeout(() => {
  //     member.addRole(autorole.role, 'Utilidex Autorole');
  //   }, (autorole.time));
  //   let time = autorole.time === null ? true : false;
  //   if (time === false) return waitTime;
  //   if (time === true) return member.addRole(autorole.role, 'Utilidex Autorole');
  // };
  //check if both are enabled
  //try both
};
