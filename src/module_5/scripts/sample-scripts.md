# Sample scripts

Here's an excerpt from a personal project which reflects the major the concepts discussed in this module.

```sh
#!/usr/bin/bash    

# Define target platform and supported platforms
target="all"  # Example: "all", "android", "ios", "macos"
SUPPORTED_PLATFORM="android ios macos"  # Supported platforms for export
BINARIES_PATH="/path/to/binaries"  # Path to store the exported binaries
APP_NAME="myapp"  # Name of your app

if [ "$target" = "all" ]; then 
    for platform in $SUPPORTED_PLATFORM
    do
        export $platform
        echo "Export completed for $platform"
    done 
elif [ "$target" = "android" ]; then
    cp tauri/gen/android/app/build/outputs/apk/universal/release/app-universal-release.apk "$BINARIES_PATH/$APP_NAME.apk"
elif [ "$target" = "ios" ]; then 
    cp tauri/gen/android/app/build/outputs/bundle/universalRelease/app-universal-release.aab "$BINARIES_PATH/$APP_NAME.aab"
elif [ "$target" = "macos" ]; then
    cp tauri/target/release/bundle/dmg/filesync_0.7.13_aarch64.dmg "$BINARIES_PATH/$APP_NAME.dmg"
else 
    echo "Unsupported target"
    exit 1
fi
```

## Explanation

The original script, found [here](https://github.com/opeolluwa/filesync/blob/master/justfile), is used alongside **Just**[^just], a Shell command runner, to manage a codebase for building desktop(macOS) and mobile applications.

1. On line <span class="line-number">1</span>, we see the previously explained shebang in action

2. Line <span class="line-number">3</span> to line <span class="line-number">7</span> declared some variables whose values would be reused in multiple places

3. On line <span class="line-number">9</span> to line<span class="line-number">24</span>, we have

   - Conditional evaluation arms with copy the build application, from thesource to the destination

   - If `all` is passed, it would copy all the supported targets, otherwise, itwould copy the built application for the stated platform.

Don't worry if you don't understand everything at a glance. Like I said, it is an excerpt from a personal project, so it should give you a glimpse of the real life application of what we've just learnt.

I'll encourage you to ponder on it for a short while, you should figure it out soon enough.

[^just]: <https://just.systems>
