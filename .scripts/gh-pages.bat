REM Make a folder helper to help releasing to github pages
CD gh-pages
MKDIR repo
MKDIR config

REM Connect repo to remote branch gh-pages from which github pages are built
CD repo
git init
git remote add origin https://github.com/KMurphs/snake-game
git fetch origin gh-pages
git checkout -b gh-pages
git checkout -t origin/gh-pages --force


REM Copy _config.yml and assets to config
CD config


CD ..\..
ECHO .tmp >> ..\.gitignore
ECHO .gh-pages/repo >> ..\.gitignore
