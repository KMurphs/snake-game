@REM https://stackoverflow.com/a/63972169
@REM In Powershell
code.cmd --list-extensions > code.extensions
cat code.extensions |% { code.cmd --install-extension $_}