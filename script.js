//your JS code here. If required.
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

function loadImage(url) {
  return new Promise((resolve, reject) => {
    let img = new Image();
    img.src = url;
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image's URL: ${url}`));
  });
}

btn.addEventListener("click", function() {
  // Map each image URL to a promise that resolves with the loaded image
  const imagePromises = images.map(image => loadImage(image.url));

  // Wait for all the images to load
  Promise.all(imagePromises)
    .then(loadedImages => {
      // Append each loaded image to the output div
      loadedImages.forEach(img => output.appendChild(img));
    })
    .catch(error => {
      // Handle any errors that occurred while loading the images
      console.error(error);
    });
});