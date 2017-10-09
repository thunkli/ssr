const path = require('path');
const Koa = require('koa');
const route = require('koa-route');
const serve = require('koa-static');
const views = require('koa-views');
const clientRoute = require('./router/index.js');

const app = new Koa();
// Must be used before any router is used
app.use(views(__dirname + '/views', {
    map: {
        html: 'handlebars'
    }
}));


app.use(clientRoute)

const about = ctx => {
    ctx.response.type = 'html';
    ctx.response.body = '<a href="/">Index Page</a>';
};
const error = ctx => {
    ctx.throw(500);
};
const notFound = ctx => {
    ctx.response.status = 404;
    ctx.response.body = 'Page Not Found';
};
// app.use(route.get('/', home));
app.use(route.get('/about', about));
app.use(route.get('/error', error));
app.use(route.get('/404', notFound));

const main = serve(path.join(__dirname));
app.use(main);






//error
const handler = async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.response.status = err.statusCode || err.status || 500;
        ctx.response.type = 'html';
        ctx.response.body = '<p>Something wrong, please contact administrator.</p>';
        ctx.app.emit('error', err, ctx);
    }
};
app.use(handler);
app.on('error', function(err) {
    console.log('logging error ', err.message);
    console.log(err);
});
app.listen(3000);
console.log(`\n==> 🌎  Listening on port 3000. Open up http://localhost:3000/ in your browser.\n`)