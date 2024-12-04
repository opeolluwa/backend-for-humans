# Anatomy of the your first script

The first script looks like this

```sh
{{#include ../../code-samples/module_5/hello}}
```

- Line <span class="line-number">1</span> `#!/bin/bash` is called **shebang** -
  pronounced "" ʃɪˈbæŋ"" and it is a very important ingredient for and Shell
  script to work. It tells the computer how to interpret the file.
- Line <span class="line-number">3</span> Is the same as the
  [echo command](../../module_4/commands/echo.md) we learnt in module 2

The key take away it that,

1. Any shell script must start with a shebang.
2. Your shell script does not need to have a file extension
3. You can couple any combination of the commands we learnt in module 4 for use
   in a shell script
