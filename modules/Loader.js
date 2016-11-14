import React from 'react';
import FontAwesome from 'react-fontawesome';
export default React.createClass({

    render() {
        return (<div className="pt-sans bottom-padding zero-radius center-text">
                    <FontAwesome
                        className='fa fa-cog'
                        name='cog'
                        size='4x'
                        spin
                        style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                    />
                </div>
        );
    }
})