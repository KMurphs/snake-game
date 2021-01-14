# [Game Snake](https://github.com/KMurphs/snake-game.git)


- A live version of the project is displayed at: [https://kmurphs.github.io/snake-game](https://kmurphs.github.io/snake-game)

- See a styled version of this documentation at: [https://kmurphs.github.io/snake-game/docs](https://kmurphs.github.io/snake-game/docs)



## Overview

-  Project was born as an evaluation for the complexity involved in writing a simple **Game**. The **Snake Game** consists of snake that moves on grid within border that it must never hit. Regularily a crumb is randomly placed on the screen. The snake comsumes the crumb, grows and gets points. After a maximum is reached, the user is proclaimed winner, and the game restart at a faster pace everytime.
-  Due to the number of components that had to interact with each other, **Redux** is used as a central **State Management Store** is used for the application. This allowed for a clearer picture and conceptualization of the program inner workings.
-  The project is written in **Javascript/Typescript**, an makes uses of **TailwindCSS**.
-  The project was consciously written in a more **Functional Programming** style as opposed to the familiar **Object Oriented Programming**. As such, ceraful attention is paid to **Side effects** and using **Pure functions** whenever possible. 
-  The **Functional Programming** paradigm is being learnt, and the project is used as playground to play with concepts and ways of thinking and explore how they compare to **OOP**'s own concepts and way of thinking.



## Definition

The **Snake Game** consists of snake that moves on grid within border that it must never hit. Regularily a crumb is randomly placed on the screen. The snake comsumes the crumb, grows and gets points. After a maximum is reached, the user is proclaimed winner, and the game restart at a faster pace everytime.

**Duration**: 8 hours 

**Tools, Technologies, Skills**: Javascript, Typescript, React, React Router, Redux, State Management

**Languages**: Javascript/Typescript



## Context

The project was motivated by the ``#100DaysOfCode`` twitter movement. Each day for 100days, I work on some project.  




## Setup, Run, Build, Release the Script/Application
1. In order to setup a machine to compile this project, ``NodeJS`` and ``npm`` must be installed on the machine. 

2. Clone the project and Install packages:

```
mkdir snake-game

cd snake-game

git clone https://github.com/KMurphs/snake-game.git

npm install
```

3. From the command line 

    - To Run: ``npm start``
    - To Build: ``npm build``
    - To Release: ``npm run release``




## Github Page

To support github pages and allows automatic release to remote repo/branch:

1. ``.gh-pages`` is created at the root level (One can use ``.\.scripts\gh-pages.bat`` to setup this folder). 
It contains:
    
    - ``repo``: A folder connected to the repo's ``origin`` at branch ``gh-pages``. This is the branch from which the github pages are built. 

    - ``config``: Contains various files for the appearance of the github pages. 
        - ``assets``: Contains the css/scss stylesheet.
        - ``_config.yml``: Contains configuration information for the pages.

2. On release, a temporary folder is created and setup using the files above. It is also connected to ``origin\gh-pages``. A commit and push are automatically triggered from there which cause its content to be uploaded to the remote branch, built and made live at:

    - The Game: [https://kmurphs.github.io/snake-game](https://kmurphs.github.io/snake-game)

    - This Documentation: [https://kmurphs.github.io/snake-game/docs](https://kmurphs.github.io/snake-game/docs)




## Issues

- In some instances, **React Router** does not play nicely with **Github Pages**. <br/> If we are at ``<app-base-url>\<react-router-url>``, and the refresh button is hit. The browser interprets it as a request to the backend (the server that powers the Github Pages) for a resources which is located at that address. <br/><br/> Obvioulsy, there is no resources on the server at that location, or at least we do not want to have that resource sent back if it exists, or, as in most cases, we do not want Github's 404 page sent back.<br/><br/>
The ``<react-router-url>`` portion of the url is purely a front end construct and we need a way to prevent a refresh to go a talk to the server. <br/>This [article](https://dev.to/zenulabidin/how-not-to-deploy-a-react-site-to-github-pages-42ge) put forward a feature of **React Router** that helps mitigate this.
    - Use a ``HashRouter`` instead of the traditional ``BrowserRouter``     




## Contact Me

I'm opened to constructive criticism. If you have remarks/suggestions, I wam always happy to engage with the community.

**Twitter handle**: [murphs_k](https://twitter.com/@murphs_k)

**Email**: [kibongesp@gmail.com](mailto:kibongesp@gmail.com?subject=[GitHub])







## References


1. [https://stackoverflow.com/questions/43634583/prevent-landscape-orientation-mobile-website](https://stackoverflow.com/questions/43634583/prevent-landscape-orientation-mobile-website)
2. [https://css-tricks.com/snippets/css/orientation-lock/](https://css-tricks.com/snippets/css/orientation-lock/)
3. [https://dev.to/zenulabidin/how-not-to-deploy-a-react-site-to-github-pages-42ge](https://dev.to/zenulabidin/how-not-to-deploy-a-react-site-to-github-pages-42ge)



<div style="display: none">

3. https://github.com/pypa/sampleproject
4. https://pypi.org/project/python_boilerplate_template/
5. https://www.jeffknupp.com/blog/2013/08/16/open-sourcing-a-python-project-the-right-way/
6. https://the-hitchhikers-guide-to-packaging.readthedocs.io/en/latest/quickstart.html
7. https://github.com/raghavan97/projdir/blob/master/setup.py
8. https://raghavan97.github.io/2016/02/11/logger-post/
9. https://github.com/navdeep-G/setup.py/blob/master/setup.py
10. https://realpython.com/python-application-layouts/
11. https://pythonhosted.org/an_example_pypi_project/setuptools.html

12. https://vshaxe.github.io/vscode-extern/vscode/GlobPattern.html
13. https://www.codementor.io/@rajjeet/step-by-step-how-to-add-redux-to-a-react-app-11tcgslmvi
</div>
