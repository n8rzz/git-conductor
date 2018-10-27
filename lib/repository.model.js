function RepositoryModel(path) {
    return this._init();
}

RepositoryModel.prototype._init = function _init(path) {
    /**
     *
     * @type {string}
     */
    this.path = path;

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
    this.remoteNameList = [];

    /**
     *
     *
     * @type {boolean}
     */
    this.isTrusted = false;

    return this._extractRepositoryMeta();
};

RepositoryModel.prototype._extractRepositoryMeta = function _extractRepositoryMeta() {
    console.log('_extractRepositoryMeta()');

    return this._getBranchList()
        ._getActiveBranch()
        ._getRemoteNames()
};

RepositoryModel.prototype._getBranchList = function _getBranchList() {
    console.log('_getBranchList()');

    return this;
};

RepositoryModel.prototype._getActiveBranch = function _getActiveBranch() {
    console.log('_getActiveBranch()');

    return this;
};

RepositoryModel.prototype._getRemoteNames = function _getRemoteNames() {
    console.log('_getRemoteNames()');

    return this;
};

module.exports = RepositoryModel;
