import mongoose from "mongoose";

export const dbConnection = () => {
    mongoose.connect(process.env.MONGOOSE_URI, {
        dbName: "mern-hospital-ms"
    })
    .then(() => {
        console.log("MONGOOSE CONNECTED SUCCESSFULLY");
    })
    .catch((error) => {
        console.error(`MONGOOSE CONNECTION ERROR: ${error}`);
    });
};
