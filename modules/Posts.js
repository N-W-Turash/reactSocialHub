import React from 'react';
import NavLink from './NavLink';
import Loader from './Loader';
import {ROOT} from './config';
import DeleteModal from './DeleteModal';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default React.createClass({

    getInitialState(){
        return {
            info: [],
            isLoaded: false,
            limit:20,
            page:0,
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
            url: `${ROOT}/posts/?limit=${this.state.limit}&page=${this.state.page+1}`,
            method: 'GET'
        }).then((result) =>
            that.setState({
                info: that.state.info.concat(result.docs),
                isLoaded: false,
                limit: result.limit,
                page: result.page,
                pages: result.pages
            })
        );
    },

    deletePost(id){

        //console.log('deleted');
        const that = this;
        $.ajax({
            url: `${ROOT}/posts/${id}`,
            method: 'DELETE'
        }).then(function(result) {
            let index = that.state.info.map(inf => inf._id).indexOf(id);
            if(index > -1){
                const {info} = that.state;
                info.splice(index, 1);
                that.setState({
                    info: info,
                    showModal: false
                });
            }
        });
    },

    //this.deletePost.bind(this, singleInfo._id)

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
                <div className="row">
                    {
                        this.state.info.map(function (singleInfo) {
                            return (
                                <div key={singleInfo._id}>
                                    <div className="pt-sans bottom-padding zero-radius well custom-well custom-well-post
                                     left-right-margin-hack">
                                        <div className="btn-group pull-right">
                                            <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown"
                                                    aria-haspopup="true" aria-expanded="false">
                                                <span className="caret" />
                                            </button>
                                            <ul className="dropdown-menu">
                                                <li><a href="" onClick={this.open.bind(this, singleInfo._id)
                                                }>Delete Post</a></li>
                                                <li><a href="">Edit Post</a></li>
                                            </ul>
                                        </div>
                                        <p><b>Post ID:</b> {singleInfo._id}</p>
                                        <p className="post-title"><b>Title: </b><NavLink to={"/posts/"+singleInfo._id}
                                                                                         className="pt-sans">{singleInfo
                                            .title}</NavLink></p>
                                        <p><b>Post: </b>{singleInfo.body}</p>
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
                    <div className="center-text">
                        <button className="btn btn-success view-more" onClick={this.handleViewMore}>View More</button>
                    </div> ): undefined}

            </ReactCSSTransitionGroup>
        );
    }
})
