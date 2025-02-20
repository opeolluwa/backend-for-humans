# Hello World program in JavaScript

In this section, we are going to install the NodeJs and write a basic program
that prints "Hello World!"

## Installing NodeJS

See the NodeJs setup guide here <https://nodejs.org/en/download>, for Windows
user, you need to add NodeJs to you path variable, see the guide here
<https://hackmd.io/@hm222vx/AddNodeJSPath>

## Confirm NodeJs installation

When you install NodeJs, it comes with other tools like `npx` and `npm`, to
confirm the installation is successfully, open a new terminal and type in the
following commands, one at a time.

```sh
node -v 
npm -v
npx -v
```

<div class="command-output">
<!-- cmdrun node -v  -->
</div>

<div class="command-output">
<!-- cmdrun npm -v  -->
</div>

<div class="command-output">
<!-- cmdrun npx -v  -->
</div>

## What is an "Hello World" program ?

Put simply, it is a program that prints "Hello world" (or "Hello, world!"). It's
like some sort of ritual in the broad programming community to welcome a new
programmer, some sort of a baby's first cry.

## Writing the Hello world program in JavaScript

**Step one**: Create a new `hello_world.js` file

```sh
touch hello_world.js
```

**Step two**: Add the code below to your `hello_world.js` file

```javascript
{{#include ../../code-samples/module_9/hello_world.js}}
```

**Step three** in the same terminal used to create the new file, execute the
command

```sh
node hello_world.js
```

<div class="command-output">
<!-- cmdrun node ../../code-samples/module_9/hello_world.js -->
</div>