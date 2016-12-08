import React from 'react';
import {Button, Modal} from 'react-bootstrap';

export default React.createClass({

    render() {

        const { onFormSubmit, userId, idHandler, titleHandler, titleVal, postHandler, postVal} = this.props;

        return (
            <div className="center-text custom-well well bottom-padding-5 post-form-holder">
                <form className="post-form" method="POST" onSubmit={onFormSubmit} >
                    <div className="form-group">
                        <div className="row">
                            <div className="col-lg-4">
                                <input type="number" className="form-control right-margin zero-radius" value = {userId}
                                       placeholder="User Id" onChange={idHandler} />
                            </div>
                            <div className="col-lg-8">
                                <input type="text" className="form-control right-margin zero-radius"
                                       placeholder="Post Title" value= {titleVal}  onChange={titleHandler}/>
                            </div>
                        </div>
                        <div className="row text-container">
                            <textarea className="form-control zero-radius" rows="3"  onChange={postHandler} value= {postVal} placeholder="Write Post"></textarea><br/>
                            <input type="submit" value="post" className="btn btn-default
                             zero-radius
                             pull-left" disabled = {!userId || !titleVal || !postVal}/>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
})