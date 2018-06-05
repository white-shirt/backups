/*
 * Checks that the links in the footer on the homepage have the right URLs to redirect to
 *
 * Test cases: https://github.com/LLK/scratch-www/wiki/Most-Important-Workflows
 */

const tap = require('tap');

const {
    driver,
    webdriver
} = require('../selenium-helpers.js');

// Selenium's promise driver will be deprecated, so we should not rely on it
webdriver.SELENIUM_PROMISE_MANAGER = 0;

const rootUrl = process.env.ROOT_URL || 'https://scratch.ly';

// timeout for each test; timeout for suite set at command line level
const options = {timeout: 30000};

// number of tests in the plan
tap.plan(25);

tap.tearDown(function () {
    // quit the instance of the browser
    driver.quit();
});

tap.beforeEach(function () {
    // load the page with the driver
    return driver.get(rootUrl);
});

// Function clicks the link and returns the url of the resulting page

const clickFooterLinks = function (linkText) {
    return driver.wait(webdriver.until.elementLocated(webdriver.By.id('footer')))
        .then(function (element) {
            return element.findElement(webdriver.By.linkText(linkText));
        })
        .then(function (element) {
            return element.click();
        })
        .then(function () {
            return driver.getCurrentUrl();
        });
};

// ==== ABOUT SCRATCH column ====

// ABOUT SCRATCH
tap.test('clickAboutScratchLink', options, t => {
    const linkText = 'About Scratch';
    const expectedHref = '/about';
    clickFooterLinks(linkText).then(url => {
        // the href should be at the end of the URL
        t.equal(url.substr(-expectedHref.length), expectedHref);
        t.end();
    });
});

// FOR PARENTS
tap.test('clickForParentsLink', options, t => {
    const linkText = 'For Parents';
    const expectedHref = '/parents/';
    clickFooterLinks(linkText).then(url => {
        t.equal(url.substr(-expectedHref.length), expectedHref);
        t.end();
    });
});

// FOR EDUCATORS
tap.test('clickForEducatorsLink', options, t => {
    const linkText = 'For Educators';
    const expectedHref = '/educators';
    clickFooterLinks(linkText).then(url => {
        t.equal(url.substr(-expectedHref.length), expectedHref);
        t.end();
    });
});

// FOR DEVELOPERS
tap.test('clickForDevelopersScratchLink', options, t => {
    const linkText = 'For Developers';
    const expectedHref = '/developers';
    clickFooterLinks(linkText).then(url => {
        t.equal(url.substr(-expectedHref.length), expectedHref);
        t.end();
    });
});

// CREDITS
tap.test('clickCreditsLink', options, t => {
    const linkText = 'Credits';
    const expectedHref = '/info/credits';
    clickFooterLinks(linkText).then(url => {
        t.equal(url.substr(-expectedHref.length), expectedHref);
        t.end();
    });
});

// JOBS
tap.test('clickJobsLink', options, t => {
    const linkText = 'Jobs';
    const expectedHref = '/jobs';
    clickFooterLinks(linkText).then(url => {
        t.equal(url.substr(-expectedHref.length), expectedHref);
        t.end();
    });
});

// PRESS
tap.test('clickPressLink', options, t => {
    const linkText = 'Press';
    const expectedUrl = 'https://www.scratchfoundation.org/media-kit/';
    clickFooterLinks(linkText).then(url => {
        t.equal(url, expectedUrl);
        t.end();
    });
});

// ==== COMMUNITY column ====

// COMMUNITY GUIDELINES
tap.test('clickCommunityGuidelinesLink', options, t => {
    const linkText = 'Community Guidelines';
    const expectedHref = '/community_guidelines';
    clickFooterLinks(linkText).then(url => {
        t.equal(url.substr(-expectedHref.length), expectedHref);
        t.end();
    });
});

// DISCUSSION FORUMS
tap.test('clickDiscussionForumsLink', options, t => {
    const linkText = 'Discussion Forums';
    const expectedHref = '/discuss/';
    clickFooterLinks(linkText).then(url => {
        t.equal(url.substr(-expectedHref.length), expectedHref);
        t.end();
    });
});

// SCRATCH WIKI
tap.test('clickScratchWikiLink', options, t => {
    const linkText = 'Scratch Wiki';
    const expectedUrl = 'https://en.scratch-wiki.info/wiki/Scratch_Wiki_Home';
    clickFooterLinks(linkText).then(url => {
        t.equal(url, expectedUrl);
        t.end();
    });
});

