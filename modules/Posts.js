import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import TimeAgo from 'react-timeago';
import NavLink from './NavLink';
import Loader from './Loader';
import {ROOT} from './config';
import DeleteModal from './DeleteModal';
import EditModal from './EditModal';
import  CreatePost from './CreatePost';

export default React.createClass({

    getInitialState(){
        return {
            info: [],
            isLoaded: false,
            limit:20,
            page:0,
            showModal: false,
            deleteId: null,
            user_id:null,
            title:'',
            body:'',
            showEditModal: false,
            editId: null,
            editTitle: '',
            editBody: ''
        };
    },

    /*modal staffs*/

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

    closeEditModal() {
        this.setState({ showEditModal: false });
    },

    openEditModal(info, e) {
        e.preventDefault();
        this.setState({
            showEditModal: true,
            editId: info._id,
            editTitle: info.title,
            editBody: info.body
        });
        //console.log(info);
    },

    /*end of modal staffs*/

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

    /* edit post staffs */

    editPost(id, event){

        event.preventDefault();
        const that = this;
        const {info, editTitle, editBody} = that.state;
        const newInfo = {
            editTitle: editTitle,
            editBody: editBody
        }
        console.log(newInfo);

        $.ajax({
            url: `${ROOT}/posts/${id}`,
            method: 'PUT',
            data: newInfo
        }).then(function(result) {
            let index = that.state.info.map(inf => inf._id).indexOf(id);
            if(index > -1){
                /*info = info
                //console.log(info);*/


                info[index].title = editTitle;
                info[index].body = editBody;

                that.setState({
                    info: info,
                    showEditModal: false
                });


                //console.log(index);
            }
        });
    },

    handleEditTitleChange(event) {
        this.setState({editTitle: event.target.value});
        //console.log(this.state.editTitle);
    },

    handleEditBodyChange(event) {
        this.setState({editBody: event.target.value});
        //console.log(this.state.editBody);
    },

    /* end of edit post staffs */

    /* from related staffs */

    formHandler(event){
      event.preventDefault();
      /*console.log('user id: ', this.state.user_id);
      console.log('title: ', this.state.title);
      console.log('post: ', this.state.body);*/

      const that = this;
      const {info, user_id, title, body} = that.state;
      const newInfo = {
        user_id:user_id,
        title: title,
        body: body
      }

        $.ajax({
            url: `${ROOT}/posts/`,
            method: 'POST',
            data:newInfo
          }).then(function(result) {

              info.unshift(result);
              that.setState({
                  info: info,
                  user_id:null,
                  title:'',
                  body: ''
              });

        });
    },

    handleUserIdChange(event) {
        this.setState({user_id: event.target.value});
        //console.log(this.state.user_id);
    },

    handleTitleChange(event) {
        this.setState({title: event.target.value});
        //console.log(this.state.title);
    },

    handlePostChange(event) {
        this.setState({body: event.target.value});
        //console.log(this.state.body);
    },

    /* end of from related staffs */

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
                <CreatePost onFormSubmit={this.formHandler} userId={this.state.user_id} idHandler = {this.handleUserIdChange}
                            titleVal = {this.state.title} titleHandler = {this.handleTitleChange} postVal = {this.state.body}
                            postHandler =
                                {this.handlePostChange}/>
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
                                                <li><a href="" onClick={this.openEditModal.bind(this, singleInfo)
                                                }>Edit Post</a></li>
                                            </ul>
                                        </div>
                                        <p><b>Post ID:</b> {singleInfo._id}</p>
                                        <p className="post-title"><b>Posted At: </b><TimeAgo date= {singleInfo.createdAt}/></p>
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
                    <EditModal show = {this.state.showEditModal} onEdit = {this.editPost} hide = {this.closeEditModal} editId =
                        {this.state.editId} title= {this.state.editTitle} body= {this.state.editBody} editTitleHandler = {this
                        .handleEditTitleChange} editBodyHandler = {this.handleEditBodyChange}/>
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
