import React from 'react';
import Loader from './Loader';
import {ROOT} from './config';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default React.createClass({

	getInitialState(){
        return {
            photo: [],
            isLoaded: false
        };
    },

    componentDidMount() {

        const that = this;
        that.setState({isLoaded: true});
        $.ajax({
            url: ROOT + '/photos/'+this.props.params.id,
            method: 'GET'
        }).then(function(result) {
            that.setState({photo: result});
            that.setState({
                isLoaded: false
            });
        });
    },

    render() {

        if(this.state.isLoaded){
            return <Loader />;
        }
        return (
            <ReactCSSTransitionGroup
                transitionName="react-anime"
                transitionAppear = {true} transitionAppearTimeout = {5000}
                transitionEnter = {false} transitionLeave = {false}
            >
                <div className="pt-sans bottom-padding zero-radius well custom-well custom-well-post center-text left-right-margin-hack bottom-margin-30">
                    <p><b>Title :</b> {this.state.photo.title}</p>
                    <img src={this.state.photo.imageUrl} alt="..." className="res-img"/>
                </div>
            </ReactCSSTransitionGroup>
        );
    }
})