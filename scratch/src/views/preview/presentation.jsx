const FormattedDate = require('react-intl').FormattedDate;
const injectIntl = require('react-intl').injectIntl;
const intlShape = require('react-intl').intlShape;
const PropTypes = require('prop-types');
const React = require('react');
const Formsy = require('formsy-react').default;
const classNames = require('classnames');

const GUI = require('scratch-gui').default;
const IntlGUI = injectIntl(GUI);

const sessionActions = require('../../redux/session.js');
const decorateText = require('../../lib/decorate-text.jsx');
const FlexRow = require('../../components/flex-row/flex-row.jsx');
const Avatar = require('../../components/avatar/avatar.jsx');
const CappedNumber = require('../../components/cappednumber/cappednumber.jsx');
const ShareBanner = require('../../components/share-banner/share-banner.jsx');
const ThumbnailColumn = require('../../components/thumbnailcolumn/thumbnailcolumn.jsx');
const InplaceInput = require('../../components/forms/inplace-input.jsx');

require('./preview.scss');

const PreviewPresentation = props => {
    const {
        creditInfo,
        editable,
        faved,
        favoriteCount,
        intl,
        isFullScreen,
        loved,
        loveCount,
        projectId,
        projectInfo,
        remixes,
        sessionStatus,
        studios,
        user,
        onFavoriteClicked,
        onLoveClicked,
        onSeeInside,
        onUpdate
        // ...otherProps TBD
    } = props;
    const shareDate = (projectInfo.history && projectInfo.history.shared) ? projectInfo.history.shared : '';
    return (
        <div className="preview">
            <ShareBanner>
                <FlexRow className="preview-row">
                    <span className="share-text">
                        This project is not shared — so only you can see it. Click share to let everyone see it!
                    </span>
                    <button className="button share-button">
                        Share
                    </button>
                </FlexRow>
            </ShareBanner>
            { projectInfo && projectInfo.author && projectInfo.author.id && (
                <div className="inner">
                    <Formsy>
                        <FlexRow className="preview-row">
                            <FlexRow className="project-header">
                                <Avatar
                                    src={`https://cdn2.scratch.mit.edu/get_image/user/${projectInfo. author.id}_48x48.png`}
                                />
                                <div className="title">
                                    {editable ?
                                        
                                        <InplaceInput
                                            className="project-title"
                                            handleUpdate={onUpdate}
                                            name="title"
                                            validationErrors={{
                                                maxLength: 'Sorry title is too long'
                                                // maxLength: props.intl.formatMessage({
                                                //     id: 'project.titleMaxLength'
                                                // })
                                            }}
                                            validations={{
                                                // TODO: actual 100
                                                maxLength: 40
                                            }}
                                            value={projectInfo.title}
                                        /> :
                                        <div className="project-title">{projectInfo.title}</div>
                                    }
                                    {`${intl.formatMessage({id: 'thumbnail.by'})} `}
                                    <a href={`/users/${projectInfo.author.username}`}>
                                        {projectInfo.author.username}
                                    </a>
                                </div>
                            </FlexRow>
                            <div className="project-buttons">
                                {sessionStatus === sessionActions.Status.FETCHED &&
                                    Object.keys(user).length > 0 &&
                                    user.id !== projectInfo.author.id &&
                                    <button className="button remix-button">
                                        Remix
                                    </button>
                                }
                                <button
                                    className="button see-inside-button"
                                    onClick={onSeeInside}
                                >
                                    See Inside
                                </button>
                            </div>
                        </FlexRow>
                        <FlexRow className="preview-row">
                            <IntlGUI
                                isPlayerOnly
                                basePath="/"
                                className="guiPlayer"
                                isFullScreen={isFullScreen}
                                previewInfoVisible="false"
                                projectId={projectId}
                            />
                            <FlexRow className="project-notes">
                                {shareDate && (
                                    <div className="share-date">
                                        <div className="copyleft">&copy;</div>
                                        {' '}
                                        {/*  eslint-disable react/jsx-sort-props */}
                                        <FormattedDate
                                            value={Date.parse(shareDate)}
                                            day="2-digit"
                                            month="short"
                                            year="numeric"
                                        />
                                        {/*  eslint-enable react/jsx-sort-props */}
                                    </div>
                                )}
                                {creditInfo && creditInfo.author && creditInfo.id && (
                                    <FlexRow className="remix-credit">
                                        <Avatar
                                            className="remix"
                                            src={`https://cdn2.scratch.mit.edu/get_image/user/${creditInfo.author.id}_48x48.png`}
                                        />
                                        <div className="credit-text">
                                            Thanks to <a
                                                href={`/users/${creditInfo.author.username}`}
                                            >
                                                {creditInfo.author.username}
                                            </a> for the original project <a
                                                href={`/preview/${creditInfo.id}`}
                                            >
                                                {creditInfo.title}
                                            </a>.
                                        </div>
                                    </FlexRow>
                                )
                                }
                                {editable ?
                                    <InplaceInput
                                        className="project-description"
                                        handleUpdate={onUpdate}
                                        name="description"
                                        type="textarea"
                                        validationErrors={{
                                            maxLength: 'Sorry description is too long'
                                            // maxLength: props.intl.formatMessage({
                                            //     id: 'project.descriptionMaxLength'
                                            // })
                                        }}
                                        validations={{
                                            // TODO: actual 5000
                                            maxLength: 1000
                                        }}
                                        value={projectInfo.description}
                                    /> :
                                    <div className="project-description">
                                        {decorateText(projectInfo.description)}
                                    </div>
                                }
                            </FlexRow>
                        </FlexRow>
                        <FlexRow className="preview-row">
                            <FlexRow className="stats">
                                <div
                                    className={classNames('project-loves', {loved: loved})}
                                    key="loves"
                                    onClick={onLoveClicked}
                                >
                                    {loveCount}
                                </div>
                                <div
                                    className={classNames('project-favorites', {faved: faved})}
                                    key="favorites"
                                    onClick={onFavoriteClicked}
                                >
                                    {favoriteCount}
                                </div>
                                <div
                                    className="project-remixes"
                                    key="remixes"
                                >
                                    {projectInfo.remix.count}
                                </div>
                                <div
                                    className="project-views"
                                    key="views"
                                >
                                    <CappedNumber value={projectInfo.stats.views} />
                                </div>
                            </FlexRow>
                            <FlexRow className="action-buttons">
                                <a href="#">
                                    <li>
                                        Add to Studio
                                    </li>
                                </a>
                                <a href="#">
                                    <li>
                                        Social
                                    </li>
                                </a>
                                <a href="#">
                                    <li className="report">
                                        Report
                                    </li>
                                </a>
                            </FlexRow>
                        </FlexRow>
                        <FlexRow className="preview-row">
                            <div className="comments-container">
                                <div className="project-title">
                                    Comments go here
                                </div>
                            </div>
                            <FlexRow className="column">
                                <FlexRow className="remix-list">
                                    <div className="project-title">
                                        Remixes
                                    </div>
                                    {remixes && remixes.length === 0 ? (
                                        <span>No remixes</span>
                                    ) : (
                                        <ThumbnailColumn
                                            cards
                                            showAvatar
                                            itemType="preview"
                                            items={remixes.slice(0, 5)}
                                            showFavorites={false}
                                            showLoves={false}
                                            showViews={false}
                                        />
                                    )}
                                </FlexRow>
                                <FlexRow className="studio-list">
                                    <div className="project-title">
                                        Studios
                                    </div>
                                    {studios && studios.length === 0 ? (
                                        <span>No studios</span>
                                    ) : (
                                        <ThumbnailColumn
                                            cards
                                            showAvatar
                                            itemType="gallery"
                                            items={studios.slice(0, 5)}
                                            showFavorites={false}
                                            showLoves={false}
                                            showViews={false}
                                        />
                                    )}
                                </FlexRow>
                            </FlexRow>
                        </FlexRow>
                    </Formsy>
                </div>
            )}
        </div>
        
    );
};

