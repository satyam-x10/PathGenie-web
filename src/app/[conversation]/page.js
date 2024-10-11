'use client';
import React, { useState, useEffect, useRef } from "react";

const ConversationPage = ({ params }) => {
    const conversation = params?.conversation;

    const [messages, setMessages] = useState([
        { text: "Hello! How can I assist you today?", isUser: false },
    ]);
    const [userInput, setUserInput] = useState("");
    const messageEndRef = useRef(null);

    // Scroll to the bottom of the chat whenever a new message is added
    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Function to handle user input submission
    const handleSendMessage = () => {
        if (userInput.trim() === "") return;

        // Add user's message to chat
        const newMessages = [...messages, { text: userInput, isUser: true }];
        setMessages(newMessages);
        setUserInput(""); // Reset input field

        // Mock AI response after a delay
        setTimeout(() => {
            const aiResponse = generateMockResponse();
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: aiResponse, isUser: false },
            ]);
        }, 1000);
    };

    // Function to mock AI response
    const generateMockResponse = () => {
        const mockResponses = [
            "I'm here to help you!",
            "That sounds interesting.",
            "Let's dive deeper into that.",
            "Can you clarify that for me?",
        ];
        return mockResponses[Math.floor(Math.random() * mockResponses.length)];
    };

    // Handle 'Enter' key press to send message
    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSendMessage();
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen w-full bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white">
            {/* Chat container */}
            <div className="w-full h-full flex flex-col p-4 space-y-4">
                <h1 className="text-4xl font-bold mb-4">
                    {decodeURIComponent(conversation).slice(0, 70)}
                </h1>        <div className="flex-1 overflow-y-auto bg-gray-800 p-6 rounded-lg shadow-lg space-y-4 hide-scrollbar">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`flex ${message.isUser ? "justify-end" : "justify-start"
                                }`}
                        >
                            <div
                                className={`p-3 rounded-lg max-w-xs ${message.isUser
                                        ? "bg-cyan-500 text-white"
                                        : "bg-gray-700 text-gray-200"
                                    }`}
                            >
                                {message.text}
                            </div>
                        </div>
                    ))}
                    <div ref={messageEndRef} />
                </div>

                {/* Input section */}
                <div className="flex items-center w-full">
                    <input
                        type="text"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        onKeyPress={handleKeyPress} // Capture Enter key press
                        placeholder="Type your message..."
                        className="flex-1 py-3 px-4 rounded-full bg-gray-800 text-white text-lg focus:outline-none focus:ring-4 focus:ring-cyan-400 placeholder-gray-500"
                    />
                    <button
                        onClick={handleSendMessage}
                        className="ml-4 p-3 bg-cyan-500 rounded-full shadow-lg hover:bg-cyan-400"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            className="w-6 h-6 text-white"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 10.5l-6.5-6.5m0 0l-6.5 6.5M14.5 4v16m0-16v0"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConversationPage;
