import React from 'react';
//import {Button, Modal} from 'react-bootstrap';

export default React.createClass({

    render() {

        //const { } = this.props;

        return (
            <div className="center-text custom-well well bottom-padding-5 post-form-holder">
                <form className="post-form" method="POST" encType="multipart/form-data">
                    <div className="form-group">
                        <div className="row">
                            <div className="col-lg-4 col-xs-12">
                                <input type="text" className="form-control right-margin zero-radius"
                                       placeholder="Write the caption"/>
                                <input type="submit" value="post" name = "submit" className="btn btn-default
                             zero-radius
                             pull-left"/>
                            </div>
                            <div className="col-lg-8 uploader-container">
                                <div className="form-group">
                                    <label>Upload a photo</label>
                                    <input type="file" className="form-control-file" accept="image/*"/>
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