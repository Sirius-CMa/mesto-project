export function checkButton(evt, text, timeout) {
  const textBtn = evt.target.querySelector('.submit')
  setTimeout(() => {
    textBtn.textContent = text
  }, timeout);
}

export const loadImage = src =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  })
