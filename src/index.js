import "dotenv/config";
import { connectDB } from "./config/mongodb.config.js";
import { app } from "./app.js";

// Connection to database and proceeding with the application
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log(
        `server running on http://localhost:${process.env.PORT}/api/v1 ...`
      );
    });

    app.on("error", (error) => {
      console.log("ERROR: ", error);
      throw error;
    });
  })
  .catch((error) => {
    console.log("Connection to database failed.\nERROR: ", error);
  });
