module.exports = (client) => {
  console.log(client.chalk.bgBlack.greenBright(`${client.user.tag} logged in.`));
  client.user.setActivity('$help | @Utilidex prefix', {
    type: 'PLAYING'
  });
};