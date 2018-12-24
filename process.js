const fs = require('fs')
const request = require('superagent')

const brandsFile = fs.readFileSync('brands.json')
let brands = JSON.parse(brandsFile)
const urlsFile = fs.readFileSync('urls.json')
let urls = JSON.parse(urlsFile)

// fetch meta data with free Mercury web parser
function parseURL(obj) {
  return request
  .get('https://mercury.postlight.com/parser')
  .query({ url: obj.url })
  .set('x-api-key', 'MxJ9DnXUuLrJXedH2ZiQEuAO6g4wmK5mA9sGVFmD')
  .set('accept', 'json')
  .then(res => {
    let brand = {
      added: Date.now(),
      name: obj.name,
    }
    Object.assign(brand, res.body)
    delete brand['author']
    delete brand['date_published']
    delete brand['dek']
    delete brand['content']
    delete brand['next_page_url']
    delete brand['word_count']
    delete brand['total_pages']
    delete brand['rendered_pages']
    brands.push(brand)
  })
  .catch(err => {
    console.log(err.response, err.message)
  })
}

// only parse urls that don’t already exist in brands
urls = urls.filter(obj => !brands.some(brand => brand.url === obj.url))

if (urls.length) {
  (async url => {
    const promises = urls.map(parseURL)
    await Promise.all(promises);

    // after all the requests are done, sort and save everything to a JSON file
    console.log(urls.length +' brand'+ (urls.length !== 1 ? 's' : '') +' added')
    sorted = brands.sort((a, b) => a.name.localeCompare(b.name))
    fs.writeFileSync('brands.json', JSON.stringify(sorted))
  })(urls)
} else {
  console.log('No brands added')
}