// STATISTICS
tap.test('clickStatisticsLink', options, t => {
    const linkText = 'Statistics';
    const expectedHref = '/statistics/';
    clickFooterLinks(linkText).then(url => {
        t.equal(url.substr(-expectedHref.length), expectedHref);
        t.end();
    });
});

// ==== SUPPORT column ====

// TIPS PAGE
tap.test('clickTipsPageLink', options, t => {
    const linkText = 'Tips';
    const expectedHref = '/tips';
    clickFooterLinks(linkText).then(url => {
        t.equal(url.substr(-expectedHref.length), expectedHref);
        t.end();
    });
});

// FAQ
tap.test('clickFAQLink', options, t => {
    const linkText = 'FAQ';
    const expectedHref = '/info/faq';
    clickFooterLinks(linkText).then(url => {
        t.equal(url.substr(-expectedHref.length), expectedHref);
        t.end();
    });
});

// OFFLINE EDITOR
tap.test('clickOfflineEditorLink', options, t => {
    const linkText = 'Offline Editor';
    const expectedHref = '/download';
    clickFooterLinks(linkText).then(url => {
        t.equal(url.substr(-expectedHref.length), expectedHref);
        t.end();
    });
});

// CONTACT US
tap.test('clickContactUsLink', options, t => {
    const linkText = 'Contact Us';
    const expectedHref = '/contact-us/';
    clickFooterLinks(linkText).then(url => {
        t.equal(url.substr(-expectedHref.length), expectedHref);
        t.end();
    });
});

// SCRATCH STORE
tap.test('clickScratchStoreLink', options, t => {
    const linkText = 'Scratch Store';
    const expectedUrl = 'https://scratch-foundation.myshopify.com/';
    clickFooterLinks(linkText).then(url => {
        t.equal(url, expectedUrl);
        t.end();
    });
});

// DONATE
tap.test('clickDonateLink', options, t => {
    const linkText = 'Donate';
    const expectedUrl = 'https://secure.donationpay.org/scratchfoundation/';
    clickFooterLinks(linkText).then(url => {
        t.equal(url, expectedUrl);
        t.end();
    });
});

// ==== LEGAL column ====

// TERMS OF USE
tap.test('clickTermsOfUseLink', options, t => {
    const linkText = 'Terms of Use';
    const expectedHref = '/terms_of_use';
    clickFooterLinks(linkText).then(url => {
        t.equal(url.substr(-expectedHref.length), expectedHref);
        t.end();
    });
});

// PRIVACY POLICY
tap.test('clickPrivacyPolicyLink', options, t => {
    const linkText = 'Privacy Policy';
    const expectedHref = '/privacy_policy';
    clickFooterLinks(linkText).then(url => {
        t.equal(url.substr(-expectedHref.length), expectedHref);
        t.end();
    });
});

// DMCA
tap.test('clickDMCALink', options, t => {
    const linkText = 'DMCA';
    const expectedHref = '/DMCA';
    clickFooterLinks(linkText).then(url => {
        t.equal(url.substr(-expectedHref.length), expectedHref);
        t.end();
    });
});

// ==== SCRATCH FAMILY column ====

// SCRATCH ED (SCRATCHED)
tap.test('clickScratchEdLink', options, t => {
    const linkText = 'ScratchEd';
    const expectedUrl = 'http://scratched.gse.harvard.edu/';
    clickFooterLinks(linkText).then(url => {
        t.equal(url, expectedUrl);
        t.end();
    });
});

// SCRATCH JR (SCRATCHJR)
tap.test('clickScratchJrLink', options, t => {
    const linkText = 'ScratchJr';
    const expectedUrl = 'http://www.scratchjr.org/';
    clickFooterLinks(linkText).then(url => {
        t.equal(url, expectedUrl);
        t.end();
    });
});

// SCRATCH DAY
tap.test('clickScratchDayLink', options, t => {
    const linkText = 'Scratch Day';
    const expectedUrl = 'https://day.scratch.mit.edu/';
    clickFooterLinks(linkText).then(url => {
        t.equal(url, expectedUrl);
        t.end();
    });
});

// SCRATCH CONFERENCE
tap.test('clickScratchConferenceLink', options, t => {
    const linkText = 'Scratch Conference';
    const expectedHref = '/conference';
    clickFooterLinks(linkText).then(url => {
        t.equal(url.substr(-expectedHref.length), expectedHref);
        t.end();
    });
});

// SCRATCH FOUNDATION
tap.test('clickScratchFoundationLink', options, t => {
    const linkText = 'Scratch Foundation';
    const expectedUrl = 'https://www.scratchfoundation.org/';
    clickFooterLinks(linkText).then(url => {
        t.equal(url, expectedUrl);
        t.end();
    });
});
