module.exports = (message, channel) => {
  const find = message.guild.channels.find(c => c.name === channel) || message.guild.channels.find(c => c.name.includes(channel)) || message.guild.channels.get(channel);
  if (find) {
    return true;
  } else {
    return false;
  };
};
