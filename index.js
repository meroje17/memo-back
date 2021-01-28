/** Required modules */

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const TopPlayer = require("./model/topPlayer");
const sortedByScore = require("./utils/sortedByScore.utils");
const updateTopPlayers = require("./utils/updateTopPlayers.utils");

/** Initialisation */

const app = express();
mongoose
  .connect(
    "mongodb+srv://memo:M3M0memo@cluster0.imqld.mongodb.net/memodb?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));
const port = 5000;
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});
let userPosted = {};
let topPlayers = [];

/** Middleware */

app.get("/", (req, res) => {
  res.send("Welcome to the memo API !");
});

app.post("/api", (req, res, next) => {
  userPosted = req.body;
  TopPlayer.find()
    .then((players) => {
      topPlayers = players;
      next();
    })
    .catch(() => {
      res.status(400).json({
        message:
          "Erreur serveur - Impossible de récupérer les meilleurs joueurs.",
      });
    });
});

app.post("/api", (req, res, next) => {
  topPlayers = sortedByScore(topPlayers);
  for (var index = 0; index < topPlayers.length; index++) {
    if (userPosted.score > topPlayers[index].score) {
      TopPlayer.deleteOne({ score: topPlayers[index].score })
        .then(next())
        .catch(
          res.status(400).json({
            message:
              "Erreur serveur - Impossible de remplacer le meilleur joueur que vous venez de battre.",
          })
        );
    }
  }
  res.status(200).json({
    message:
      "Désolé, malgré votre très bon score vous n'êtes pas parmi les meilleurs.",
    bestPlayers: topPlayers,
  });
});

app.post("/api", (req, res, next) => {
  const newTopPlayer = new TopPlayer({
    username: userPosted.username,
    score: userPosted.score,
  });
  const newTopPlayers = updateTopPlayers(userPosted, topPlayers);
  newTopPlayer
    .save()
    .then(
      res.status(200).json({
        message: "Félicitation ! Vous êtes désormais parmi les meilleurs !",
        best: newTopPlayers,
      })
    )
    .catch(() => {
      res.status(400).json({
        message:
          "Erreur serveur - Impossible de vous ajouter à la liste des meilleurs joueurs.",
      });
    });
});

app.listen(port, () => {
  console.log(`Server is booming on port 5000
Visit http://localhost:5000`);
});
