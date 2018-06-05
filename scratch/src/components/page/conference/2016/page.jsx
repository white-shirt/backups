const PropTypes = require('prop-types');
const React = require('react');

const Navigation = require('../../../navigation/conference/2016/navigation.jsx');
const Footer = require('../../../footer/conference/2016/footer.jsx');

require('../page.scss');

const Page = props => (
    <div className="page mod-conference">
        <div id="navigation">
            <Navigation />
        </div>
        <div id="view">
            {props.children}
        </div>
        <div id="footer">
            <Footer />
        </div>
    </div>
);

Page.propTypes = {
    children: PropTypes.node
};

module.exports = Page;
