# touch

The touch command is used to create files. To create files in the current folder, provide the file name and file extension.

Let's create a `sample.txt` file.

```sh
touch sample.txt
```

![pwd](../../assets/shell-scripting/touch.png)

To create multiple files, add a space between the file names. Add a comma and a space for Windows.

{{#tabs }}
{{#tab name="Unix" }}

```sh
touch info.txt profile.txt interest.txt
```

{{#endtab }}

{{#tab name="Powershell" }}

```sh
code info.txt, profile.txt, interest.txt
```

{{#endtab }}

{{#tab name="Linux or WSL" }}

```sh
touch info.txt profile.txt interest.txt
```

{{#endtab }}
{{#endtabs }}

![pwd](../../assets/shell-scripting/touch-multiple.png)
