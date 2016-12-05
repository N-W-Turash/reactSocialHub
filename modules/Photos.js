import React from 'react';
import NavLink from './NavLink';
import Loader from './Loader';
import {ROOT} from './config';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


export default React.createClass({

  getInitialState(){

    return {
        photos: [],
        isLoaded: false
    };
  },

  componentDidMount() {

    const that = this;
    that.setState({isLoaded: true});
    $.ajax({
        url: ROOT + '/photos',
        method: 'GET'
    }).then(function(result) {
        that.setState({
            photos: result
        });
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
                  this.state.photos.map(function (singlePhoto) {
                      return (
                        <div className="col-lg-3 col-sm-6 col-md-4">
                          <div className="thumbnail zero-radius thumb-img bottom-margin-30">
                            <NavLink to={"/photos/"+singlePhoto._id} ><img src={singlePhoto.imageUrl} alt="..." /></NavLink>
                            <div className="caption center-text">
                              <h4>{singlePhoto.title.substr(0,20)+"..."}</h4>
                            </div>
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
