import React from 'react';
import Loader from './Loader';
import {ROOT} from './config';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


export default React.createClass({

    getInitialState(){
        //console.log('x');
        return {
            user: [],
            isLoaded: false
        };
    },

    componentDidMount() {

        const that = this;
        that.setState({isLoaded: true});
        $.ajax({
            url: ROOT + '/users/'+this.props.params.id,
            method: 'GET'
        }).then(function(result) {
            that.setState({user: result});
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
                    <p><b>ID: </b> {this.props.params._id}</p>
                    <p><b>Name: </b> {this.state.user.name}</p>
                    <p><b>Username: </b> {this.state.user.username}</p>
                    <p><b>Email: </b> {this.state.user.email}</p>
                    <p><b>Phone: </b> {this.state.user.phone}</p>
                    <p><b>Company: </b> {this.state.user.company_name}</p>
                </div>
            </ReactCSSTransitionGroup>
        );
    }
})