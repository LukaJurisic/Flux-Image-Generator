import express from 'express';
import Replicate from 'replicate';
import dotenv from 'dotenv';

dotenv.config();  // Add this line to ensure .env is loaded

const router = express.Router();

// Initialize Replicate client with token verification
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

// Add a console log to verify the token is loaded (remove in production)
console.log('Replicate API Token present:', !!process.env.REPLICATE_API_TOKEN);

// Example routes
router.get('/', (req, res) => {
  res.send('Hello from the backend server!');
});

// Add more routes here
router.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

router.post('/api/generate-image', async (req, res) => {
  try {
    const { prompt, quality, promptStrength, aspectRatio, imageFormat, safetyCheckDisabled } = req.body;
    
    // Convert aspect ratio string to dimensions
    let width, height;
    if (aspectRatio === '16:9') {
      width = 1024;
      height = 576;
    } else if (aspectRatio === '1:1') {
      width = 1024;
      height = 1024;
    } else if (aspectRatio === '9:16') {
      width = 576;
      height = 1024;
    }

    const modelVersion = "7863d1ba11a1bb115732a12488486eb8bb3d54ae62cff189f1677a31dbcdfd2e"; // Added specific version
    
    // Generate image using Replicate
    const output = await replicate.run(
      `black-forest-labs/flux-dev:${modelVersion}`,
      {
        input: {
          prompt: prompt,
          width: width,
          height: height,
          num_inference_steps: Math.floor(quality) || 28, // Default to 28 if not specified
          guidance_scale: promptStrength ? promptStrength * 20 : 3.5, // Default to 3.5 if not specified
          safety_check: !safetyCheckDisabled,
        }
      }
    );

    // The output is already a URL, so we can just send it back to the client
    res.json({ images: output });

  } catch (error) {
    console.error('Replicate API error:', error);
    res.status(500).json({ error: error.message || 'Failed to generate image' });
  }
});

export default router; 