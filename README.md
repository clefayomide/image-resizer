<div align="center">
<h1>Image Resizer</h1>

![supported node versions](https://img.shields.io/badge/node%20v-16.x%20%7C%2017.x%20%7C%2018.x-blue)
![license: MIT](https://img.shields.io/npm/l/react.svg)

<p>Without limiting the user to specific file sizes, users can upload a file or document from the frontend to the backend server; image resizer will handle the resizing without losing its quality.</p>
</div>

## Getting started

### Installation

This package can be installed using `npm`

```bash
npm i @clefayomide/image-resizer
```

or, `yarn`

```bash
yarn add @clefayomide/image-resizer
```

### Usage

Import `image_resize`

```javascript
import { image_resize } from '@clefayomide/image-resizer';
```

Wrapping things up

```javascript
const file = e.target.files[0];
image_resize(file, 500)
  .then(res => {
    // perform an action with the resized file, such as sending to server
  })
  .catch(err => console.error(err));
```

## Arguments

Available props:

| Argument | Description                         | type      |
| -------- | ----------------------------------- | --------- |
| `file`   | the file to be resized              | `File`
| `width`  | the required width for the new file | `number`

## Issues

If any issues are found, they can be reported [here](https://github.com/clefayomide/image-resizer/issues).

## License

This project is licensed under the [MIT](LICENSE) license.
