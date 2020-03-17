import React, { PureComponent } from 'react';
import SmallWaitCursor from 'chayns-components/lib/react-chayns-smallwaitcursor/component/SmallWaitCursor';

import SiteItem from './SiteItem';

export default class SiteList extends PureComponent {

    render() {
        const sitedata = this.props.state;
        const { sites } = sitedata;
        let sitesquares;
        if (sites === null) {
            sitesquares = 'Keine Seiten gefunden';
        } else {
            sitesquares = sites.map((item) => {
                return (
                    <SiteItem
                        siteId={item.siteId}
                        appstoreName={item.appstoreName}
                        key={item.locationId}
                    />
                );
            });
        }
        const show = sitedata.loading ? <SmallWaitCursor className="waitCursor" show/> : sitesquares;
        return (
            <div>
                <div className="site_squares">
                    {show}
                </div>
            </div>
        );
    }
}
