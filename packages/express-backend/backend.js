// backend.js
import userService from './user-services.js';
import express from "express";

const app = express();
const port = 8000;

  

// const findUserByName = (name) => {
//   return users["users_list"].filter(
//     (user) => user["name"] === name
//   );
// };

// const findUserById = (id) =>
//   users["users_list"].find((user) => user["id"] === id);

// const addUser = (user) => {
//   users["users_list"].push(user);
//   return user;
// };

// const removeUser = (id) =>
//   users["users_list"] = users["users_list"].filter(
//     user => user.id !== id
//     );


app.get("/users/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const user = await userService.findUserById(id);
    if (!user) {
      res.status(404).send("User not found");
    } else {
      res.send(user);
    }
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
});

app.get("/users", async (req, res) => {
  const { name, job } = req.query;
  try {
    const users = await userService.getUsers(name, job);
    res.send({ users_list: users });
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
});

app.use(express.json());

//Sets up end Point to accept the get function
app.get("/", (req, res) => {
  res.send("Hello World!");
});


app.get("/users", async (req, res) => {
  const name = req.query.name;
  if (name) {
    try {
      const users = await userService.findUserByName(name);
      res.send({ user_list: users });
    } catch (error) {
      res.status(500).send({ error: "Failed to fetch users by name: " + error.message });
    }
  } else {
    res.status(400).send({ error: "Name query parameter is required." });
  }
});

//http://localhost:8000/users?job=Manager
app.get("/users/job", async (req, res) => {
  const job = req.query.job;

  if (job) {
    try {
      const users = await userService.findUserByJob(job);
      res.send({ user_list: users });
    } catch (error) {
      res.status(500).send({ error: "Failed to fetch users by job: " + error.message });
    }
  } else {
    res.status(400).send({ error: "Job query parameter is required." });
  }
});


app.post("/users", async (req, res) => {
  const userToAdd = req.body;
  try {
    const user = await userService.addUser(userToAdd);
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send("Error: " + error.message);
  }
});

app.delete("/users/:id", async (req, res) => {
  const userId= req.params.id;
  try {
    const user = await userService.findUserById(userId);
    if(user){
      await userService.deleteById(userId);
      res.status(204).send(user);
    }else{
      res.status(404).send("User not found");
    }
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});

