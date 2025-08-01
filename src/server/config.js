require('dotenv').config();

module.exports = {
  llama: {
    apiKey: process.env.GROQ_API_KEY,
    model: process.env.LLAMA_MODEL || 'llama3-70b-8192',
    maxTokens: parseInt(process.env.LLAMA_MAX_TOKENS || '1024'),
    temperature: parseFloat(process.env.LLAMA_TEMPERATURE || '1.0'),
    top_p: parseFloat(process.env.LLAMA_TOP_P || '1.0'),
    stream: false
  },
  mongodb: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/aley'
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'your-secret-key',
    expiresIn: process.env.JWT_EXPIRES_IN || '24h'
  }
}; 