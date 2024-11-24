# stdin, stdout, stderr

Computer use streams to accept input, return output or inform it user when an
error occur, these streams are `stdin`, `stdout` and `stderr` respectively.

Contrary to what we have learnt in this module, especially about commands,
`stdin`, `stdout` and `stderr` are not commands.

Stdin stands for standard input, which is the default input device a program
uses to read data. It's commonly used to read keyboard input, but it can also be
a file or other device.

The terminal we have been using thus far is a very good example of stdin, we can
pass keyboard input to the computer, just by typing in the terminal.

Stdout stands for standard output refers to the default output stream in a
computer program. It is the channel through which a program displays its output
to the user or another program. When you run a program and it produces some
output, such as text or numbers, that output is typically sent to the stdout
stream.

The terminal we have been interacting with hitherto is also the stdout, put
simply we are able to pass input (stdin) and get output (stdout).

stderr stands for standard error - this connotes when error is returned, for
instance, you get an error when you are trying to open a file that does not
exist

![stderr](../../assets/shell-scripting/stderr.png)
