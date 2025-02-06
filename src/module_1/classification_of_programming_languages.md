# Classification of programming languages

Before we delve into programming language classifications, we must firmly establish why we write programs and the several available ways to do it.

## Programming Languages - Foundational Concept

As you may know or have heard, computers accept and process instructions in binary, which is essentially a large sequence of zero's and one's.

![binaries](../assets//binay_numbers.png)

Humans are incapable of writing complex instructions in binary due to a high tendency of attention loss that lead to making multiple mistakes. This why computer programming languages are necessary.

Programming languages use an `English-like` construct which is easier to write and learn and consequently, easier to instruct the computer with. As of today, there are hundreds of programming languages, or a few thousand. Some of the popular ones are Python, C++, Java, C, and COBOL, to mention a few.

## Source file

Generally, the raw form of instruction passed to a computer are contained in a special file called **source file** and the content of a source file is called **source code**. Some additional processes which we will discuss later on are required to turn the source code into a useful program. These processes collect source files and convert them into binary format (**machine code**) required by the computer.

Ideally, these **special files** or source files are essentially text files, with two parts;

a. A **file name**, which can be just about any character combination and

b. A **file extension**, a specific standard notation used to identify file types.

![source file](../assets/source-file.png)

The source files of JavaScript, which is one of the programming languages we shall study, has its source files ending with `.mjs` `.cjs` or `.js` extension, other popular examples are `.py` for Python, `.go` for Golang, `.rs` for Rust, `cpp` for C++.

## Classification of programming language

I mentioned the following concepts earlier, shall we do a quick recap before we proceed?

> [!IMPORTANT]

> Computers understand binary, so we have to instruct them in binary.
> 
> Humans cannot efficiently codify instructions in binary, so we use a computer programming language.
> Remember? Ok good!

Eventually the instructions contained in source files will need to be processed by the computer. To do this, the computer uses special programs, such an **interpreter** or a **compiler**.

As the name implies, **Interpreters** translate the content of the source file to what the computer can understand, which is? ____ Yes! Binary is correct. This interpretation happens every time we want to perform a desired task. On the other hand, **Compilers** interpret the programs once and create something called an **executable**, this executable is read every time the task is required.

> [!NOTE]

> Interpreter translates every time the task is required to be completed
> Compiler translates once and create an executable file from the source file

Computer programming languages are classified based on the special programs the computer uses to decode the content of their source files.

Summarily, programming languages are classified as:

1. Interpreted languages, eg. JavaScript, Python, Ruby, Perl, etc.

2. Compiled languages, eg. Rust, C++, C, Zig, Go, etc.

There are other forms of classification such as imperative languages, Object oriented languages, functional languages, and maybe more but I will restrict our reach to only interpreted and compiled language.

And with that we have come to the end of this module. There is a review page and a few quizzes up next. Good luck!
