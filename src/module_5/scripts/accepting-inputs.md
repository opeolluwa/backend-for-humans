# Accepting inputs

At times, you want to pass inputs to your shell scripts, this can be achieved
using the `read` keyword.

```sh
{{#include ../../code-samples/module_5/accepting-inputs}}
```

The lines <span class= "line-number"> 4 </span> and <span class= "line-number"> 7 </span> will read the inputs from the terminal and store them in variables `name` and `age`, respectively.

Copy the above to a new file, say `argz` and make the script an executable. Run the script and interact with the program on your terminal.

For example;

```sh
$ ./argz

What is your name?
Adeoye
How old are you?
45

Adeoye
45
```

When I executed the program, I was greeted with the `What is your name?` question. I responded with my name **Adeoye**. Thanks to the `read` keyword, this name was assigned and stored as the variable `name`. The same thing happened when I answered the `How old are you?` question, however, this time my response was stored as the variable `age`.

Ultimately, the program was able to precisely recall and 'echo' my responses to both questions because I made it read and accept them as variable values.
