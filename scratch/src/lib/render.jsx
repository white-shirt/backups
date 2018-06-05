const redux = require('redux');
const thunk = require('redux-thunk').default;
// JSX syntax transforms to React.createElement
const React = require('react'); // eslint-disable-line
const ReactDOM = require('react-dom');
const StoreProvider = require('react-redux').Provider;

const IntlProvider = require('./intl.jsx').IntlProvider;
const permissionsActions = require('../redux/permissions.js');
const sessionActions = require('../redux/session.js');
const reducer = require('../redux/reducer.js');

require('../main.scss');

/**
 * Function to render views into a full page
 * @param  {object} jsx      jsx component of the view
 * @param  {object} element  html element to render to on the template
 * @param  {array}  reducers list of view-specific reducers
 */
const render = (jsx, element, reducers) => {
    // Get locale and messages from global namespace (see "init.js")
    let locale = window._locale || 'en';
    let messages = {};
    if (typeof window._messages !== 'undefined') {
        if (typeof window._messages[locale] === 'undefined') {
            // Fall back on the split
            locale = locale.split('-')[0];
        }
        if (typeof window._messages[locale] === 'undefined') {
            // Language appears to not be supported – fall back to 'en'
            locale = 'en';
        }
        messages = window._messages[locale];
    }

    const allReducers = reducer(reducers);
    const store = redux.createStore(
        allReducers,
        redux.applyMiddleware(thunk)
    );

    // Render view component
    ReactDOM.render(
        <StoreProvider store={store}>
            <IntlProvider
                locale={locale}
                messages={messages}
            >
                {jsx}
            </IntlProvider>
        </StoreProvider>,
        element
    );

    // Get initial session & permissions
    store.dispatch(permissionsActions.getPermissions());
    store.dispatch(sessionActions.refreshSession());
};

module.exports = render;
