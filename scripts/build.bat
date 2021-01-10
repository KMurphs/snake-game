@ECHO OFF
CD ..\table-sorting

@REM This command prevents the batch file from carrying on executing the lines below
@REM Change npm run release to "npm run build && ..\\scripts\\build.bat" in package.json
@REM npm run build


ECHO Delete current release folder content
DEL /F/Q/S ..\docs\app\*.* > NUL
RMDIR /Q/S ..\docs\app
DEL /F/Q/S ..\docs\*.* > NUL


ECHO Copy Github page files
@REM Github Pages expect the entry point to be index.md or readme.md 
ROBOCOPY ..\github-pages ..\docs\ /MIR /NFL /NDL 
COPY ..\readme.md ..\docs
COPY build\favicon.ico ..\docs


ECHO Copy release files
@REM https://stackoverflow.com/a/7487697/9034699
MKDIR ..\docs\app
ROBOCOPY build ..\docs\app /MIR /NFL /NDL 





ECHO Push to origin
CD ..
git add *
git commit -m "Released current automated build to Github page"
git push 

ECHO Return to original directory
CD .\table-sorting