# dnd-charsheet-v3

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


# Notes
use rfdc to create clone of Character object, then have a form in a [drawer](https://element.eleme.io/#/en-US/component/drawer) that will edit the clone. When saving, set store character to clone;