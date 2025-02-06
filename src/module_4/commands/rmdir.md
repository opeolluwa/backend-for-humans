# rmdir

The `rmdir` is used to delete a directory. It does the opposite of  the [mkdir](./mkdir.md) command.

## Deleting a folder

To delete a folder, use:

```sh
rmdir folder_name
```

If the folder is empty then it would be deleted, otherwise you'd get an error similar to `rmdir: folder_name: Directory not empty`.

To circumvent this, pass an `-r` flag which stands for `recursive`, and use `rm` instead of `rmdir`. This would delete the directory and it's content.

```sh
rm -r folder_name
```

## Deleting multiple folders

To delete multiple folders, use the commands as shown below.

{{#tabs }}
{{#tab name="Unix" }}

```sh
rmdir -r first_folder second_folder third_folder
```

{{#endtab }}

{{#tab name="Powershell" }}

```sh
rmdir -r first_folder, second_folder, third_folder
```

{{#endtab }}

{{#tab name="Linux/WSL" }}

```sh
rmdir -r first_folder second_folder third_folder
```

{{#endtab }}
{{#endtabs }}

Remember, the `-r` flag is optional and you are expected to use it only when you want to forcefully delete folder items.
