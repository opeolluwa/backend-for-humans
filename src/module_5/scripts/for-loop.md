# Using for loops

The `for` loop is often used to iterate over a collection or a list of items and carry out an action.

Four key words are used to execute a for loop in Bash, `for`, `in`, `do`, and `done`.

Consider the array of rainbow colors we used in our first lesson on arrays.

```sh
{{#include ../../code-samples/module_5/shell-array}}
```

We can use a for loop to iterate over the array and print each item like this:

```sh
{{#include ../../code-samples/module_5/shell-for-loop}}
```

The combination of these four keywords literally means: `for` (every item) `in` (this container/variable/list), `do` (print the item), and (after the last item, you're) `done`.

So rewording this to suit the above example, we can say `for` every _color_ `in` the rainbows array variable, `do` print the _color_, and after printing the last color, you're `done`.

Make the script executable and run it.

You should see the following output:

```sh
red
orange
yellow
green
blue
indigo
violet
```

The key takeaway here is that, while the **echo** command simply outputs the value of a variable or a string passed to it, a **for** loop executes nested commands for each item in the array, typically on a new line, and terminates after executing the last item.

In advanced lessons, you will learn how you can nest a for loop within an echo command and within another for loop.
