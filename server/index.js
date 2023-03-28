import express from 'express';
import cors from 'cors';
import { Configuration, OpenAIApi } from 'openai';

const app = express();
app.use(cors());
app.use(express.json());

const config = new Configuration({
  apiKey: "your-api-key"
});

const api = new OpenAIApi(config);

app.post('/', async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const response = await api.createCompletion({
      model: "text-davinci-003",
      prompt: `${prompt}`,
      temperature: 0,
      max_tokens: 500,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0
    });

    res.send({
      bot: response.data.choices[0].text
    });
  }
  catch (error) {
    console.log(error);
    res.status(500).send({error});
  }
});

app.listen(5000, () => console.log("Server started [http://localhost:5000]"));