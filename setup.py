import os
from setuptools import setup

# Utility function to read the README file.
# Used for the long_description.  It's nice, because now 
# 1) we have a top level README file and 
# 2) it's easier to type in the README file than to put a raw string in below ...
def read(fname):
    return open(os.path.join(os.path.dirname(__file__), fname)).read()

setup(
    name = "snake-game",
    version = "0.0.2",
    author = "Stephane Kibonge",
    author_email = "kibongesp@gmail.com",
    description = ("A simple snake game."),
    license = "BSD",
    keywords = "snake game",
    url = "https://github.com/KMurphs/snake-game.git",
    packages=['snake-game', 'tests'],
    long_description=read('ReadMe.md'),
    classifiers=[
        "Development Status :: 3 - Alpha",
        "Topic :: Utilities",
        "License :: OSI Approved :: BSD License",
    ],
)