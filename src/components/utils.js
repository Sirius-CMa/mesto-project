// export function checkButton(evt, text) {
//   const textBtn = evt.target.querySelector('.submit')
//   textBtn.textContent = text;
// }


export const loadImage = (url) => new Promise((resolve, reject) => {
  const img = new Image();
  img.src = url;
  img.addEventListener('load', () => resolve(url));
  img.addEventListener('error', (err) => reject(err));
});

// Старушка Шапокляк
// Тварить злы. Кто людям помогает - тот тратит время зря. Хорошими делами прославиться нельзя.
