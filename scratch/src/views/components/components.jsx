const React = require('react');
const render = require('../../lib/render.jsx');

const Page = require('../../components/page/www/page.jsx');
const Box = require('../../components/box/box.jsx');
const Button = require('../../components/forms/button.jsx');
const Carousel = require('../../components/carousel/carousel.jsx');
const Input = require('../../components/forms/input.jsx');
const Spinner = require('../../components/spinner/spinner.jsx');

require('./components.scss');

const Components = () => (
    <div className="components">
        <div className="inner">
            <h1>Button</h1>
            <Button>I love button</Button>
            <h1>Form</h1>
            <Input
                maxLength="30"
                name="test"
                type="text"
            />
            <h1>Box Component</h1>
            <Box
                more="Cat Gifs"
                moreUrl="http://www.catgifpage.com/"
                title="Some Title"
            >
                <h4>Things go in here</h4>
                <p>Lorem ipsum dolor sit amet.</p>
            </Box>
            <h1>Carousel Component</h1>
            <Carousel />
            <Box title="Carousel component in a box!">
                <Carousel />
            </Box>
            <h1>This is a Spinner</h1>
            <Spinner />
            <h1>Colors</h1>
            <div className="colors">
                <span className="ui-blue">$ui-blue</span>
                <span className="ui-orange">$ui-orange</span>
                <span className="ui-light-gray">$ui-light-gray</span>
                <span className="ui-gray">$ui-gray</span>
                <span className="ui-dark-gray">$ui-dark-gray</span>
                <span className="background-color">$background-color</span>
                <span className="ui-aqua">$ui-aqua</span>
                <span className="ui-purple">$ui-purple</span>
                <span className="ui-white">$ui-white</span>
                <span className="ui-border">$ui-border</span>
                <span className="active-gray">$active-gray</span>
                <span className="active-dark-gray">$active-dark-gray</span>
                <span className="box-shadow-gray">$box-shadow-gray</span>
                <span className="overlay-gray">$overlay-gray</span>
                <span className="header-gray">$header-gray</span>
                <span className="type-gray">$type-gray</span>
                <span className="type-white">$type-white</span>
                <span className="link-blue">$link-blue</span>
                <span className="splash-green">$splash-green</span>
                <span className="splash-pink">$splash-pink</span>
                <span className="splash-blue">$splash-blue</span>
            </div>
        </div>
    </div>
);

render(<Page><Components /></Page>, document.getElementById('app'));
