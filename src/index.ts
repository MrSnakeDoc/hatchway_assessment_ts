import { config } from "./app/config";
import app from "./server";

app.listen(config.port, async () => {
  console.log(`Server is running on http://${config.host}:${config.port}`);
});
