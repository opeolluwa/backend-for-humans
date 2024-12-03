# rmdir

The `rmdir` is used to delete directory, it would suffice to say that it's is
the opposite of `mkdir` in many sense.

## deleting a folder

To delete a folder, do:

```sh
rmdir folder_name
```

If the folder is empty then it would be deleted, otherwise you'd get an error
similar to `rmdir: folder_name: Directory not empty`. To circumvent this, pass
an `-r` flag which stands for `recursive`, and use `rm` instead of `rmdir` This
would delete the directory and it's content

```sh
rm -r folder_name
```

So far we have explored executing shell commands as keyboard entry, in the next
few section we will discuss executing these scripts from a file.
