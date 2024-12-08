# Making script executable

Earlier in this module, you wrote the first script, and execute it
`sh <file_name>`, it becomes tedious to do this, and that leads us to **making
you script executable**. Simply this would mean running the script without
appending the `sh`, consider the previous example,

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

As a template, to make a script executable, do

```bash
{{#include ../../code-samples/module_5/make-script-executable}}
```

As a final example,if our filename is delete_all running this would be

```sh
chmod u+x delete_all
./delete_all
```

That said, we're do here! Over to the next one.
