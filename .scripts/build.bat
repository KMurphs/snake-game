@ECHO OFF
SET APP_FOLDER=snake-game
SET GH_PAGES_WORKING_FOLDER=.tmp
SET GH_PAGES_ASSET_FOLDER=github-pages
SET GH_PAGES_REMOTE_BRANCH=gh-pages

CD ..\%APP_FOLDER%

@REM This command prevents the batch file from carrying on executing the lines below
@REM Change npm run release to "npm run build && ..\\scripts\\build.bat" in package.json
@REM npm run build


ECHO Delete current release folder content
DEL /F/Q/S ..\%GH_PAGES_WORKING_FOLDER%\*.* > NUL
RMDIR /Q/S ..\%GH_PAGES_WORKING_FOLDER%
MKDIR ..\%GH_PAGES_WORKING_FOLDER%




ECHO Copy release files, github pages files and import connection to remote gh-pages branch 
@REM https://stackoverflow.com/a/7487697/9034699
ROBOCOPY build ..\%GH_PAGES_WORKING_FOLDER%\ /MIR /NFL /NDL 
ROBOCOPY ..\%GH_PAGES_ASSET_FOLDER%\config ..\%GH_PAGES_WORKING_FOLDER%\docs\ /MIR /NFL /NDL 
ROBOCOPY ..\%GH_PAGES_ASSET_FOLDER%\repo\.git ..\%GH_PAGES_WORKING_FOLDER%\.git /MIR /NFL /NDL 

COPY ..\readme.md ..\%GH_PAGES_WORKING_FOLDER%\docs
COPY build\favicon.ico ..\%GH_PAGES_WORKING_FOLDER%\docs




ECHO Push to origin
CD ..\%GH_PAGES_WORKING_FOLDER%
git add *
git commit -m "Released current automated build to Github page"
git push origin gh-pages --force


ECHO Return to original directory
CD ..\%APP_FOLDER%