# Install notes

## Software required

* [volta](https://docs.volta.sh/guide/getting-started) - manages different versions of node and tools

```{powershell}
volta install node
volta install npm@bundled
```


## Build a default react-native application

See: [React-native on the web](https://blog.logrocket.com/complete-guide-react-native-web/)

```
npx create-expo-app ChatSBSD
cd ChatSBSD
npx expo install react-dom react-native-web @expo/webpack-config
```

Then, you need to edit the *App.json* file to redirect a web build to the *./docs* folder rather than the default folder.

Add the *build* attribute in the appropriate spot below.

```
{
  "expo": {
    ...
    "web": {
      "favicon": "./assets/favicon.png",
      "build": {
        "output": "../docs"
      }
    }
  }
}

```

Then, you're ready to build the web application:

```
npx expo export:web
```

And to run it:

```
cd ../docs
npx serve
```
