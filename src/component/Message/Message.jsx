import React from 'react';
import './Message.css';

const Message = ({ own, text, imageUrl }) => {
    return (
        <div className={own ? 'message own' : 'message'}>
            <div className="messageTop">
                {imageUrl ? ( // Conditionally render the image if imageUrl is provided
                    <img className='messageImg' src={imageUrl} alt="User " />
                ) : null}
                <p className='messageText'>{text}</p>
            </div>
            <div className="messageBottom">1 hour ago</div>
        </div>
    );
}

export default Message;