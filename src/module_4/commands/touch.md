# touch

The touch command is used to create files. To create files in the current folder, provide the file name and file extension.

Let's create a `sample.txt` file.

{{#tabs }}
{{#tab name="macOS" }}

```bash
touch sample.txt
```

{{#endtab }}

{{#tab name="Powershell" }}

```bash
code sample.txt
```

{{#endtab }}

{{#tab name="Linux or WSL" }}

```sh
touch sample.txt 
```

{{#endtab }}
{{#endtabs }}

![pwd](../../assets/shell-scripting/touch.png)

To create multiple files, add a space between the file names. Add a comma and a space for Windows.

{{#tabs }}
{{#tab name="macOS" }}

```bash
touch info.txt profile.txt interest.txt
```

{{#endtab }}

{{#tab name="Powershell" }}

```bash
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
