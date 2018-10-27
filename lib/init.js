const fs = require('fs');
const path = require('path');
const config = require('./config');
const {readFileAsync, writeFileAsync} = require('./file');
// const RepositoryModel = require('./repository.model');

const defaultOptions = {
    root: process.cwd(),
    children: [],
    activeBranch: ''
};

function isDirectory(source) {
    return fs.lstatSync(source).isDirectory()
};

function getDirectories(source) {
    return fs.readdirSync(source)
        .map((name) => path.join(source, name))
        .filter(isDirectory)
};

async function openOptionsFile(options) {
    return readFileAsync(config.FILENAME, 'utf8')
        .then((data) => {
            return {
                ...options,
                ...JSON.parse(data),
            }
        })
        .catch((error) => fs.writeFileSync(config.FILENAME, JSON.stringify(defaultOptions))
            .then(() => openOptionsFile())
            .catch((writeError) => { throw writeError; })
        );
}

async function updateConfigWithChildDirectoryMeta(storedOptions, directories) {
    console.log('$$$\n', storedOptions, '\n\n');

    for (let i = 0; i < directories.length; i++) {
        const foundDir = directories[i];
        const isStoredOption = storedOptions.children.indexOf(foundDir) !== -1;

        console.log('::: ', i, isStoredOption, foundDir);
    }

    return new Promise((resolve, reject) => resolve());
}

async function init(options) {
    // create .conductor file at user/home
    // -> version number

    // create .conductoropts in current dir

    // find all subDirs with git repos
    // -> write to .conductor [path to dir, active branch]

    const storedOptions = await openOptionsFile(options);
    const directories = getDirectories(storedOptions.root);

    await updateConfigWithChildDirectoryMeta(storedOptions, directories);

    console.log('\n\n');
}

module.exports = init;
