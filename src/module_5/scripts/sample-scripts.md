# Sample scripts

Here are some real life examples

1. 
```sh
export target: 
    #!/usr/bin/env sh
 
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
        echo "Unspported target"
        exit 1;
    fi
```
