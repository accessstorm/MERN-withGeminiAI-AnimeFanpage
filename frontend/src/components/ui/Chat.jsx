import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './Chat.css';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const chatContainerRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
      if (chatContainerRef.current) {
          chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      }
    }, [messages]);

    const handleInputChange = (e) => {
        setNewMessage(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        const userMessage = { text: newMessage, sender: 'user' };
        setMessages((prevMessages) => [...prevMessages, userMessage]);
        setNewMessage('');
        setIsLoading(true);

        try {
            const response = await axios.post('http://localhost:5000/gemini', {
                prompt: newMessage,
            });
            console.log(response);
            if (response && response.data)
            {
                const aiMessage = { text: response.data.response, sender: 'ai' };
                setMessages((prevMessages) => [...prevMessages, aiMessage]);
            }
            else{
                const errorMessage = { text: "Sorry, something went wrong.", sender: 'ai' };
                setMessages((prevMessages) => [...prevMessages, errorMessage]);
            }

        } catch (error) {
            console.error('Error sending message to backend:', error);
            if (error.response && error.response.data) {
                console.error(error.response.data);
             }
             if(error.response && error.response.status){
                console.error(error.response.status);
              }
            const errorMessage = { text: "Sorry, something went wrong.", sender: 'ai' };
            setMessages((prevMessages) => [...prevMessages, errorMessage]);
        } finally{
            setIsLoading(false)
        }
    };
    
    

    return (
        <div className="chat-container">
            <div className="chat-history" ref={chatContainerRef}>
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`message ${message.sender === 'user' ? 'user-message' : 'ai-message'}`}
                    >
                        {message.text}
                    </div>
                ))}
              {isLoading && <div className='loading'>...</div> }
            </div>
            <form className="input-area" onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={newMessage}
                    onChange={handleInputChange}
                    placeholder="Type your message..."
                    className="message-input"
                    disabled = {isLoading}
                />
                <button type="submit" className="send-button" disabled={isLoading}>
                    Send
                </button>
            </form>
        </div>
    );
};

export default Chat;