const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const API_PORT = process.env.PORT || 8080;
const app = express();
const API_KEY = "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";

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/completion", async (req, res) => {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: req.body.msg,
          },
        ],
      }),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    const data = await response.data;
    res.status(200).send(data);
  } catch (err) {
    console.log(err);
    res.status(409).send({ message: "Error occured while fetching from API" });
  }
});

app.listen(API_PORT, () => {
  console.log(`listening on ${API_PORT}`);
});
