# git-conductor

`$ conductor [COMMAND]`

Perform bulk commands on multiple git repositories at once

## list

lists registered repositories

## pull

performs `git pull`

* will use the current active branch in each repo
* when a repo has uncommitted changes, you will have the option to:
  * reset current changes (changes will be lost) and pull
  * skip

## pull SUBCOMMAND

### -p

performs `git pull`

* when a repo has uncommitted changes, you will have the option to:
  * reset current changes (changes will be lost) and pull
  * skip

### -b BRANCH

performs `git pull`  using BRANCH on each repository

* when a repo does not have a branch BRANCH, it will be skipped
* when a repo has uncommitted changes, you will have the option to:
  * reset current changes (changes will be lost) and pull
  * skip
