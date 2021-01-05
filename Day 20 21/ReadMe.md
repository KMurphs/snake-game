



## Issues with imports

The following line can help debug these issues.
Place right of the top of a script

```
print('__file__={0:<50} | __name__={1:<20} | __package__={2:<20}'.format(__file__,__name__,str(__package__)))
```



## References

1. [https://stackoverflow.com/questions/14132789/relative-imports-for-the-billionth-time](https://stackoverflow.com/questions/14132789/relative-imports-for-the-billionth-time)
1. [https://napuzba.com/a/import-error-relative-no-parent/p3](https://napuzba.com/a/import-error-relative-no-parent/p3)
1. [https://github.com/microsoft/pylance-release/issues/236#issuecomment-727575436](https://github.com/microsoft/pylance-release/issues/236#issuecomment-727575436)


