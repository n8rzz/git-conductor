const help = require('./help');

function _help(helpKey) {
    if (!help.dictionary.hasOwnProperty(helpKey)) {
        console.log(`${helpKey} command not found. Try \`conductor -h\` for a list of commands`);

        return;
    }

    console.log(help.dictionary[helpKey]);
}

function cliHelp(minimistArgs) {
    const isVersion = minimistArgs.v || minimistArgs.version;

    if (isVersion) {
        _help(help.type.VERSION);

        return;
    }

    const command = minimistArgs._;

    if (!command || command.length === 0) {
        _help(help.type.GENERAL);

        return
    }

    _help(command);
}

module.exports = cliHelp;
