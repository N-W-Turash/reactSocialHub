import React from 'react';
import NavLink from './NavLink';
import Loader from './Loader';
import {ROOT} from './config';
import DeleteModal from './DeleteModal';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default React.createClass({

  getInitialState(){
    return {
        photos: [],
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
        url: `${ROOT}/photos/?limit=${this.state.limit}&page=${this.state.page+1}`,
        method: 'GET'
    }).then(function(result) {
        that.setState({
            photos: that.state.photos.concat(result.docs),
            isLoaded: false,
            limit: result.limit,
            page: result.page,
            pages: result.pages
        });
    });
  },

  deletePost(id, e){
    e.preventDefault();
    console.log('deleted');
    const that = this;
    $.ajax({
        url: `${ROOT}/photos/${id}`,
        method: 'DELETE'
    }).then(function(result) {
        let index = that.state.photos.map(photo => photo._id).indexOf(id);
        if(index > -1){
            const {photos} = that.state;
            photos.splice(index, 1);
            that.setState({
                photos: photos,
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
                  this.state.photos.map(function (singlePhoto) {
                      return (
                        <div className="col-lg-3 col-sm-6 col-md-4">
                          <div className="thumbnail zero-radius thumb-img bottom-margin-30">
                            <div className="btn-group pull-right photo-btn-group">
                              <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                  <span className="caret" />
                              </button>
                              <ul className="dropdown-menu">
                                  <li><a href="" onClick={this.open.bind(this, singlePhoto._id)
                                  }>Delete Photo</a></li>
                              </ul>
                            </div>
                            <NavLink to={"/photos/"+singlePhoto._id} ><img src={singlePhoto.imageUrl} alt="..." /></NavLink>
                            <div className="caption center-text">
                              <h4>{singlePhoto.title.substr(0,20)+"..."}</h4>
                            </div>
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
                    <button className="btn btn-success view-more" onClick={this.handleViewMore}>View More</button>
                </div> ): undefined}
        </ReactCSSTransitionGroup>
    );
  }
})
