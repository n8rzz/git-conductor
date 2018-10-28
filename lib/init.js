const fs = require('fs');
const path = require('path');
const config = require('./config');
const {readFileAsync, writeFileAsync} = require('./file');
const RepositoryModel = require('./repository.model');

function isDirectory(source) {
    return fs.lstatSync(source).isDirectory();
};

function getDirectories(source) {
    return fs.readdirSync(source)
        .map((name) => path.join(source, name))
        .filter(isDirectory);
};

async function openOptionsFile(options) {
    return readFileAsync(config.FILENAME, 'utf8')
        .then((data) => {
            return {
                ...options,
                ...JSON.parse(data),
            }
        })
        .catch((error) => {
            return writeFileAsync(config.FILENAME, JSON.stringify(options))
                .then(() => openOptionsFile())
                .catch((writeError) => { throw writeError; });
        });
}

async function updateOptionsFile(updatedOptions) {
    return writeFileAsync(config.FILENAME, JSON.stringify(updatedOptions))
        .catch((writeError) => { throw writeError; });
}

async function updateConfigWithChildDirectoryMeta(storedOptions, directories) {
    const updatedOptions = { ...storedOptions };

    for (let i = 0; i < directories.length; i++) {
        const pathToRepo = directories[i];
        const isStoredRepo = updatedOptions.children.indexOf(pathToRepo) !== -1;
        const repositoryModel = await new RepositoryModel(pathToRepo);

        if (!isStoredRepo && repositoryModel.isValidRepository) {
            updatedOptions.children.push(repositoryModel.toJson());
        }
    }

    return updateOptionsFile(updatedOptions);
}

async function init(defaultOptions) {
    const storedOptions = await openOptionsFile(defaultOptions);
    const directories = getDirectories(storedOptions.root);

    await updateConfigWithChildDirectoryMeta(storedOptions, directories);
}

module.exports = init;
