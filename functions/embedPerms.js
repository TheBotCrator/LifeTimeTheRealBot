module.exports = (message) => {
  return (message.guild.me.permissions.has('EMBED_LINKS'));
};
