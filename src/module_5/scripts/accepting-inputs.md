# Accepting inputs

At times, you want to pass inputs to your shell scripts, this can be achieved
using the `read` keyword

```sh
{{#include ../../code-samples/module_5/accepting-inputs}}
```

The lines <span class= "line-number"> 4 </span> and <span class= "line-number">
7 </span> will read the inputs from the terminal and store them in variables
`name` and `age`, respectively.

I encourage you to copy this over in a file, say `argz`, make the script an
executable and run it.
