import React from 'react'
import {renderToString} from 'react-dom/server'
import {StaticRouter} from 'react-router'

import { matchRoutes, renderRoutes } from 'react-router-config'
// import {Provider} from 'react-redux'
// import routes from '../../client/routes'

class Home extends Component {
    render() {
        return <h1>Hello, {this.props.name}</h1>;
    }
}


async function clientRoute(ctx, next) {
    console.log(ctx)
    await ctx.render('index', {
        root: renderToString(
            <StaticRouter
                location={req.url}
                context={context}
            >
                <Home/>
            </StaticRouter>
        ),
        title: 'home',
        author: 'thunkli'
        //state: store.getState()
    })
}

export default clientRoute
