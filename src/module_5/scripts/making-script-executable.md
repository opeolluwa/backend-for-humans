# Making scripts executable

Earlier in this module, you wrote the first script and ran it using the `sh <file_name>` command. Typing `sh` before the file name every time becomes tedious — that is where **making a script executable** comes in.

You can make a script **executable**, meaning the operating system will treat it like a runnable program. Instead of typing `sh hello` each time, you just type `./hello`.

This is done using the `chmod u+x <file_name>` command, which updates the file's permissions to allow it to be run directly. Think of permissions as a gate — `chmod u+x` opens the gate for your user account to execute the file.

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
