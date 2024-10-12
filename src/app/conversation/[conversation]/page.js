'use client';
import React, { useState, useEffect, useRef } from "react";
import { askFromGemini } from "@/blackbox/gemini";  // Make sure this is properly imported

const ConversationPage = ({ params }) => {
    const conversation = params?.conversation;

    const [messages, setMessages] = useState([
        { text: "Hello! How can you elaborate what you want to learn, so that we have a good idea?", isUser: false },
    ]);
    const [userInput, setUserInput] = useState("");
    const messageEndRef = useRef(null);

    // Scroll to the bottom of the chat whenever a new message is added
    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Function to handle user input submission
    const handleSendMessage = async () => {
        if (userInput.trim() === "") return;

        // Add user's message to chat
        const newMessages = [...messages, { text: userInput, isUser: true }];
        setMessages(newMessages);
        setUserInput(""); // Reset input field

        try {
            // Call the Gemini API for AI response
            const aiResponse = await askFromGemini(userInput); // Make sure askFromGemini returns a response
            console.log("AI response:", aiResponse);
            
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: aiResponse, isUser: false },
            ]);
        } catch (error) {
            console.error("Error fetching AI response:", error);
            // Optionally, you can handle the error by showing a fallback message
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: "Sorry, I couldn't fetch a response. Please try again.", isUser: false },
            ]);
        }
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
                <h1 className="text-4xl font-bold">
                    Let's clarify what exactly you want to learn about?
                </h1>
                <h1 className="text-l font-bold text-gray-400 text-right mr-10">
                    {decodeURIComponent(conversation).slice(0, 70)}
                </h1>
                <div className="flex-1 overflow-y-auto bg-gray-800 p-6 rounded-lg shadow-lg space-y-4 hide-scrollbar">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
                        >
                            <div
                                className={`p-3 rounded-lg max-w-m ${message.isUser
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
