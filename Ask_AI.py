import os
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from groq import Groq
from typing import Optional
from fastapi.middleware.cors import CORSMiddleware

# Load environment variables
load_dotenv()

app = FastAPI(
    title="LLAMA API",
    description="API for interacting with LLAMA model",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=eval(os.getenv("ALLOW_ORIGINS", '["*"]')),  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

API_KEY = os.getenv("GROQ_API_KEY")
if not API_KEY:
    raise ValueError("GROQ_API_KEY environment variable is required")

client = Groq(api_key=API_KEY)

class ChatRequest(BaseModel):
    message: str
    temperature: Optional[float] = float(os.getenv("DEFAULT_TEMPERATURE", 1.0))
    max_tokens: Optional[int] = int(os.getenv("DEFAULT_MAX_TOKENS", 1024))
    top_p: Optional[float] = float(os.getenv("DEFAULT_TOP_P", 1.0))
    stream: Optional[bool] = os.getenv("DEFAULT_STREAM", "false").lower() == "true"

class ChatResponse(BaseModel):
    response: str

@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    try:
        completion = client.chat.completions.create(
            model=os.getenv("DEFAULT_MODEL", "llama3-70b-8192"),
            messages=[
                {"role": "user", "content": request.message}
            ],
            temperature=request.temperature,
            max_tokens=request.max_tokens,
            top_p=request.top_p,
            stream=request.stream
        )

        if request.stream:
            response_text = ""
            for chunk in completion:
                response_text += chunk.choices[0].delta.content or ""
            return ChatResponse(response=response_text)
        else:
            return ChatResponse(response=completion.choices[0].message.content)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        app, 
        host=os.getenv("HOST", "0.0.0.0"), 
        port=int(os.getenv("PORT", 8000))
    ) 