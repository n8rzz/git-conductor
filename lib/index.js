'use strict';
const chalk = require('chalk');
const minimist = require('minimist');
const cliHelp = require('./cli-help');

const minimistArgs = minimist(process.argv.slice(2), {
    alias: {
        h: 'help',
        v: 'version',
    }
});

// hasMultipleRepos()
//     ? collect;
//     : error; quit;

// processSubCommand()

function isHelpOrVersionCommand(minimistArgs) {
    return minimistArgs.h
        || minimistArgs.help
        || minimistArgs.v
        || minimistArgs.version;
}

(() => {
    console.log(chalk.green('Welcome to Conductor!'));
    // console.log(minimistArgs);

    if (isHelpOrVersionCommand(minimistArgs)) {
        cliHelp(minimistArgs);

        return;
    }

    console.log('+++ not help', minimistArgs);
})();
