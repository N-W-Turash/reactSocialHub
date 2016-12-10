import React from 'react';
import {Button, Modal} from 'react-bootstrap';

export default React.createClass({

    render() {

        const { sortVal, onPostSort} = this.props;

        return (
            <div className="row select-container">
                <label>
                    Sort By:
                    <select id="select" value= {sortVal} onChange={onPostSort} className="zero-radius">
                        <option value="Most Recent">Most Recent</option>
                        <option value="From The Beginning">From The Beginning</option>
                    </select>
                </label>
            </div>
        );
    }
})