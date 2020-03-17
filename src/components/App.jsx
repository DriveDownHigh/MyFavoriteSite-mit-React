import { hot } from 'react-hot-loader/root';
import React, { PureComponent } from 'react';
import fetchData from './fetchData';

// Components
import Headline from './header/headline/Headline';
import Intro from './header/intro/Intro';
import SiteList from '../SiteList/SiteList';
import Filter from './filter/Filter';
import Formular from './formular/Formular';


// We use PureComponent instead of Component because it handles the shouldComponentUpdate method for us.
// If we want to define our own shouldComponentUpdate logic we have to use Component instead of PureComponent.
class App extends PureComponent {
    constructor() {
        super();
        this.state = {
            loading: false,
            sites: [],
        };
    }

    componentDidMount() {
        this.setState({
            loading: true,
        });
        fetchData('https://chayns1.tobit.com/TappApi/Site/SlitteApp?SearchString=love&Skip=0&Take=50')
            .then((data) => this.setState({
                loading: false,
                sites: data.Data,
            }));
    }

    // fetchData(text) {
    //     fetch(`https://chayns1.tobit.com/TappApi/Site/SlitteApp?SearchString=${text}&Skip=0&Take=50`)
    //         .then((data) => this.setState({
    //             loading: false,
    //             sites: data.Data,
    //         }));
    // }

    render() {
        return (
            <>
                <Headline headline="My Favorite Sites"/>
                <Intro intro="Hier werden deine meist besuchten Sites als Favoriten angezeigt.
                Unten befindet sich ein Formular, falls du auch deine eigene Seite hier angezeigt bekommen möchtest."
                />
                <Filter
                    filterValue={(filter) => {
                        let text;
                        if (filter.length === 0) {
                            text = 'love';
                        } else {
                            text = filter;
                        }
                        this.setState({
                            loading: true,
                        });
                        fetchData(`https://chayns1.tobit.com/TappApi/Site/SlitteApp?SearchString=${text}&Skip=0&Take=50`)
                            .then((data) => this.setState({
                                loading: false,
                                sites: data.Data,
                            }));
                    }}
                />
                <SiteList state={this.state}/>
                <Formular/>
            </>
        );
    }
}

export default App;
export const HotApp = hot(App);
