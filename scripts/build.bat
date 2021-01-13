@ECHO OFF
CD ..\snake-game

@REM This command prevents the batch file from carrying on executing the lines below
@REM Change npm run release to "npm run build && ..\\scripts\\build.bat" in package.json
@REM npm run build


ECHO Delete current release folder content
DEL /F/Q/S ..\tmp\*.* > NUL
RMDIR /Q/S ..\tmp

@REM Connect tmp to gh-pages
MKDIR ..\tmp
CD ..\tmp
git init
git remote add origin https://github.com/KMurphs/snake-game
git fetch origin gh-pages
git checkout -t origin/gh-pages
git checkout -b mybranch

ECHO Copy Github page files
@REM Github Pages expect the entry point to be index.md or readme.md 
ROBOCOPY ..\github-pages ..\tmp\docs\ /MIR /NFL /NDL 
COPY ..\readme.md ..\tmp\docs
@REM COPY ..\snake-game\build\favicon.ico ..\tmp


ECHO Copy release files
@REM https://stackoverflow.com/a/7487697/9034699
@REM MKDIR ..\docs\
ROBOCOPY ..\snake-game\build ..\tmp\ /MIR /NFL /NDL 





ECHO Push to origin
CD ..
git add *
git commit -m "Released current automated build to Github page"
git push origin gh-pages --force

ECHO Return to original directory
CD .\snake-game