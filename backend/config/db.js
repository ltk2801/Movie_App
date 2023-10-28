// connect MongoDB with mongoose

const mongoose = require("mongoose");

exports.connectDB = async () => {
  try {
    const connect = await mongoose.connect(
      "mongodb+srv://luutuankhanha3dt:B01888084955@moviesapp.vbelyjh.mongodb.net/Movie-App?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("MongoDB Connected");
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};
