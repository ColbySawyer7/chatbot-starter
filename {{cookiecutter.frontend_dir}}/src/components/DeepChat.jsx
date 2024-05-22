import { DeepChat } from 'deep-chat-react';
import myAvatar from '../assets/crag.png';

const botName="Crag";

// submitStyle [width, height]
const submitStyle = ['50px', '50%']


export default function CragChat() {
    const initialMessages = [
        { role: 'ai', text: `Hello, Im ${botName}! How can I help?` },
        /*{
            "text": "```java\nwhile (i < 5) {\n console.log(\"hi\");\n i+= 1;\n}\n```",
            "role": "ai"
        }*/
        ];
    
    return (
        
      <div className="chat-container shadow-2xl">
        <DeepChat
                request={{
                    url: "http://localhost:8080/crag/stream",
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                    },
                    additionalBodyProps: {
                    "input": "value",
                    "config": {},
                    "kwargs": {}
                    },
                }}
                requestInterceptor={(request) => {
                    request.body = {"input": request.body.messages[0].text, "config": {}, "kwargs": {}}
                    return request
                }}
                responseInterceptor={(response) => {
                    // Log the original response for debugging
                    console.log(response);
                    // Check if the response is a string and return it directly
                    if (typeof response === 'string') {
                        return { text: response };
                    }
                    // Check if the response is an object (but not null) and does not have a 'text' property
                    else if (typeof response === 'object' && response !== null && !response.hasOwnProperty('text')) {
                        // Return nothing for JSON objects without a 'text' property
                        return { text: "" };
                    }
                    // Handle JSON objects with a 'text' property
                    else if (typeof response === 'object' && response.hasOwnProperty('text')) {
                        return { text: response.text };
                    }
                    // Fallback for any other types of responses
                    return { text: "An unexpected response was received." };
                }}
                //demo={true}
                stream={true}
                avatars={{
                    ai: { 
                        src: myAvatar, 
                        styles:{
                            avatar:{
                                width: '100%', height: '42px'} 
                        }
                    },
                    user: { 
                        styles:{
                            avatar:{
                                // TODO: Make user avatar rounded to match style
                                width: '42px', height: '42px',} 
                        }
                    },
                }}
                messageStyles={{
                    default: { 
                        user: { bubble: { backgroundColor: "var(--primary)", color: "var(--secondary)", border:'3px solid var(--secondary)', borderRadius: '10px', fontSize: "1.2rem" } },
                        ai: { bubble: { backgroundColor: "var(--secondary)", color: "var(--primary)", border:'3px solid var(--primary)', borderRadius: '10px', fontSize: "1.2rem" } },
                     }
                }}
                submitButtonStyles={{
                    submit: {
                      container: {
                        styles: { width: "100px", height: "100px"},
                        default: { backgroundColor: "var(--primary-text)", width: submitStyle[0], height: submitStyle[1], marginRight: "10px"},
                        hover: { backgroundColor: "var(--secondary)", width: submitStyle[0], height: submitStyle[1]},
                        click: {backgroundColor: "var(--secondary)", width: submitStyle[0], height: submitStyle[1]}
                      },
                      svg: {
                        styles: {
                          default: {
                            filter: "var(--primary)"
                          }
                        }
                      }
                    },
                    alwaysEnabled: true,
                    position: "outside-right"
                  }}
                textInput={{
                    styles: {
                        text: {
                            color: "rgba(83, 56, 158, 0.75)", // Set the text color
                            fontSize: "1.2rem"
                        },
                        container: {
                            border: "1px solid var(--primary)",
                            backgroundColor: "#fffcfc",
                            width: "80%",
                            height: "80%",
                            borderRadius: "8px",
                            boxSizing: 'border-box',
                        },
                        focus: {
                            border: "2px solid var(--primary)" // Style for when the input is focused
                        }
                    },
                    placeholder: { text: "Insert your question here..." }
                }}
                auxiliaryStyle={`
                    ::-webkit-scrollbar-thumb {
                        background-color: var(--primary);
                    }
                `}
                initialMessages={initialMessages}
                style={{ borderRadius: '8px', border: "none", backgroundColor: 'var(--shaded-bg)', width: '100%', height: '100%' }} // Adjust the style as needed
            />
          </div>
    );
  }