# Using Variables

Variables are not only typical to shell scripting, we'll see them a lot in the modules to come; they are like special containers for holding values. The values they hold can be just about anything you can think of and they are identified by the name we give them.

Variables allow us to easily mutate (change, update) a value.

Before going on to dealing with variables in Shell scripting, let's examine how variables are named, and how they work.

## A closer look at variables

Consider this JavaScript code:

```js
{{#include ../../code-samples/module_5/introduction_to_variables.js}}
```

<div style="margin: 5rem 0">
To be candid, for someone that has not written any code, there's going on here and I can almost guess that you scrolled past it! Now, go back. It doesn't make any or much sense but just read and observe all the lines closely.

When you are done, click on the play icon on the top right corner to see the code in action.

![code run](../../assets/js-code-run.png)

The code, when run yields:

```sh
My name is Adeoye Adefemi, I am a 34 years old male. 
My name is Opeeolluwa, I am a 45 years old male. 
My name is Adeoye Adefemi Opeoluwa, I am a 60 years old male.
```

The key lesson here is that, the terms `age`, `name`, and `gender` made it possible to quickly update the values and to use them in multiple places. I encourage you to edit the code, use your name in place of mine, then run the code again.

These three things; `age`, `gender` and `name` as used here are called variables.

At first age stored the value **34**, then I updated this value to
**45**, and finally **60**.

</div>

## Naming Variables

As a rule in many programming languages, or toolchain like the Shell scripting we are studying, it is often encouraged that:

1. A variable be descriptive

2. A variable starts with a letter followed by a letter, more alphabets, or underscore.

Here are a few examples:

```sh
my_name = "Adeoye"
my_country = "Nigeria"
title_of_a_king = "King Jaja of Opobo"
```

The first one, talks about my name, it's very descriptive, the next is my country, note that the variable `my_country` is very descriptive, and the same can be said about the last example.

With this out of the way, let's address variable naming conventions.

## Variable naming conventions

As of today, there are 5 conventional methods of naming variables, they are as follows:

1. snake case

2. upper snake case

3. camel case

4. pascal case

5. kebab case

### Snake case

In snake case, you separate your variables with underscore. For example,
`my_name`, `my_friends_name`.

### Upper snake case

Like the snake case, you separate your variables with underscore, however these words must be capitalized. For example, `MY_NAME`, `MY_FRIENDS_NAME`. This is often used for variables that would not change, otherwise knows as constants.

### Camel case

In camel case, you capitalize the first letter of every word except the first. This gives `myName` , `myFriendsName`.

### Pascal case

Very similar to camel case, just that you capitalize the first letter of each word like this `MyName`, `MyFriendsName`.

### Kebab case

The kebab case is very similar to the snake case, just that hyphens are used in place of underscores. For example, we have `my-name`, `my-friends-name`.

## Variables in shell scripting

Finally, here we are, variables in Shell scripting. Consider a minimal reproduction of the JavaScript code, I'll create a file `var` and add the following content.

```bash
{{#include ../../code-samples/module_5/shell-variables}}
```

On line <span class="line-number"> 3</span> and <span class="line-number"> 4</span> we declared, the variables `name` and `age`. Then on line <span class="line-number"> 6</span> and <span class="line-number"> 7 </span> we print these values using the [echo](../../module_4/commands/echo.md) command.

Let's proeed to make this executable and run it.

```sh
chmod u+x var
./var
```

Notice how when we needed to access the variable values we had to prepend it with a dollar sign `$`. This is a very important concept when working with variables in Shell scripting.

The executed script output should be similar to this:

```sh
adeoye
4
```
