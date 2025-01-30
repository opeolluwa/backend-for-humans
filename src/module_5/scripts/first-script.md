# Your first script

To begin, open the [VS code](./../tools/vs-code.md) then see the video below for
setup instructions to create a folder

## Creating a new folder

To create a file in Vscode use can use either of the following approaches.

### Method 1

The following video instruction walks you through how to create files in Vscode.

<video  controls src="../../assets/using-vs-code/vs-code-new-file.mp4" style=" margin:2rem 0">
</video>

### Method 2

On the flip side, you can leverage the Shell scripting knowledge you have been
armed with. Press <kbd> Command </kbd> + <kbd> \`</kbd> on macOS, the <kbd>
\`</kbd> key is typically under <kbd> Esc</kbd> key.

For windows users you press <kbd> Win </kbd> + <kbd> \`</kbd>.

The command will open the Vscode integrated terminal, from where you can create
a new file.

With that out of the way, let's go on to our first script.

## Writing our first script

Create a file named `hello`. Yes, some programmers prefer to use the `.sh` extension for their scripts, such as `hello.sh`, it is not required, and we'll not be doing that. In the newly created file, add the following content.

```sh
{{#include ../../code-samples/module_5/hello}}
```

From the terminal, execute `sh hello`.

This would print `Hello world` to the terminal.

```sh
 % sh hello 
Hello, World
```
