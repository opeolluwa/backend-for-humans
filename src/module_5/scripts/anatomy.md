# Anatomy of your first script

Your first script looks like this

```sh
{{#include ../../code-samples/module_5/hello}}
```

Lets analyze the different components of this script.

- Line <span class="line-number">1</span> `#!/bin/bash` is divided into two parts. The first part with the annotation `#!` is called **shebang** - pronounced "" ʃɪˈbæŋ"" and it is a very important ingredient for a Shell script to work. The other part `/bin/bash` tells the computer how to interpret the file, it can be translated as "use bash to interpret this".

- Line <span class="line-number">3</span> is the same as the [echo command](../../module_4/commands/echo.md) we learnt in module 4.

As you advance, you will discover that it is possible to use programming languages like Perl, Python, JavaScript, Lua, and many more for shell scripting. The central key to unlocking this is indicating the interpreter to use.

To exemplify this, the script  above can be rewritten in JavaScript as;

```sh
{{#include ../../code-samples/module_5/hello-js}}
```

Note that the first line is different!

The key takeaway from this script anatomy breakdown is that;

1. A shell script must begin with a shebang, accompanied by the script's interpretation specification

2. A shell script does not need to be saved with a file extension

3. You can combine multiple commands within a shell script.
