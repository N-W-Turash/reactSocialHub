import React from 'react';
import NavLink from './NavLink';
import Loader from './Loader';
import {ROOT} from './config';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default React.createClass({

    getInitialState(){
        return {
            info: [],
            isLoaded: false
        };
    },

    componentDidMount() {
        //const root = 'http://localhost:3000/api';
        const that = this;
        that.setState({isLoaded: true});
        $.ajax({
            url: ROOT + '/posts',
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
                <div className="row">
                    {
                        this.state.info.map(function (singleInfo) {
                            return (
                                <div key={singleInfo.id}>
                                    <div className="pt-sans bottom-padding zero-radius well custom-well custom-well-post left-right-margin-hack">
                                        <p><b>Post ID:</b> {singleInfo._id}</p>
                                        <p className="post-title"><b>Title: </b><NavLink to={"/posts/"+singleInfo._id} className="pt-sans">{singleInfo.title}</NavLink></p>
                                        <p><b>Post: </b>{singleInfo.body}</p>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </ReactCSSTransitionGroup>
        );
    }
})
