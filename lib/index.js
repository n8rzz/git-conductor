'use strict';
const chalk = require('chalk');
const minimist = require('minimist');
const path = require('path');
const init = require('./init');
const cliHelp = require('./cli-help');
const command = require('./command');
const {readFileAsync} = require('./file');

const minimistArgs = minimist(process.argv.slice(2), {
    alias: {
        h: 'help',
        v: 'version',
    }
});

/**
 * open `package.json` file and parse it out
 *
 * used when a current version number needs to
 * be displayed
 *
 * @returns {object}
 */
async function parsePackageJsonOptions() {
    const parentDir = path.join(__dirname, '../');
    const pathToPackageJson = path.join(parentDir, 'package.json');
    const rawPackageJson = await readFileAsync(pathToPackageJson, 'utf8');

    return JSON.parse(rawPackageJson);
}

/**
 * Determine if the current command is a `help` or `version` command
 *
 * @param {*} minimistArgs
 * @returns {boolean}
 */
function isHelpOrVersionCommand(minimistArgs) {
    return minimistArgs.h
        || minimistArgs.help
        || minimistArgs.v
        || minimistArgs.version;
}

(async () => {
    console.log(chalk.green('Welcome to Conductor!'));
    const packageJson = await parsePackageJsonOptions();
    const options = {
        version: packageJson.version,
    };
    const commandName = minimistArgs._[0];

    if (isHelpOrVersionCommand(minimistArgs) || typeof commandName === 'undefined') {
        cliHelp(minimistArgs);

        return;
    }

    await init(options);

    command[commandName](minimistArgs);
})();
