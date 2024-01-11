import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

const env = dotenv.config().parsed;
const port = env.PORT;
const uName = env.MONGO_DB_USER;
const dbPassword = env.MONGO_DB_PASSWORD;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

(async () => {
    try {
        const db = `mongodb+srv://${uName}:${dbPassword}@bsgdistrictcluster.mhib9bw.mongodb.net/?retryWrites=true&w=majority`;
        await mongoose.connect(db);
        const server = app.listen(port, () => {
            console.log("Connected to Port:", port);
            console.log("Hawk's Server");
        });

    } catch (err) {
        console.log("server connection error occured: ", err);
    }
})();

app.get("/", async (req, res) => {
    try {
        res.status(404).json({
            status: "SUCCESS",
            statusValue: 200,
            message: "Requested url is not available..",
        });
    } catch (err) {
        res.status(500).json({
            status: "ERROR",
            statusCode: 500,
            message: `The Server was unable to complete your request. ${err}`,
        });
    }
});


// app.use("/v1", commonRoutes);
// app.use("/v1/protected", protectedCommonRoutes);
// app.use("/v1/admin", adminRoutes);

app.get("*", async (req, res) => {
    let ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    res.status(404).json({
        status: "FAIL",
        statusCode: 404,
        message: "Requested url is not available..",
        ipAddress: ip,
    });
});