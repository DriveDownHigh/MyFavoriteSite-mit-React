import React, { PureComponent } from 'react';
import './SiteItem.scss';
import PropTypes from 'prop-types';

export default class SiteItem extends PureComponent {
    render() {
        const { siteId, appstoreName } = this.props;
        const siteIcon = `https://chayns.tobit.com/storage/${siteId}/Images/icon.png`;
        return (
            <div className="site_square">
                <div className="site_sqaure_img_wrapper">
                    <img
                        className="site_square_img"
                        src={siteIcon}
                        alt=""
                        onError={(e) => {
                            e.target.src = 'https://tappqa.tobit.com/Training/2020/Jara/MyFavoriteSites/unknown.png';
                            e.target.onerror = null;
                        }}
                        onClick={() => { chayns.openUrlInBrowser(`https://chayns.net/${siteId}`); }}
                    />
                </div>
                <div className="site_square_title">
                    {
                        appstoreName
                    }
                </div>
            </div>
        );
    }
}

SiteItem.propTypes = {
    siteId: PropTypes.string.isRequired,
    appstoreName: PropTypes.string.isRequired,
};
