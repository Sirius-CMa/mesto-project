export function checkButton(evt, text, timeout) {
  const textBtn = evt.target.querySelector('.submit')
  setTimeout(() => {
    textBtn.textContent = text
  }, timeout);
}


export const loadImage = (url) => new Promise((resolve, reject) => {
  const img = new Image();
  img.src = url;
  img.addEventListener('load', () => resolve(url));
  img.addEventListener('error', (err) => reject(err));
});

// : просто для commit
