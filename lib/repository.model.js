const fs = require('fs');
const path = require('path');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

let _id = 0;

/**
 *
 *
 * @class RepositoryModel
 * @param {string} pathToRepo
 */
function RepositoryModel(pathToRepo) {
    return this._init(pathToRepo);
}

RepositoryModel.prototype._init = function _init(pathToRepo) {
    /**
     *
     *
     * @type {number}
     */
    this._id = (_id)++;

    /**
     * Path object
     *
     * @type {object{dir: string, root: string, base: string, ext: string}}
     */
    this.path = pathToRepo;

    /**
     *
     *
     * @type {string}
     */
    this.activeBranchName = '';

    /**
     *
     *
     * @type {string[]}
     */
    this._remoteNameList = [];

    /**
     *
     *
     * @type {boolean}
     */
    this._isTrusted = false;

    /**
     *
     *
     * @type {boolean}
     */
    this.isValidRepository = false;

    return this._extractRepositoryMeta();
};

RepositoryModel.prototype.fromJson = function fromJson(json) {
    this.path = json.path;
    this.activeBranchName = json.activeBranchName;
}

RepositoryModel.prototype.toJson = function toJson() {
    return {
        path: this.path,
        activeBranchName: this.activeBranchName,
    };
}

RepositoryModel.prototype._extractRepositoryMeta = async function _extractRepositoryMeta() {
    this._validateRepository();

    try {
        await this._getBranchList();
        this._getRemoteNames();

        return this;
    } catch (error) {
        console.log('!!! !!!', error);
    }
};

RepositoryModel.prototype._validateRepository = function _validateRepository() {
    const pathToGitFolder = path.join(this.path, '.git');

    try {
        this.isValidRepository = fs.lstatSync(pathToGitFolder).isDirectory();
    } catch(error) {
        this.isValidRepository = false;
    }
}

RepositoryModel.prototype._getBranchList = async function _getBranchList() {
    if (!this.isValidRepository) {
        return this;
    }

    await exec('git branch', {cwd: this.path})
        .then(({ stdout }) => {
            const branchNames = stdout.trim().split('\n');
            const activeBranch = branchNames.filter((branch) => branch.indexOf('* ') !== -1)[0];

            this.activeBranchName = activeBranch.slice(2);
        })
        .catch((error) => { throw error; });
};

RepositoryModel.prototype._getRemoteNames = function _getRemoteNames() {
    if (!this.isValidRepository) {
        return this;
    }

    return this;
};

module.exports = RepositoryModel;
