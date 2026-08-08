import app from "./src/app.js";
import connectDB from "./src/config/bd.js";

const PORT = process.env.PORT || 3000;

console.log("Mongo URL:", process.env.MONGODB_URL);

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
