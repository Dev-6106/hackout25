import axios from "axios";

export async function POST(req) {
  try {
    const body = await req.json();
    const imageUrl = body.imageUrl;

    // Hugging Face inference API
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/nateraw/ai-image-detector",
      { inputs: imageUrl },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`, // Set your HF API Key in env
        },
      }
    );

    return new Response(JSON.stringify({ result: response.data }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
