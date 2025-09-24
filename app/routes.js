//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const fs = require('fs')
const path = require('path')

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

const viewsPath = path.join(__dirname, 'views')

registerViewHandlers(router, viewsPath)

// recursively crawl through views directory (and sub-directories)
// dynamically register routes (with url based on location within views/ directory)
// wherever an exported GET or POST function is found
function registerViewHandlers(router, basePath) {
  try {
    const relativePath = basePath.replace(__dirname, '')
    const handlers = require(`.${relativePath}`)

    const urlPath = basePath.replace(viewsPath, '')
    if (handlers.GET) {
      router.get(urlPath, handlers.GET)
    }
    if (handlers.POST) {
      router.post(urlPath, handlers.POST)
    }
  } catch (e) {
    // ignore
  }

  nestedDirectorys(basePath).forEach(nestedPath => {
    registerViewHandlers(router, nestedPath)
  })
}

function nestedDirectorys(basePath) {
  return fs.readdirSync(basePath, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => path.join(dirent.path, dirent.name))
}