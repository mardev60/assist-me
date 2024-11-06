import axios from "axios";

export const sendMessageToAi = async (message: string): Promise<any> => {
    console.log("sendMessageToAi");
    let body = {
        "model": "llama3-8b-8192",
        "messages": [{
            "role": "user",
            "content": message
        }]
    };
    const response = await axios.post("https://api.groq.com/openai/v1/chat/completions", body, {headers: { 'Content-Type': 'application/json', 'Authorization' : 'Bearer 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' }});
    return response.data;
};