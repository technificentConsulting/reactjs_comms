
const routes = {
    path: '',

    // Keep in mind, routes are evaluated in order
    children: [
        {
            path: '',
            load: () => import(/* webpackChunkName: 'home' */ './home'),
        },
        {
            path: '/chat',
            load: () => import(/* webpackChunkName: 'contact' */ './chat'),
        },
        {
            path: '/whiteboard',
            load: () => import(/* webpackChunkName: 'login' */ './whiteboard'),
        },
        {
            path: '/login',
            load: () => import(/* webpackChunkName: 'login' */ './login'),
        },
      
    ],

    async action({ next }) {
        // Execute each child route until one of them return the result
        const route = await next();

        // Provide default values for title, description etc.
        route.title = `${route.title || 'Untitled Page'} - www.technificentConsulting.com`;
        route.description = route.description || '';

        return route;
    },
};

// The error page is available by permanent url for development mode
if (__DEV__) {
    routes.children.unshift({
        path: '/error',
        action: require('./error').default,
    });
}

export default routes;