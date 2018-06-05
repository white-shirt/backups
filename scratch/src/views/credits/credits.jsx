const React = require('react');
const render = require('../../lib/render.jsx');
const FormattedHTMLMessage = require('react-intl').FormattedHTMLMessage;
const FormattedMessage = require('react-intl').FormattedMessage;

const Page = require('../../components/page/www/page.jsx');

require('./credits.scss');

const Credits = () => (
    <div className="inner credits">
        <h1><FormattedMessage id="credits.title" /></h1>
        <h2>MIT Scratch Team</h2>
        <p><FormattedMessage id="credits.developers" /></p>

        <ul>
            <li>
                <img
                    alt="Christan Avatar"
                    src="//cdn.scratch.mit.edu/get_image/user/2755634_170x170.png"
                />
                <span className="name">Christan Balch</span>
            </li>

            <li>
                <img
                    alt="Carl Avatar"
                    src="//cdn.scratch.mit.edu/get_image/user/3581881_170x170.png"
                />
                <span className="name">Carl Bowman</span>
            </li>
                                
            <li>
                <img
                    alt="Karishma Avatar"
                    src="//cdn2.scratch.mit.edu/get_image/user/27383273_60x60.png"
                />
                <span className="name">Karishma Chadha</span>
            </li>

            <li>
                <img
                    alt="Champika Avatar"
                    src="//cdn.scratch.mit.edu/get_image/user/900283_170x170.png"
                />
                <span className="name">Champika Fernando</span>
            </li>

            <li>
                <img
                    alt="Mark Avatar"
                    src="//cdn.scratch.mit.edu/get_image/user/24137617_170x170.png"
                />
                <span className="name">Mark Ferrell</span>
            </li>

            <li>
                <img
                    alt="Chris Avatar"
                    src="//cdn.scratch.mit.edu/get_image/user/1494_170x170.png"
                />
                <span className="name">Chris Garrity</span>
            </li>

            <li>
                <img
                    alt="Colby Avatar"
                    src="//cdn.scratch.mit.edu/get_image/user/10866958_170x170.png"
                />
                <span className="name">Colby Gutierrez-Kraybill</span>
            </li>

            <li>
                <img
                    alt="Paul Avatar"
                    src="//cdn.scratch.mit.edu/get_image/user/21986973_170x170.png"
                />
                <span className="name">Paul Kaplan</span>
            </li>

            <li>
                <img
                    alt="DD Avatar"
                    src="//cdn.scratch.mit.edu/get_image/user/527836_170x170.png"
                />
                <span className="name">DD Liu</span>
            </li>

            <li>
                <img
                    alt="Shruti Avatar"
                    src="//cdn.scratch.mit.edu/get_image/user/3714374_170x170.png"
                />
                <span className="name">Shruti Mohnot</span>
            </li>

            <li>
                <img
                    alt="Sarah Avatar"
                    src="//cdn.scratch.mit.edu/get_image/user/246290_170x170.png"
                />
                <span className="name">Sarah Otts</span>
            </li>

            <li>
                <img
                    alt="Carmelo Avatar"
                    src="//cdn.scratch.mit.edu/get_image/user/2286560_170x170.png"
                />
                <span className="name">Carmelo Presicce</span>
            </li>

            <li>
                <img
                    alt="Tina Avatar"
                    src="//cdn2.scratch.mit.edu/get_image/user/25500116_170x170.png"
                />
                <span className="name">Tina Quach</span>
            </li>

            <li>
                <img
                    alt="Mitchel Avatar"
                    src="//cdn.scratch.mit.edu/get_image/user/167_170x170.png"
                />
                <span className="name">Mitchel Resnick</span>
            </li>

            <li>
                <img
                    alt="ericr Avatar"
                    src="//cdn.scratch.mit.edu/get_image/user/159_170x170.png"
                />
                <span className="name">Eric Rosenbaum</span>
            </li>

            <li>
                <img
                    alt="Natalie Avatar"
                    src="//cdn.scratch.mit.edu/get_image/user/169_170x170.png"
                />
                <span className="name">Natalie Rusk</span>
            </li>

            <li>
                <img
                    alt="Ray Avatar"
                    src="//cdn.scratch.mit.edu/get_image/user/2584924_170x170.png"
                />
                <span className="name">Ray Schamp</span>
            </li>

            <li>
                <img
                    alt="Eric Avatar"
                    src="//cdn.scratch.mit.edu/get_image/user/3484484_170x170.png"
                />
                <span className="name">Eric Schilling</span>
            </li>

            <li>
                <img
                    alt="Andrew Avatar"
                    src="//cdn.scratch.mit.edu/get_image/user/1709047_170x170.png"
                />
                <span className="name">Andrew Sliwinski</span>
            </li>

            <li>
                <img
                    alt="Tracy Avatar"
                    src="//cdn.scratch.mit.edu/get_image/user/18417774_170x170.png"
                />
                <span className="name">Tracy Tang</span>
            </li>

            <li>
                <img
                    alt="Matthew Avatar"
                    src="//cdn.scratch.mit.edu/get_image/user/4373707_170x170.png"
                />
                <span className="name">Matthew Taylor</span>
            </li>

            <li>
                <img
                    alt="Moran Avatar"
                    src="//cdn.scratch.mit.edu/get_image/user/2678986_170x170.png"
                />
                <span className="name">Moran Tsur</span>
            </li>

            <li>
                <img
                    alt="Chris Avatar"
                    src="//cdn.scratch.mit.edu/get_image/user/3532363_170x170.png"
                />
                <span className="name">Chris Willis-Ford</span>
            </li>

            <li>
                <img
                    alt="Julia Avatar"
                    src="//cdn.scratch.mit.edu/get_image/user/2796185_170x170.png"
                />
                <span className="name">Julia Zimmerman</span>
            </li>
        </ul>

        <p><FormattedMessage id="credits.moderators" /></p>

        <ul>
            <li>
                <img
                    alt="Jolie Avatar"
                    src="//cdn.scratch.mit.edu/get_image/user/2496866_170x170.png"
                />
                <span className="name">Jolie Castellucci</span>
            </li>

            <li>
                <img
                    alt="Ellen Avatar"
                    src="//cdn.scratch.mit.edu/get_image/user/24164779_170x170.png"
                />
                <span className="name">Ellen Daoust</span>
            </li>

            <li>
                <img
                    alt="Linda Avatar"
                    src="//cdn.scratch.mit.edu/get_image/user/1048810_170x170.png"
                />
                <span className="name">Linda Fernsel</span>
            </li>

            <li>
                <img
                    alt="Mark Avatar"
                    src="//cdn.scratch.mit.edu/get_image/user/49156_170x170.png"
                />
                <span className="name">Mark Goff</span>
            </li>

            <li>
                <img
                    alt="Joel Avatar"
                    src="//cdn2.scratch.mit.edu/get_image/user/26249744_60x60.png"
                />
                <span className="name">Joel Gritter</span>
            </li>

            <li>
                <img
                    alt="Carolina Avatar"
                    src="//cdn2.scratch.mit.edu/get_image/user/5311910_60x60.png"
                />
                <span className="name">Carolina Kaufman</span>
            </li>

            <li>
                <img
                    alt="Dalton Avatar"
                    src="//cdn.scratch.mit.edu/get_image/user/373646_170x170.png"
                />
                <span className="name">Dalton Miner</span>
            </li>

            <li>
                <img
                    alt="Franchette Avatar"
                    src="//cdn.scratch.mit.edu/get_image/user/159139_170x170.png"
                />
                <span className="name">Franchette Viloria</span>
            </li>

            <li>
                <img
                    alt="Annie Avatar"
                    src="//cdn.scratch.mit.edu/get_image/user/4747093_170x170.png"
                />
                <span className="name">Annie Whitehouse</span>
            </li>
        </ul>

        <h2><FormattedMessage id="credits.previousTitle" /></h2>
        <p>
            <FormattedMessage id="credits.previousBody" />
            &nbsp;
            Ben Berg,
            Amos Blanton,
            Karen Brennan,
            Juanita Buitrago,
            Leo Burd,
            Gaia Carini,
            Kasia Chmielinski,
            Michelle Chung,
            Shane Clements,
            Hannah Cole,
            Sayamindu Dasgupta,
            Margarita Dekoli,
            Evelyn Eastmond,
            Dave Feinberg,
            Chris Graves,
            Megan Haddadi,
            Connor Hudson,
            Christina Huang,
            Tony Hwang,
            Abdulrahman Idlbi,
            Randy Jou,
            Lily Kim,
            Tauntaun Kim,
            Saskia Leggett,
            Tim Mickel,
            Amon Millner,
            Ricarose Roque,
            Andrea Saxman,
            Jay Silver,
            Tammy Stern,
            Lis Sylvan,
            Hanako Tjia,
            Claudia Urrea,
            Oren Zuckerman
        </p>

        <h2>
            <FormattedMessage id="credits.partnersTitle" />
        </h2>
        <p>
            <FormattedMessage id="credits.partnersBody" />
        </p>

        <h2>
            <FormattedMessage id="credits.researchersTitle" />
        </h2>
        <p>
            <FormattedHTMLMessage id="credits.researchersBody" />
        </p>

        <h2>
            <FormattedMessage id="credits.acknowledgementsTitle" />
        </h2>
        <p>
            <FormattedHTMLMessage id="credits.acknowledgementsContributors" />
            &nbsp;
            Susan Abend, Robbie Berg, Lauren Bessen, Keith Braadfladt, Susan Carillo,
            Will Denton, Nathan Dinsmore, Catherine Feldman, Jodi Finch, Ioana Fineberg,
            JT Galla, Rachel Garber, Chris Garrity, Cassy Gibbs, Brian Harvey,
            Roland Hebert, Tracy Ho, Benjamin Howe, Kapaya Katongo, Evan Karatzas,
            Christine Kim, Joren Lauwers, Mike Lee, Jeff Lieberman, Mark Loughridge,
            Kelly Liu, Anthony Lu, Danny Lutz, David Malan, Wayne Marshall,
            John McIntosh, Paul Medlock-Walton, Dongfang (Tian) Mi, Ximena Miranda,
            Jens Moenig, Evan Moore, Geetha Narayanan, Kate Nazemi, Liddy Nevile,
            Wing Ngan, Derek O&#39;Connell, Tim Radvan, Karen Randall, Ian Reynolds,
            Miriam Ruiz, Chinua Shaw, Ed Shems, Cynthia Solomon, Daniel Strimpel,
            Kilmer Sweazy, John Henry Thompson, Ubong Ukoh, Vladimir Vuksan, Han Xu.
            &nbsp;
            <FormattedHTMLMessage id="credits.acknowledgementsTranslators" />
        </p>
        <p>
            <FormattedMessage id="credits.acknowledgementsCommunity" />
        </p>
        <p>
            <FormattedMessage id="credits.acknowledgementsInfluencers" />
        </p>
        <h2>
            <FormattedMessage id="credits.supportersTitle" />
        </h2>
        <p>
            <FormattedMessage id="credits.supportersFinancialHeader" />
        </p>
        <p>
            <a href="http://www.nsf.gov/">National Science Foundation</a>,
            <a href="http://www.scratchfoundation.org/"> Scratch Foundation</a>,
            <a href="http:/www.siegelendowment.org"> Siegel Family Endowment</a>,
            <a href="http://www.google.org/"> Google</a>,
            <a href="http://www.legofoundation.com/"> LEGO Foundation</a>,
            <a href="http://www.intel.com/"> Intel</a>,
            <a href="http://www.turner.com/company/"> Cartoon Network</a>,
            <a href="http://www.fundacaolemann.org.br/lemann-foundation/"> Lemann Foundation</a>,
            <a href="https://www.macfound.org/"> MacArthur Foundation</a>.
        </p>

        <p><FormattedMessage id="credits.supportersServicesHeader" /></p>
        <p>
            <a href="http://www.advancedinstaller.com/"> Advanced Installer</a>,
            <a href="http://aws.amazon.com/"> Amazon Web Services</a>,
            <a href="https://codetree.com/"> Codetree</a>,
            <a href="https://www.fastly.com/"> Fastly</a>,
            <a href="https://www.geckoboard.com"> Geckoboard</a>,
            <a href="https://github.com/"> Github</a>,
            <a href="https://www.inversoft.com/"> Inversoft</a>,
            <a href="http://mailchimp.com/"> MailChimp</a>,
            <a href="http://mandrill.com/">  Mandrill</a>,
            <a href="http://newrelic.com/"> New Relic</a>,
            <a href="https://www.pagerduty.com/"> PagerDuty</a>,
            <a href="https://www.pingdom.com/"> Pingdom</a>,
            <a href="https://www.rallydev.com/"> Rally</a>,
            <a href="https://saucelabs.com/"> SauceLabs</a>,
            <a href="https://screenhero.com/"> Screenhero</a>,
            <a href="https://getsentry.com/welcome/"> Sentry</a>,
            <a href="http://www.git-tower.com/"> Tower</a>,
            <a href="https://www.transifex.com/"> Transifex</a>,
            <a href="https://travis-ci.org/"> Travis-CI</a>.
        </p>

        <p><FormattedMessage id="credits.supportersOpenHeader" /></p>
        <p>
            <a href="https://www.djangoproject.com/"> Django</a>,
            <a href="http://djangobb.org/"> DjangoBB</a>,
            <a href="https://www.docker.com/"> Docker</a>,
            <a href="https://www.elastic.co/"> Elasticsearch</a>,
            <a href="http://ganglia.sourceforge.net/"> Ganglia</a>,
            <a href="http://gunicorn.org"> Gunicorn</a>,
            <a href="https://jenkins-ci.org/"> Jenkins</a>,
            <a href="http://www.linux.org/"> Linux</a>,
            <a href="http://memcached.org/"> Memcached</a>,
            <a href="https://www.mediawiki.org/wiki/MediaWiki"> MediaWiki</a>,
            <a href="http://www.mysql.com/"> MySQL</a>,
            <a href="https://www.nagios.org/"> Nagios</a>,
            <a href="https://www.nginx.com/resources/wiki/"> Nginx</a>,
            <a href="https://nodejs.org/en/"> Node.js</a>,
            <a href="http://www.postgresql.org/"> PostgreSQL</a>,
            <a href="https://www.python.org/"> Python</a>,
            <a href="http://redis.io/"> Redis</a>,
            <a href="http://saltstack.com/"> SaltStack</a>,
            <a href="https://github.com/etsy/statsd/"> StatsD</a>,
            <a href="http://www.ubuntu.com/"> Ubuntu</a>,
            <a href="https://www.varnish-cache.org/"> Varnish</a>.
        </p>
    </div>
);
 

render(<Page><Credits /></Page>, document.getElementById('app'));
