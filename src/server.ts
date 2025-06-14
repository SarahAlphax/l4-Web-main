import express from "express";
import apiRoutes from "./routes/api";
import path from "path";

import { fileURLToPath } from "url";

const app = express();
const port = 3000;

const publicPath = path.join(__dirname, "..", "frontend");

app.use(express.static(publicPath));

app.get("/", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});
console.log(path.resolve(__dirname, "../frontend/images/full"));
app.use("/api", apiRoutes);

app.use(
  "/uploads",
  express.static(path.resolve(__dirname, "../frontend/images/full"))
);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
export default app;
