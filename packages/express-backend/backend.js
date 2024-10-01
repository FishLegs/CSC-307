// backend.js
import express from "express";

const app = express();
const port = 8000;
const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Fisher",
      job: "CEO"
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer"
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor"
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress"
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender"
    }
  ]
};

app.use(express.json());

//Sets up end Point to accept the get function
app.get("/", (req, res) => {
  res.send("Hello World!");
});

//returns the list of all the users
app.get("/users", (req, res) => {
  res.send(users);
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});

