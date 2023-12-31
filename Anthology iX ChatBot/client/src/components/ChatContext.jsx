import React, { useState, createContext, useRef, useEffect } from "react";


const ChatContext = createContext();

const ChatProvider = ({children}) => {
  const [chatMessages, setChatMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const scrollDown = useRef(null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user')));
    
    }, [location])

  const handleClear = () => {
    setChatMessages([]);
  }

  const handleSubmit = async () => {
    if (!input) return;

    setLoading(true);
    
    let chatLog = [...chatMessages, {type: "user", text: input}]
    setInput("");
    setChatMessages(chatLog)
      
    if(chatMessages.length > 0) {
      scrollDown.current.scrollIntoView({ behavior: "smooth"});
    }
    function getLastThreeInteractions() {
      const parsedMessage = chatLog
        .slice(-6, -1)
        .map((message) => {
          const prefix = message.type === "bot"
            ? `\nTeacher: ${message.text}`
            : `\nStudent: ${message.text}`;
          return prefix;
        })
        .join("");
      return parsedMessage;
    }
        
    const inputToEmbedd = `\nStudent: ${input}`;

    // handle completions
    const response = await fetch("http://localhost:3000/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${import.meta.env.VITE_Api_Key}`
      },
      body: JSON.stringify({
        input: input 
      })
    })
    const data = await response.json()
    if(data?.errorMessage) {
      return alert("There was an error while processing your request.")
    }

    
    if(data.error === 1) {
      setChatMessages([...chatLog])
      alert("There was an error while processing your request.")
    } else {
      setChatMessages([...chatLog, {type: "bot", text: `${data.completionText}`}])
    }

    scrollDown.current.scrollIntoView({ behavior: "smooth" });
    
    setLoading(false);
    
  }

  return (
    <ChatContext.Provider value={{
      input, setInput, loading, setLoading, open, setOpen, scrollDown, handleClear, handleSubmit, chatMessages
    }}>
      {children}
    </ChatContext.Provider>
  );
}

export { ChatContext, ChatProvider };
