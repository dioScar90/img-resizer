const getCorrectMeasures = ({ width, height }, targetAspectRatio, imageAspectRatio) => {
  // let newWidth, newHeight, x, y
  const isImageTooThin = imageAspectRatio < targetAspectRatio

  const newHeight = isImageTooThin ? height : width / imageAspectRatio
  const newWidth  = isImageTooThin ? width : height * imageAspectRatio
  
  // if (isImageTooThin) {
  //   newHeight = height
  //   newWidth = newHeight * imageAspectRatio
  // } else {
  //   newWidth = width
  //   newHeight = newWidth / imageAspectRatio
  // }
  
  const xTemp = (width - newWidth) / 2
  const yTemp = (height - newHeight) / 2

  return {
    newWidth, newHeight, xTemp, yTemp
  }
}

const imageOnload = image => {
  const canvas = document.querySelector('#canvas')
  const context = canvas.getContext('2d')
  
  const targetAspectRatio = 16 / 9
  const imageAspectRatio = image.width / image.height

  const { newWidth, newHeight, xTemp, yTemp } = getCorrectMeasures(canvas, targetAspectRatio, imageAspectRatio)

  const x = xTemp > newWidth ? newWidth : xTemp
  const y = yTemp > newWidth ? newWidth : yTemp


  context.fillStyle = 'black'
  context.fillRect(0, 0, canvas.width, canvas.height) //x: number, y: number, w: number, h: number
  context.drawImage(image, x, y, newWidth, newHeight) //image: CanvasImageSource, dx: number, dy: number, dw: number, dh: number
}

const mountCanvasImage = e => {
  const [ file ] = e.target.files
  
  if (!file)
    return

  const image = new Image()

  image.onload = () => imageOnload(image)

  const reader = new FileReader()
  reader.onload = function(e) { image.src = e.target.result }

  reader.readAsDataURL(file)
}

document.querySelector('#imageInput').addEventListener('change', mountCanvasImage)
document.querySelector('canvas').addEventListener('click', () => document.querySelector('#imageInput').click())





// document.getElementById("imageInput").addEventListener("change", function (event) {
//   const file = event.target.files[0];
//   if (!file) return;

//   const canvas = document.getElementById("canvas");
//   const context = canvas.getContext("2d");
//   const image = new Image();

//   image.onload = function () {
//       const targetAspectRatio = 16 / 9;
//       const imageAspectRatio = image.width / image.height;

//       let newWidth, newHeight, x, y;

//       if (imageAspectRatio > targetAspectRatio) {
//           newWidth = canvas.width;
//           newHeight = newWidth / imageAspectRatio;
//       } else {
//           newHeight = canvas.height;
//           newWidth = newHeight * imageAspectRatio;
//       }

//       x = (canvas.width - newWidth) / 2;
//       y = (canvas.height - newHeight) / 2;

//       context.fillStyle = "black";
//       context.fillRect(0, 0, canvas.width, canvas.height); //x: number, y: number, w: number, h: number
//       context.drawImage(image, x, y, newWidth, newHeight); //image: CanvasImageSource, dx: number, dy: number, dw: number, dh: number
//   };

//   const reader = new FileReader();
//   reader.onload = function (event) {
//       image.src = event.target.result;
//   };

//   reader.readAsDataURL(file);
// });