console.log('%cΔ&= Starting where I am using what I have doing what I can.', 'color:#0cd')

// document.getElementById('signup').addEventListener('click', () => {
//   location.href = 'mailto:subscribe@mattborn.com?subject=Let me know when you publish updates';
// })

const root = document.getElementById('brands')

fetch('brands.json')
  .catch(err => { console.log(err) })
  .then(response => response.json())
  .then(arr => {
    arr.forEach(obj => {
      const div = document.createElement('div')
      div.className = 'brand'
      
      const h1 = document.createElement('h1')
      h1.className = 'brand-name'
      h1.innerText = obj.name
      
      const img = document.createElement('div')
      img.className = 'brand-image'
      img.style.backgroundImage = 'url('+ obj.lead_image_url +')'

      div.appendChild(h1)
      div.appendChild(img)
      root.appendChild(div)
    })
  })