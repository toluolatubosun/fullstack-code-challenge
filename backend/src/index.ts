// set timezone
process.env.TZ = "Africa/Lagos";

import app from "@/app";
import { CONFIGS } from "@/configs";
import { connectMongoDB } from "@/libraries/mongodb";

// Listen to server port
app.listen(CONFIGS.PORT, async () => {
    // Initialize MongoDB connection
    await connectMongoDB();

    console.log(`:::> Server listening on port ${CONFIGS.PORT} @ http://localhost:${CONFIGS.PORT} in ${CONFIGS.NODE_ENV} mode <:::`);
});

// On server error
app.on("error", (error) => {
    console.error(`<::: An error occurred on the server: \n ${error}`);
});

export default app;
