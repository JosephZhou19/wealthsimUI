import { useState } from "react"
import { apiFetch } from "../api/client"
import type { ChatMessage, ChatRequest } from "../types/Chat";
import { sendChatRequest } from "../api/simulationApi";
import ReactMarkdown from "react-markdown";


export default function AiChat({ simulationId}: { simulationId: string;}) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState("")

  async function handleSend(e?: React.FormEvent) {
    if (e) {
        e.preventDefault()
    }
    if (!input.trim()) return
    const newMessage : ChatMessage = {
        role: "user",
        content: input
    }
    var newMessages = [...messages, newMessage]
    setMessages(newMessages)
    setInput("")
    const req : ChatRequest = {
        messages: newMessages,
        run_id: simulationId
    }
    console.log("Run id for run: " + simulationId)
    const response = await sendChatRequest(req)
    const newReply: ChatMessage = {
        role: "assistant", 
        content: response
    }
    setMessages([...newMessages, newReply])
  }

  return (
    <div className="flex flex-col h-full max-h-[600px] bg-base-100 rounded p-4 overflow-auto">
        <div className="flex-1 space-y-2 overflow-y-auto">
            {messages.map((m, i) => (
                <div key={i} className={m.role === "user" ? "text-right" : "text-left"}>
                    <span className={`inline-block p-2 rounded ${m.role === "user" ? "bg-blue-400 text-white" : "bg-gray-200"}`}>
                        <ReactMarkdown>
                            {m.content}
                        </ReactMarkdown>
                    </span>
                </div>
                ))}
        </div>
        <form onSubmit={handleSend} className="flex mt-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="input input-bordered flex-1 mr-2"
                    placeholder="Ask about your simulation..."
                />
                <button onClick={handleSend} className="btn btn-primary">Send</button>
        </form>
    </div>
  )
}
