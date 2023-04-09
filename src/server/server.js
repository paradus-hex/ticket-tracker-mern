import express from "express";

const app=express()

app.listen(3005, async () => {
  console.log(`API Server listening on port 3005`);
})