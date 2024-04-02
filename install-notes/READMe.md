# Install notes

## Software required

* [volta](https://docs.volta.sh/guide/getting-started) - manages different versions of node and tools

```{powershell}
volta install node
volta install npm@bundled
```

## Build initial NextJS app

```{powershell}
npx create-next-app@latest
```
Accept all the default options.  I named the application *sbsd-chatbot*

## Test the installation

```{powershell}
npm run dev
```

