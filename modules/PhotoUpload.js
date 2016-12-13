import React from 'react';
//import {Button, Modal} from 'react-bootstrap';

export default React.createClass({

    getInitialState(){
        return{
            title: '',
            file: null
        }
    },

    handleTitleChange(event) {
        this.setState({title: event.target.value});
    },

    handleFileChange(event) {
        this.setState({file: event.target.value});
    },

    uploadFile(e){

        e.preventDefault();
        let  {postPhoto} = this.props;
        var data = new FormData();
        data.append('file', this.refs.file.files[0]);
        data.append('title', this.refs.text.value);

        var that = this;

        $.ajax({
            url: 'http://localhost:3000/api/upload',
            data: data,
            processData: false,
            contentType: false,
            type: 'POST',
            success: function(data){
                console.log(data);
            }
        }).then(function(result) {
            postPhoto(result);

        });

    },

    render() {

        return (
            <div className="center-text custom-well well bottom-padding-5 post-form-holder zero-radius">
                <form ref="uploadForm" className="post-form" method="POST" encType="multipart/form-data" onSubmit={this.uploadFile}>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-lg-4 col-xs-12">
                                <input ref= "text" type="text" className="form-control right-margin zero-radius"
                                       placeholder="Write the caption" name = "title" onChange={this.handleTitleChange}/>
                                <input type="submit" value="post" name = "submit" className="btn btn-default
                             zero-radius
                             pull-left" disabled = {!this.state.title || !this.state.file} />
                            </div>
                            <div className="col-lg-8 uploader-container">
                                <div className="form-group">
                                    <label>Upload a photo</label>
                                    <input ref="file" type="file" className="form-control-file" name = "file" accept="image/*"
                                           onChange={this.handleFileChange}/>
                                    <small className="form-text text-muted">Upload the photo you want to upload.</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
})