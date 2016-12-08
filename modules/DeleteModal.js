import React from 'react';
import {Button, Modal} from 'react-bootstrap';

export default React.createClass({

    render() {

        const { deleteId, onDelete, hide, show} = this.props;

        return (
            <Modal show={show} onHide = {hide} key={deleteId}>
                <Modal.Body>
                    <h4>Are you sure to delete this post?</h4>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={(e) => {onDelete(deleteId, e)}}>Delete</Button>
                    <Button onClick={hide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
})