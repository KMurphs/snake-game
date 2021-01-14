@REM Script MACROs
SET GH_PAGES_REMOTE_REPO=https://github.com/KMurphs/snake-game
SET GH_PAGES_REMOTE_BRANCH=gh-pages

SET GH_PAGES_LOCAL_FOLDER=.gh-pages
SET GH_PAGES_LOCAL_TMP_FOLDER=.tmp





@REM Make a local folder to help releasing to github pages
MKDIR %GH_PAGES_LOCAL_FOLDER%
CD %GH_PAGES_LOCAL_FOLDER%
MKDIR repo
MKDIR config



@REM Connect local folder to remote branch at remote repo
@REM The remote branch (typically gh-pages) is the branch from which github pages are built
CD repo
git init
git remote add origin %GH_PAGES_REMOTE_REPO%
git fetch origin %GH_PAGES_REMOTE_BRANCH%
git checkout -b %GH_PAGES_REMOTE_BRANCH%
git checkout -t origin/%GH_PAGES_REMOTE_BRANCH% --force


@REM Manually copy _config.yml and assets to config
CD config



@REM Instruct .gitignore of files to exclude 
CD ..\..
ECHO %GH_PAGES_LOCAL_TMP_FOLDER% >> ..\.gitignore
ECHO %GH_PAGES_LOCAL_FOLDER%/repo >> ..\.gitignore
