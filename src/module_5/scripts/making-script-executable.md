# Making scripts executable

Earlier in this module, you wrote the first script, and executed directly in the terminal using the `sh <file_name>` commanand. It becomes tedious to do this repeatedly and that leads us to **making a script an executable**.


You can make a script **executable**.

Making a script executable means that you dont have to compile it every time you want to run it which is what the `sh <file_name>` command does. Instead, you can make it executable once and run it directly from the terminal as many times as you want.

This is done by using the `chmod u+x <file_name>` command to compile and change the permissions of the file, allowing it to be executed as a program.

Consider the previous example

```sh
{{#include ../../code-samples/module_5/hello}}
```

To make this executable, do:

```sh
chmod u+x hello
```

Then to run it, do:

```sh
./hello
```

You should get the same result as before, but this is more efficient than typing `sh hello` every time.

As a final example, if our file name is `delete_all` and we want to make it executable and run it, we can do:

```sh
chmod u+x delete_all
./delete_all
```

That said, we're done here! Over to the next one.
