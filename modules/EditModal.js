import React from 'react';
import {Button, Modal} from 'react-bootstrap';

export default React.createClass({

    render() {

        const { editId, onEdit, hide, show, title, body, editTitleHandler, editBodyHandler} = this.props;

        return (
            <Modal show={show} onHide = {hide} key={editId}>
                <Modal.Body>
                    <h4>Edit Post</h4>
                    <div className="center-text custom-well well bottom-padding-5 post-form-holder">
                        <form className="post-form" method="POST" onSubmit={(e) => {onEdit(editId, e)}} >
                            <div className="form-group">
                                <div className="row">
                                    <div className="col-lg-8">
                                        <input type="text" className="form-control right-margin zero-radius"
                                               placeholder="Post Title" value = {title} onChange={editTitleHandler}/>
                                    </div>
                                </div>
                                <div className="row text-container">
                                    <textarea className="form-control zero-radius" rows="3" value = {body} onChange={editBodyHandler}
                                              placeholder="Write Post"></textarea><br/>
                                    <input type="submit" value="Edit" className="btn btn-default zero-radius pull-left" />
                                </div>
                            </div>
                        </form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={hide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
})