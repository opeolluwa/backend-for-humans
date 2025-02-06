# Writing content to file

We learnt about [creating files](./touch.md) with the touch command but these are just empty files. Let's go on to add some content to this file.

The [echo](./echo.md) command we discussed earlier can be used to write stuff to a file.

Typically, the text passed to the echo commands, other wise known as the `argument` gets printed to the [stdout](./std.md), however we can "pipe" this value to a file

```sh
echo "unless you are permitted to share!!" > info.txt
```

![writing content to file](../../assets/shell-scripting/writing-to-file.png)

If the file does not exist when you pipe the content of stdout or stderr to a file, the file will be created with the intended content.

You can also append additional content to an already existing file. To do this, 'pipe' the new content to the file with a double arrow.

```sh
echo "unless you are permitted to share!!" >> info.txt
```
