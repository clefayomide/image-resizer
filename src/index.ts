export const image_resize = (file: File, width: number) =>
  new Promise((resolve, reject) => {
    if (!file || !width) {
      reject('expected at least two arguments: file, width');
    } else {
      const max_size = 500 * 1024;
      console.log('max size: ', max_size);
      if (file.size < max_size) {
        console.log('not greater than 500kb');
        resolve(file);
      } else {
        console.log('before resize: ', file.size);
        console.log('greater than 500kb, resizing in progress');
        // reads the file by extracting the url and create an image (img) with it as seen on line 11-12
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.addEventListener('load', e => {
          const image_url = e.target!.result;
          const image: HTMLImageElement = document.createElement('img');
          image.src = image_url as string;

          // create a canvas element on image load, calcualate the canvas resolution byu using the image resolution to determine the new height and witdth
          image.addEventListener('load', (e: Event) => {
            const target = e.target as HTMLImageElement;

            const canvas = document.createElement('canvas');
            const ratio = width / target.width;
            canvas.width = width;
            canvas.height = target.height * ratio;

            const context = canvas.getContext('2d');
            context!.drawImage(image, 0, 0, canvas.width, canvas.height);

            const new_image_url = context!.canvas.toDataURL();
            console.log(new_image_url);
            const image_file = base64ToImage(new_image_url);
            resolve(image_file);
          });
        });
      }
    }
  });

const base64ToImage = (url: string) => {
  console.log('convertion from base64 to image file in progress');
  const urlArr: string[] = url.split(',');
  const mime = urlArr![0].match(/:(.*?);/)![1];
  const data = urlArr[1];

  const dcryptData = atob(data); //decode base64 data
  let length = dcryptData.length;
  let dataArr = new Uint8Array(length);

  //   extract file extension
  const ext_index = mime!.indexOf('/');
  const ext = mime!.slice(ext_index + 1);

  while (length--) {
    dataArr[length] = dcryptData.charCodeAt(length);
  }
  const file = new File([dataArr], `file.${ext}`, { type: mime });
  console.log('after resize: ', file.size);
  return file;
};
