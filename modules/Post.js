import React from 'react';
import TimeAgo from 'react-timeago';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Loader from './Loader';
import {ROOT} from './config';

export default React.createClass({

    getInitialState(){
        //console.log('x');
        return {
            info: [],
            isLoaded: false
        };
    },

    componentDidMount() {

        const that = this;
        that.setState({isLoaded: true});
        $.ajax({
            url: ROOT + '/posts/'+this.props.params.id,
            method: 'GET'
        }).then(function(result) {
            that.setState({info: result});
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
                <div className="pt-sans bottom-padding zero-radius well custom-well custom-well-post left-right-margin-hack bottom-margin-30">
                    <p><b>User ID:</b> {this.state.info.user_id}</p>
                    <p className="post-title pt-sans"><b>Title: </b>{this.state.info.title}</p>
                    <p className="post-title"><b>Posted At: </b>{this.state.info.createdAt ? <TimeAgo date= {this.state.info.createdAt}/>: undefined}</p>
                    <p className="post-title pt-sans"><b>Post Id : </b>{this.props.params.id}</p>
                    <p className="post-text"><b>Post: </b>{this.state.info.body}</p>
                </div>
            </ReactCSSTransitionGroup>
        );
    }
})