console.log('%cΔ&= Starting where I am using what I have doing what I can.', 'color:#0cd')

// document.getElementById('signup').addEventListener('click', () => {
//   location.href = 'mailto:subscribe@mattborn.com?subject=Let me know when you publish updates';
// })

fetch('brands.json')
  .catch(err => { console.log(err) })
  .then(response => response.json())
  .then(json => {
    console.log(json)
  })