# Hello World program in Rust

In this section, we are going to install the Rust programming language and write
a basic program that prints "Hello World!"

## What is an "Hello World" program ?

Put simple, it is writing a program that prints "Hello world" (or "Hello,
world!"). It's like some sort of ritual in the board programming community to
welcome yourself; just like a baby's first cry.

## Installing the Rust programming language toolchain.

See this video on the installation guide and everything you need to know about
using the Rust programming language.

## Writing Hello world in Rust

**Step one**: Create a new `hello_world.rs` file

```sh
touch hello_world.rs
```

**Step two**: Add the code below to your `hello_world.rs` file

```rust
{{#include ../../code-samples/module_9/hello_world.rs}}
```

**Step three**

1. For Windows Operating system

```sh
rustc hello_world.rs -o hello
./hello.exe
```

2. For Linux and Mac

```sh
rustc hello_world.rs -o hello
./hello
```

## Video Guide
