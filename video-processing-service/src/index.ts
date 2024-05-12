import express from "express";

const app = express();
const port = 3000; // default route for express apps

// req(uest), res(ponse) 
app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.listen(port, () => {
  console.log(`Video processing service listening at https://localhost:${port}`);
})