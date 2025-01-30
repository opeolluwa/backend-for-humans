# Anatomy of your first script

The first script looks like this

```sh
{{#include ../../code-samples/module_5/hello}}
```

- Line <span class="line-number">1</span> `#!/bin/bash` is divided into two parts.
  The first part with the annotation `#!` is called **shebang** - pronounced "" ʃɪˈbæŋ"" and it is a very
  important ingredient for a Shell script to work. The other part `/bin/bash`
  tells the computer how to interpret the file, it can be translated as "use
  bash to interpret this".

- Line <span class="line-number">3</span> Is the same as the [echo command](../../module_4/commands/echo.md) we learnt in module 4.

As you advance, you will discover that it is possible to use programming languages like, Perl, Python, JavaScript, Lua, and many more for shell scripting. The central key to unlocking this is indicating the interpreter to use.

To exemplify this, the script  above can be rewritten in JavaScript as;

```sh
{{#include ../../code-samples/module_5/hello-js}}
```

Note that the first line is different!

The key take away here is that;

1. Any shell script must start with a shebang
2. Your shell script does not need to have a file extension
3. You can couple any combination of the commands we learnt in module 4 for use in a shell script.
