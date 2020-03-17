import React, { PureComponent } from 'react';
import Input from 'chayns-components/lib/react-chayns-input/component/Input';
import PropTypes from 'prop-types';

export default class Filter extends PureComponent {
    constructor() {
        super();
        this.state = {
            filter: '',
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            filter: event,
        });
        let timeout;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            this.props.filterValue(this.state.filter);
        }, 500);
    }

    render() {
        return <Input className="input_search_bar" placeholder="Finden" type="text" onChange={this.handleChange}/>;
    }
}

Filter.propTypes = {
    filterValue: PropTypes.string.isRequired,
};
