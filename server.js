import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import OpenAI from 'openai';

const app = express();
app.use(cors());
app.use(express.json());

// Check if API key is loaded
if (!process.env.OPENAI_API_KEY) {
  console.error('ERROR: OPENAI_API_KEY is not set in environment variables');
  process.exit(1);
}

console.log('API Key loaded successfully (first 10 chars):', process.env.OPENAI_API_KEY.substring(0, 10) + '...');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/generate-image', async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      size: "1024x1024",
    });

    res.json({
      imageUrl: response.data[0].url
    });

  } catch (error) {
    console.error('OpenAI API Error:', error);
    console.error('Error details:', error.message);
    console.error('Error stack:', error.stack);
    
    let errorMessage = "Image generation failed";
    if (error.message.includes('billing_hard_limit_reached')) {
      errorMessage = "OpenAI billing limit reached. Please add credits to your OpenAI account at platform.openai.com";
    } else if (error.message.includes('insufficient_quota')) {
      errorMessage = "Insufficient OpenAI API quota. Please check your account and add credits.";
    } else if (error.message.includes('invalid_api_key')) {
      errorMessage = "Invalid OpenAI API key. Please check your .env file.";
    }
    
    res.status(500).json({ error: errorMessage, details: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
