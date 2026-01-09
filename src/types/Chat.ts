 export interface ChatMessage {
    role: string
    content: string
 }
export interface ChatRequest {
    messages: ChatMessage[]
    run_id: string
}