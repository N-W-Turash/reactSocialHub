import React from 'react';
import NavLink from './NavLink';
import Loader from './Loader';
import {ROOT} from './config';
import DeleteModal from './DeleteModal';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default React.createClass({

    getInitialState(){

        return {
            users: [],
            isLoaded: false,
            limit: 20,
            page: 0,
            showModal: false,
            deleteId: null
        };
    },

    close() {
        this.setState({ showModal: false });
    },

    open(id, e) {
        e.preventDefault();
        this.setState({
            showModal: true,
            deleteId: id
        });
    },

    loadPosts(){
        const that = this;
        that.setState({isLoaded: true});
        $.ajax({
            url: `${ROOT}/users/?limit=${this.state.limit}&page=${this.state.page+1}`,
            method: 'GET'
        }).then((result) =>
            that.setState({
                users: that.state.users.concat(result.docs),
                isLoaded: false,
                limit: result.limit,
                page: result.page,
                pages: result.pages
            })
        );
    },

    deletePost(id, e){
        e.preventDefault();
        console.log('deleted');
        const that = this;
        $.ajax({
            url: `${ROOT}/users/${id}`,
            method: 'DELETE'
        }).then(function(result) {
            let index = that.state.users.map(inf => inf._id).indexOf(id);
            if(index > -1){
                const {users} = that.state;
                users.splice(index, 1);
                that.setState({
                    users: users,
                    showModal: false
                });
            }
        });
    },

    componentDidMount() {
        this.loadPosts();
    },

    handleViewMore(){
        this.loadPosts();
    },

    render() {

        return (

            <ReactCSSTransitionGroup
                transitionName="react-anime"
                transitionAppear = {true} transitionAppearTimeout = {5000}
                transitionEnter = {false} transitionLeave = {false}
            >
                <div className="user-container row">
                    {
                        this.state.users.map(function (singleUser) {
                          return (
                                <div className="col-lg-4 col-sm-6 col-md-4">
                                    <div className="pt-sans bottom-padding zero-radius well custom-well custom-well-post left-right-margin-hack bottom-margin-30">
                                        <div className="btn-group pull-right">
                                            <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <span className="caret" />
                                            </button>
                                            <ul className="dropdown-menu">
                                                <li><a href="" onClick={this.open.bind(this, singleUser._id)
                                                }>Delete User</a></li>
                                            </ul>
                                        </div>
                                        <p><b>Name: </b> {singleUser.name}</p>
                                        <p><b>Username: </b> {singleUser.username}</p>
                                        <p><b>Email: </b> {singleUser.email}</p>
                                        <p className="post-title"><NavLink to={"/users/"+singleUser._id} className="pt-sans">See More</NavLink></p>
                                    </div>
                                </div>
                            );
                        }.bind(this))
                    }
                    <DeleteModal show={this.state.showModal} onDelete={this.deletePost} hide={this.close} deleteId={this.state
                        .deleteId} />
                </div>
                {this.state.isLoaded ? <Loader /> : undefined}
                {this.state.page < this.state.pages? (
                    <div className="center-text row">
                        <div className="col-md-12">
                            <button className="btn btn-success view-more" onClick={this.handleViewMore}>View More</button>
                        </div>
                    </div> ): undefined}
            </ReactCSSTransitionGroup>
        );
    }
})
