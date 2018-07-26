class Command {
    constructor(client, {
        name = null,
        category = null,
        description = null,
        usage = null,
        parameters = null,
        extended = false,
        extended_help = null,
        enabled = true,
        reason = null,
        permission = 'SEND_MESSAGES',
        guildOnly = true,
        devOnly = false,
        cooldown = 0,
        aliases = new Array()
    }) {
        this.client = client;
        this.help = { name, category, description, usage, parameters, extended, extended_help };
        this.conf = { enabled, reason, permission, guildOnly, devOnly, cooldown, aliases };
    };
};

module.exports = Command;