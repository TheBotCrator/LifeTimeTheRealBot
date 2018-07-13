module.exports = (message, role) => {
  const toFind = message.guild.roles.find(r => r.name.toLowerCase() === role) || message.guild.roles.find(r => r.name.toLowerCase().includes(role.toLowerCase())) || message.guild.roles.get(role);

  if (toFind) {
    return true;
  } else {
    return false;
  };
};
