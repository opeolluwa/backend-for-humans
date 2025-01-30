# Conditional evaluation

Like variables, conditional evaluation is on of the key things you'll come across in
programming. It is used to execute a certain action based on the matched
condition.

Bash gives you four keywords `if`, `elif`, `else` and `fi`

1. Conditional evaluation must start with an `if` and end with an `fi`
2. The conditional evaluation can contain zero or more `elif`
3. The base case, or the fallback must be handled by an `else`

Consider this example, we will read the input from the user and check if it is a rainbow color.

```sh
{{#include ../../code-samples/module_5/is-rainbow-color}}
```

![rainbow](../../assets/shell-scripting/module_5_is-rainbow-color.png)

Consider Another example

If my name is "adeoye", print, "Hello boss you are welcome!", if not, print,
"oops! I'm not sure I know you"

```sh
{{#include ../../code-samples/module_5/is-my-name}}
```

![is my name](../../assets/shell-scripting/module_5-is-my-name.png)
