// const mongoose = require("mongoose");
// const MONGOURI = "mongodb://localhost:27017/user-app";

// mongoose
//   .connect(MONGOURI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//   })
//   .then(() => {
//     console.log("connection successfull with mongo");
//   })
//   .catch((err) => console.log("no connection"));

const mongoose = require("mongoose");
 const   MONGOURI= "mongodb+srv://demo:786786@cluster0.1y84e5i.mongodb.net/?retryWrites=true&w=majority";

    mongoose.connect(MONGOURI,{
      useCreateIndex:true,
      useNewUrlParser:true,
      useUnifiedTopology:true,
      useFindAndModify:false,
    });
    mongoose.connection.on("connected", () => {
      console.log("connection successfull to mongo");
      mongoose.connection.on("error", (err) => {
        console.log("error connecting", err);
      });
    });