PreviewPresentation.propTypes = {
    creditInfo: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        description: PropTypes.string,
        author: PropTypes.shape({id: PropTypes.number}),
        history: PropTypes.shape({
            created: PropTypes.string,
            modified: PropTypes.string,
            shared: PropTypes.string
        }),
        stats: PropTypes.shape({
            views: PropTypes.number,
            loves: PropTypes.number,
            favorites: PropTypes.number
        }),
        remix: PropTypes.shape({
            parent: PropTypes.number,
            root: PropTypes.number
        })
    }),
    editable: PropTypes.bool,
    faved: PropTypes.bool,
    favoriteCount: PropTypes.number,
    intl: intlShape,
    isFullScreen: PropTypes.bool,
    loveCount: PropTypes.number,
    loved: PropTypes.bool,
    onFavoriteClicked: PropTypes.func,
    onLoveClicked: PropTypes.func,
    onSeeInside: PropTypes.func,
    onUpdate: PropTypes.func,
    projectId: PropTypes.number,
    projectInfo: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        description: PropTypes.string,
        author: PropTypes.shape({id: PropTypes.number}),
        history: PropTypes.shape({
            created: PropTypes.string,
            modified: PropTypes.string,
            shared: PropTypes.string
        }),
        stats: PropTypes.shape({
            views: PropTypes.number,
            loves: PropTypes.number,
            favorites: PropTypes.number
        }),
        remix: PropTypes.shape({
            parent: PropTypes.number,
            root: PropTypes.number
        })
    }),
    remixes: PropTypes.arrayOf(PropTypes.object),
    sessionStatus: PropTypes.string.isRequired,
    studios: PropTypes.arrayOf(PropTypes.object),
    user: PropTypes.shape({
        id: PropTypes.number,
        banned: PropTypes.bool,
        username: PropTypes.string,
        token: PropTypes.string,
        thumbnailUrl: PropTypes.string,
        dateJoined: PropTypes.string,
        email: PropTypes.string,
        classroomId: PropTypes.string
    }).isRequired
};

module.exports = injectIntl(PreviewPresentation);
