# Writing shell scripts

When we started the module, we established that Shell commands can be from
keyboard-entry or from file. To exemplify this, I have included a excerpt form a
[project](https://github.com/opeolluwa/filesync/blob/master/justfile) that uses
a shell script to package a built application.

```sh
#!/usr/bin/env sh

 mkdir -p {{BINARIES_PATH}}
 date > last-release.txt

if [ {{target}} = "all" ]; then 
    for platform in {{SUPPORTED_PLATFORM}}
    do
        just export $platform
    echo "Export completed"
    done 
elif [ {{target}} = "android" ]; then
    cp tauri/gen/android/app/build/outputs/apk/universal/release/app-universal-release.apk {{BINARIES_PATH}}/{{APP_NAME}}.apk
elif [ {{target}} = "ios" ]; then 
    cp tauri/gen/android/app/build/outputs/bundle/universalRelease/app-universal-release.aab {{BINARIES_PATH}}/{{APP_NAME}}.aab
elif [ {{target}} = "macos" ]; then
    cp tauri/target/release/bundle/dmg/filesync_0.7.13_aarch64.dmg {{BINARIES_PATH}}/{{APP_NAME}}.dmg
else 
    echo "Unsupported target"
    exit 1;
fi
```

It would seem as tho there is a lot of complex things going on here. In the next
session, we will demystify the script and prepare you to be able to write one of
such. 
