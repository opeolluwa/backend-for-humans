# Making script executable

Earlier in this module, you wrote the first script, and executed directly in the terminal using the `sh <file_name>` commanand. It becomes tedious to do this repeatedly and that leads us to **making your script executable**.

This is done by adding the `chmod u+x <file_name>` command to the script.

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

As a final example, if our file name is `delete_all` and we want to make it executable and run it, we can do:

```sh
chmod u+x delete_all
./delete_all
```

That said, we're done here! Over to the next one.
