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
            <div className="pt-sans bottom-padding zero-radius center-text well custom-well bottom-margin-30">
              <h2>Welcome To Social Hub!</h2>
            </div>
        </ReactCSSTransitionGroup>
    );
  }
})
