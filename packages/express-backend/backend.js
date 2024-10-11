// backend.js
import express from "express";
import cors from "cors";
const app = express();
const port = 8000;
const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor"
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

const findUserByName = (name) => {
  return users["users_list"].filter(
    (user) => user["name"] === name
  );
};

const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

const addUser = (user) => {
  user.id = createRandomString(6)
  users["users_list"].push(user);
  return user;
};

function createRandomString(length) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

const removeUser = (id) =>
  users["users_list"] = users["users_list"].filter(
    user => user.id !== id
    );


app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

app.get("/users", (req, res) => {
  const name = req.query.name;
  if (name != undefined) {
    let result = findUserByName(name);
    result = { users_list: result };
    res.send(result);
  } else {
    res.send(users);
  }
});

app.use(cors());

app.use(express.json());

//Sets up end Point to accept the get function
app.get("/", (req, res) => {
  res.send("Hello World!");
});

//returns the list of all the users
app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;
  let filteredUsers = users["users_list"];

  if(name && job){
    filteredUsers = filteredUsers.filter(user => user.name == name && user.job == job);
    
  }else if(name) {
    filteredUsers = filteredUsers.filter.filter(user => user.name == name);
  }
  res.send({user_list: filteredUsers});
});


app.post("/users", (req, res) => {
  const userToAdd = req.body;
  const addedUser = addUser(userToAdd);
  res.status(201).send({ message: "User created successfully", user: addedUser });
});

app.delete("/users/:id", (req, res) => {
  const userId= req.params.id;
  removeUser(userId);
  res.send();

});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});

