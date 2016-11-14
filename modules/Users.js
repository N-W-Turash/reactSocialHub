import React from 'react';
import NavLink from './NavLink';
import Loader from './Loader';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default React.createClass({

    getInitialState(){

        return {
            users: [],
            isLoaded: false
        };
    },

    componentDidMount() {
        const root = 'https://jsonplaceholder.typicode.com';
        const that = this;
        that.setState({isLoaded: true});
        $.ajax({
           url: root + '/users',
           method: 'GET'
        }).then(function(result) {
            that.setState({users: result});
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
                <div>
                    {
                        this.state.users.map(function (singleUser) {
                          return (
                                <div className="col-lg-4 col-sm-6 col-md-4">
                                    <div className="pt-sans bottom-padding zero-radius well custom-well custom-well-post left-right-margin-hack bottom-margin-30">
                                        <p><b>Name: </b> {singleUser.name}</p>
                                        <p><b>Username: </b> {singleUser.username}</p>
                                        <p><b>Email: </b> {singleUser.email}</p>
                                        <p className="post-title"><NavLink to={"/users/"+singleUser.id} className="pt-sans">See More</NavLink></p>
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
