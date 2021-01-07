# Game Snake

# [Game Snake](https://github.com/KMurphs/snake-game.git)



## Overview

-  Project was born as an evaluation for the complexity involved in writing a simple **Game**. The **Snake Game** consists of snake that moves on grid within border that it must never hit. Regularily a crumb is randomly placed on the screen. The snake comsumes the crumb, grows and gets points. After a maximum is reached, the user is proclaimed winner, and the game restart at a faster pace everytime.
-  Due to the number of components that had to interact with each other, a simplified **redux** was implemented to act as a central **State Management Store** for the application. This allowed for a clearer picture and conceptualization of the program inner workings.
-  The project is written in **python**, an makes uses of **Turtle Graphics** which are intergrated with python distributions.
-  The project was consciously written in a more **Functional Programming** style as opposed to the familiar **Object Oriented Programming**. As such, **Side effects** were kept to a minimum, confined within wrappers. **Pure functions** were used whenever possible. 
-  The **Functional Programming** paradigm is being learnt, and the project is used as playground to play with concepts and ways of thinking and explore how they compare to **OOP**'s own concepts and way of thinking.



## Definition

The **Snake Game** consists of snake that moves on grid within border that it must never hit. Regularily a crumb is randomly placed on the screen. The snake comsumes the crumb, grows and gets points. After a maximum is reached, the user is proclaimed winner, and the game restart at a faster pace everytime.

**Duration**: 8 hours 

**Tools, Technologies, Skills**: Python, Redux, State Management, Turtle Graphics

**Languages**: Python 3 with typing



## Context

The project was motivated by the ``#100DaysOfCode`` twitter movement. Each day for 100days, I work on some project.  


## Setup
1. [Python 3](https://www.python.org/downloads/) needs to be installed on the Test Machine
    - It must also be included in the ``PATH`` system variable ([This](https://phoenixnap.com/kb/how-to-install-python-3-windows) reference can help, if unclear) 
2. Install ``virtualenv``. The following assumes the Test Machine is a Windows Machine.
    - Open a Command Prompt, and type 
```
pip install virtualenv
```




### Run the Script/Application


1. Open a Command Prompt, Naviguate to the ``snake-game`` directory, Activate the virtual environment and Install dependencies
    - Note that an internet connection might be required to successfully perform this step
```
python -m venv .venv
.venv\scripts\activate
```

Depending on whether the application will only be run, or if a development setup must be created, run one of the following
```
pip install -r .requirements\dev.txt

pip install -r .requirements\prod.txt
```

2. On the commmand line prompt, type 
```
.venv\scripts\activate

cd snake-game
python main.py
```

## Issues

### Issues with imports

The following line can help debug these issues.
Place right of the top of a script

```
print('__file__={0:<50} | __name__={1:<20} | __package__={2:<20}'.format(__file__,__name__,str(__package__)))
```

## Contact Me

I'm opened to constructive criticism. If you have remarks/suggestions, I wam always happy to engage with the community.

**Twitter handle**: [murphs_k](https://twitter.com/@murphs_k)

**Email**: [kibongesp@gmail.com](mailto:kibongesp@gmail.com?subject=[GitHub])


## References

1. [https://stackoverflow.com/questions/14132789/relative-imports-for-the-billionth-time](https://stackoverflow.com/questions/14132789/relative-imports-for-the-billionth-time)
1. [https://napuzba.com/a/import-error-relative-no-parent/p3](https://napuzba.com/a/import-error-relative-no-parent/p3)
1. [https://github.com/microsoft/pylance-release/issues/236#issuecomment-727575436](https://github.com/microsoft/pylance-release/issues/236#issuecomment-727575436)
2. [Turtle Graphics Documentation](https://docs.python.org/3/library/turtle.html#turtle.done)

