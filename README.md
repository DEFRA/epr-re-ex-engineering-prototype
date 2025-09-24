# epr-re-ex-engineering-prototype

A lightweight application allowing engineers working on the `epr-re-ex` services to perform exploratory/protyping activities.

<!-- prettier-ignore-start -->
<!-- TOC -->
- [Requirements](#requirements)
  - [Node.js](#nodejs)
- [Start the app](#start-the-app)
- [GOV.UK Prototype Kit and GOV.UK Frontend](#govuk-prototype-kit-and-govuk-frontend)
- [Docker](#docker)
  - [Development image](#development-image)
  - [Production image](#production-image)
  - [Debug docker](#debug-docker)
- [Licence](#licence)
  - [About the licence](#about-the-licence)
<!-- TOC -->
<!-- prettier-ignore-end -->

## Supporting multiple prototyping activities

The application is set up to allow multiple prototypes using a hierarchy of:

- Application (either Admin UI or EPR Frontend)
  - User role (for Admin UI: Service Maintainer or Regulator)
    - Version of the UI: Approved / In-Review / Concept
      - Individual journey

This hierarchy is reflected within the
- the table of contents rendered on the landing page for the prototype
  - the table of contents is declared in `app/views/index.js`
  - the table of contents is rendered in `app/views/index.html`
- the view (`.html`) and handler (`.js`) code within the `app/views` directory

## Requirements

### Node.js

Install [Node.js](http://nodejs.org/) `>= v22` and [npm](https://nodejs.org/) `>= v11`. You will find it easier to use
the Node Version Manager [nvm](https://github.com/creationix/nvm)

To use the correct version of Node.js for this application, via nvm:

```bash
cd epr-re-ex-engineering-prototype
nvm use
```

## Start the app

Start the app from the command line

```bash
npm ci --ignore-scripts
npm run dev
```

It will accessible on `http://localhost:2999`

## Add a page

As an example, to add an "in-review" prototype for regulators to "cancel a PRN" in the Admin UI (which would be available at `http://localhost:2999/admin-ui/regulators/in-review/cancel-a-prn`)

### Without backend logic

- Add a `.html` file `app/views/admin-ui/regulators/in-review/cancel-a-prn.html` for rendering the view
- Add an entry in the table of contents declared in `app/views/index.js` to show a link to the prototype on the landing page

### With backend logic

- Add a handler at `app/views/admin-ui/regulators/in-review/cancel-a-prn/index.js`
  - include the handler in the `module.exports` definition in `app/views/admin-ui/regulators/in-review/index.js`
  - The handler takes a (Express) `router` object, and can register handlers for `GET`, `POST`, etc as appropriate
- Add a `.html` file `app/views/admin-ui/regulators/in-review/cancel-a-prn/index.html` for rendering the view
- Add an entry in the table of contents declared in `app/views/index.js` to show a link to the prototype on the landing page

## GOV.UK Prototype Kit and GOV.UK Frontend

This is a lightweight application for prototyping. It is built on
[GOV.UK Prototype Kit](https://github.com/alphagov/govuk-prototype-kit), a tool for building interactive
prototypes that look like pages on GOV.UK, using components and styles from the
[GOV.UK Frontend](https://github.com/alphagov/govuk-frontend). Both are provided by the
[Government Digital Service (GDS)](https://www.gov.uk/government/organisations/government-digital-service).

> [!NOTE]
> The `GOV.UK Prototype Kit` is built with [express.js](https://expressjs.com/). The `Node.js`
> applications [cdp-node-frontend-template](https://github.com/DEFRA/cdp-node-frontend-template)
> and [cdp-node-backend-template](https://github.com/DEFRA/cdp-node-backend-template) at Defra are built with
> [Hapi.js](https://hapi.dev/)

- For information on the `GOV.UK Prototype Kit` see https://prototype-kit.service.gov.uk/docs/
- For tutorials on how to use the `GOV.UK Prototype Kit`
  see https://prototype-kit.service.gov.uk/docs/tutorials-and-guides
- For help with the underlying `GOV.UK Frontend` see:
  - https://design-system.service.gov.uk/
  - https://github.com/alphagov/govuk-frontend

> [!WARNING]
> The `epr-re-ex-engineering-prototype` is not a production ready application, it is a tool for prototyping. It is not
> designed to be used in production or to be resilient, secure or performant, nor should it be. It is designed to be
> used for prototyping ideas and testing them with users. It's a great tool for prototyping GOV web applications.

## Docker

For the most part you will not need to be concerned with `docker` when running this prototype. Everything is set up and
your `docker` will automatically be built, published and pushed when you deploy a new version of your prototype via the
UI in the CDP Portal.

### Development image

Build:

```bash
docker build --target development --no-cache --tag epr-re-ex-engineering-prototype:development .
```

Run:

```bash
docker run -e PORT=3000 -p 3000:3000 epr-re-ex-engineering-prototype:development
```

### Production image

Build:

```bash
docker build --no-cache --tag epr-re-ex-engineering-prototype .
```

Run:

> Update the password field to your password

```bash
docker run -e PASSWORD=beepBoopBeep -e PORT=3000 -p 3000:3000 epr-re-ex-engineering-prototype
```

### Debug docker

To debug issues in docker and to have a look at the built docker container in the same way as when it runs on CDP. You
can run an interactive shell:

Build:

```bash
docker build --no-cache --tag epr-re-ex-engineering-prototype .
```

Run:

```bash
docker run -it --entrypoint /bin/ash epr-re-ex-engineering-prototype
```

## Licence

THIS INFORMATION IS LICENSED UNDER THE CONDITIONS OF THE OPEN GOVERNMENT LICENCE found at:

<http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3>

The following attribution statement MUST be cited in your products and applications when using this information.

> Contains public sector information licensed under the Open Government license v3

### About the licence

The Open Government Licence (OGL) was developed by the Controller of Her Majesty's Stationery Office (HMSO) to enable
information providers in the public sector to license the use and re-use of their information under a common open
licence.

It is designed to encourage use and re-use of information freely and flexibly, with only a few conditions.
