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

module.exports = [
  index,
  ...require ('./admin-ui')
]
