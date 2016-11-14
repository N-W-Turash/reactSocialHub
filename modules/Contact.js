import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default React.createClass({
    render() {
        return (
            <ReactCSSTransitionGroup
                transitionName="react-anime"
                transitionAppear = {true} transitionAppearTimeout = {5000}
                transitionEnter = {false} transitionLeave = {false}
            >
                <div className="center-text custom-well well bottom-padding-5">
                    <form className="form-inline">
                        <div className="form-group">
                            <label htmlFor="exampleInputName2" className="right-margin">Name</label>
                            <input type="text" className="form-control right-margin zero-radius" id="exampleInputName2" placeholder="Jane Doe" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail2" className="right-margin">Email</label>
                            <input type="email" className="form-control right-margin zero-radius" id="exampleInputEmail2" placeholder="jane.doe@example.com" />
                        </div>
                        <button type="submit" className="btn btn-default zero-radius">Send</button>
                    </form>
                </div>
            </ReactCSSTransitionGroup>
        );
    }
})
