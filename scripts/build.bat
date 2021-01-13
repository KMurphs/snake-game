@ECHO OFF
CD ..\snake-game

@REM This command prevents the batch file from carrying on executing the lines below
@REM Change npm run release to "npm run build && ..\\scripts\\build.bat" in package.json
@REM npm run build


ECHO Delete current release folder content
DEL /F/Q/S ..\tmp\docs\*.* > NUL
RMDIR /Q/S ..\tmp\docs
DEL /F/Q/S ..\tmp\*.* > NUL


@REM Connect tmp to gh-pages
CD ..\tmp
git init
git remote add origin https://github.com/KMurphs/snake-game



ECHO Copy Github page files
@REM Github Pages expect the entry point to be index.md or readme.md 
ROBOCOPY ..\github-pages ..\tmp\docs\ /MIR /NFL /NDL 
COPY ..\readme.md ..\tmp\docs
COPY build\favicon.ico ..\tmp


ECHO Copy release files
@REM https://stackoverflow.com/a/7487697/9034699
@REM MKDIR ..\docs\
ROBOCOPY build ..\tmp\ /MIR /NFL /NDL 





ECHO Push to origin
CD ..
git add *
git commit -m "Released current automated build to Github page"
git push origin gh-pages --force

ECHO Return to original directory
CD .\snake-game