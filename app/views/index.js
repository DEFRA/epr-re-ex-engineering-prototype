const fs = require('fs')
const path = require('path')

// crawl through views directory (and sub-directory)
// dynamically register routes (with url based on location within views/ directory) wherever
// an exported GET or POST function is found
function views(router, basePath = __dirname) {
  const relativePath = basePath.replace(__dirname, '')
  try {
    const handlers = require(`.${relativePath}`)

    if (handlers.GET) {
      router.get(relativePath, handlers.GET)
    }
    if (handlers.POST) {
      router.post(relativePath, handlers.POST)
    }
  } catch (e) {
    // ignore
  }

  nestedDirectorys(basePath).forEach(nestedPath => {
    views(router, nestedPath)
  })
}

function nestedDirectorys(basePath) {
  return fs.readdirSync(basePath, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => path.join(dirent.path, dirent.name))
}

function index(router) {
  router.get('/', function (req, res, next) {

    res.locals.data['tableOfContents'] = {
      applications: [
        {
          name: 'Admin UI',
          users: [
            {
              name: 'Service maintainer',
              prototypeStatuses: [
                {
                  name: 'Approved',
                  colour: 'green',
                  pages: []
                },
                {
                  name: 'In review',
                  colour: 'blue',
                  pages: []
                },
                {
                  name: 'Concept',
                  pages: ['Select an organisation']
                }
              ]
            }
          ]
        }
      ]
    }

    next()
  })
}

module.exports = {
  register(router) {
    index(router)
    views(router)
  }
}
