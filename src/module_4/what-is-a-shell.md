# What is a Shell?

Shell is a special user program that provides an interface to the user to use
operating system services. Operating systems include opening a file, deleting a
file, opening a program, renaming a file, etc.

Essentially the Shell accepts human-readable commands from input sources such as
keyboard-entry or file(Shell scripts) and pass this to the operating system to
execute.

Put simply, the Shell is a special kind of kind of software that let you do some
tasks from the command line interface (CLI). A CLI would typically look like the
image below

![Command line interface](../assets/cli.png)

Our focus on this module is working with the Shell. Although, the concept of
Shell as we know it, is typical to Linux and Mac operating systems otherwise
known as Unix-based operating systems. The Window operating system provides
`cmd.exe` and `powershell` as equivalents of the Unix-based system Shells. It
would suffice to say that, the `cmd.exe` and `powershell` can also be used to
interact with the operating system. However, and for uniformity, we will only be
interacting with the Unix-like shells. The WSL installed earlier in this module
make it possible for WIndows user to do this.

In the Unix-based systems, we have different kinds of Shell, these include:

1. bash - Bourne Again Shell
2. zsh - Z Shell
3. csh - C shell
4. ksh - KornShell
5. sh - Bourne shell
6. fish - Friendly Interactive Shell

This book will focus solely on bash because it's quite popular and probably the
commonest. Bash syntax is also compatible with other kinds of shell.

On Windows based systems, configuring WSL might be tricky especially without
prior experience with the CLI, so we will be using git Bash for this module.

The next section will guide you through the installation of git and git bash for
Windows operating system users
