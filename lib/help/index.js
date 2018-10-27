const generalHelp = `
VERISON
    0.0.1 - This is only the beginning

USAGE
  $ conductor [command] [option] [argument]

COMMAND:
    list    lists all registered repositories and current active branch
    pull    perform \`git pull\` on all registered repositories using active branch in each repo

SUB-COMMAND:
    -p, prompt
    -b, branch
`;

const listhelp = `
USAGE
  $ conductor list

    * lists each registered repository and current active branch

EXAMPLE:
  $ conductor list
`;

const pullHelp = `
USAGE
  $ conductor pull [SUBCOMMAND] [ARGUMENT]

    * will use the current active branch in each repo
    * when a repo has uncommitted changes it will be skipped

SUBCOMMAND:
  -p         will provide prompt when a repo has uncommitted changes
  -b BRANCH  will attempt to pull using BRANCH for all repos

EXAMPLE:
  $ conductor pull
  $ conductor pull -p
  $ conductor pull -b master
`;

const versionHelp = `0.0.1`;

const helpType = {
    GENERAL: 'help',
    LIST: 'list',
    PULL: 'pull',
    VERSION: 'version',
};
const helpDictionary = {
    help: generalHelp,
    list: listhelp,
    pull: pullHelp,
    version: versionHelp,
}

module.exports ={
    type: helpType,
    dictionary: helpDictionary
};
