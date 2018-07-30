/*
don't want to clutter up every file with a shitty method to get my total commands...so I wrote in a module xD
*/
module.exports = (client) => {
    const admin = client.commands.admin.length;
    const bot = client.commands.bot.length;
    const dev = client.commands.developer.length;
    const fun = client.commands.fun.length;
    const mod = client.commands.moderation.length;
    const music = client.commands.music.length;
    const utility = client.commands.utility.length;
    const total = admin + bot + dev + fun + mod + music + utility;
    return total; 
};