module.exports.bot = (message, member) => {
  return (member.highestRole.calculatedPosition >= message.guild.me.highestRole.calculatedPosition);
};

module.exports.role = (message, role) => {
  const findRole = message.guild.roles.find(r => r.name.toLowerCase() === role)
  || message.guild.roles.find(r => r.name.toLowerCase().includes(role.toLowerCase()))
  || message.guild.roles.get(role);
  const pos = findRole.calculatedPosition;
  return (pos >= message.guild.me.highestRole.calculatedPosition);
};
