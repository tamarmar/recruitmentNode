import mongoose from "mongoose";

const uri = "mongodb://localhost:27017/RecruitmentDB";

const connectDB = async () => {
    await mongoose.connect(uri);
};
const database = mongoose.connection;

database.on('error',(error) => {
    console.log(error);
});

database.once('conected',() => {
    console.log('database Conected')
})

export default connectDB;