require('dotenv').config()
const fs = require("fs")
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const { Client } = require('pg')
const { Configuration, OpenAIApi } = require("openai")

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express()
const port = 3000

app.use(bodyParser.json())

app.use(cors());

//Db Configuration
const client  = new Client ({
  user:"admin",
  host:"localhost",
  database:"hackelitedb",
  password:"admin",
  port: 5432
});

app.post("/completions", async (req, res) => {
  const token = req?.headers?.authorization.split(' ')[1];

  if (!token || token !== process.env.API_KEY ) {
    throw Error;
  } else {
    try {
      const {input} = req.body
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt:`### MS SQL Server SQL tables with their properties:\n
          #\n # campaigns(id, name, subject, created_by, created_on, sent_date, last_modified, sent_address,category)\n
          #\n # recipients(id, first_name, last_name, email, date_of_birth, city, campaign_id, date_added, date_opened, date_modified)\n
          #\n ### A SQL server query to answer:${input}\nSELECT
          #\n ### Don't justify your answers. Don't give information not mentioned in the CONTEXT INFORMATION.`,
        temperature: 0,
        max_tokens: 150,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        stop: ['#',';'],
      });

      client.connect((err) => {
        if (err) throw err;
        console.log('Connected to db');
      });

      const pgQuery = "SELECT" + response.data.choices[0].text;

      client.query(pgQuery, (err, result) => {
        if(err) {
          console.error(err);
          res.json({
            error: err,
            errorMessage: err.errorMessage
        })
        }
        res.json({
          completionText: JSON.stringify(result.rows),
          status: "success"
        })
      });

      client.end();


    } catch (error) {
      console.log(error);
        let e;
        if(error?.response?.status === 400) {
            e = 1;
        } else {
            e = 0;
        }
        res.json({
            error: e,
            errorMessage: error
        })
    }
  }
});

app.listen(port, () => {
    console.log(`Server has started`)
});
