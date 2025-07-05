import React from 'react';
import './Conversation.css';

const Conversation = ({ conversation, onClick }) => {
    return (
        <div className="conversation" onClick={onClick}> {/* Add onClick handler */}
            {conversation.imageUrl ? (
                <img src={conversation.imageUrl} alt={conversation.name} className='conversationImage' />
            ) : null}
            <span className='conversationName'>{conversation.name}</span>
        </div>
    );
}

export default Conversation;