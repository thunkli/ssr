# ssr
## Get Going:

#### For starters:

```
npm install
```

Or, even better (if you are using `yarn`):
```
yarn install
```

#### Then
To start the development server (which is what you want most of the time)

```
npm run dev
```

To start the production server is the usual `npm start`, but the code has to be built first, so:
```
npm run build
npm start
```
Or for quick production testing `npm run build-start`

Before deployment to a production server, your code should always be built first- so that the default `npm start` can be used to spin up quickly.

## Some Extra Configuration Information

I'm using the `babel-register` module which is required before any other server code and automatically converts any further requires / imports to ES5 javascript. This is for development purposes only (`npm run dev` ) - as recommended.

The server code (and the React code which is used on the server) is then built into the `/built` folder for production use ( `npm start` )