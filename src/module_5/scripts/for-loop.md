# Using for loop

The `for` loop as seen in many programming languages, is often used to go over a collection or a list of items and carry out an action.

Four ingredients are required to exeute a for loop in Bash, `for`, `in`, `do`, and `done`.

Consider the array of rainbow colors we mentioned earlier while learning arrays

```sh
{{#include ../../code-samples/module_5/shell-array}}
```

We can use use a for loop to print these colors thus

```sh
{{#include ../../code-samples/module_5/shell-for-loop}}
```

The combination of these four keywords, would literally mean, `for` (every item
) `in` (this container/variable/list), `do` (print the item), and (after the last
item, you're) `done`.
