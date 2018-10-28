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
    const commandName = minimistArgs._[0];
    const packageJson = await parsePackageJsonOptions();
    const defaultOptions = {
        version: packageJson.version,
        lastUpdate: (new Date()).getTime(),
        root: process.cwd(),
        children: [],
        activeBranch: 'master'
    };

    if (isHelpOrVersionCommand(minimistArgs) || typeof commandName === 'undefined') {
        cliHelp(minimistArgs, packageJson.version);

        return;
    }

    console.log(chalk.green('\n\n::: --- Welcome to Conductor! --- :::\n\n'));

    const options = await init(defaultOptions);

    command[commandName](minimistArgs);
})();
