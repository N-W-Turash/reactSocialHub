import React from 'react';

export default React.createClass({

    render() {

        const { filterSearch, searchText} = this.props;

        return (
            <div className="center-text">
                <form className="post-form" method="POST" >
                    <div className="form-group">
                        <input type="text" className="form-control right-margin zero-radius filter-search"
                               placeholder="Search" onChange = {(e) => {filterSearch(e)}} value = {searchText}/>
                    </div>
                </form>
            </div>
        );
    }
})