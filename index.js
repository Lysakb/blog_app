const app = require("./app");
const {connectmongodb} = require('./database/database');


const PORT = process.env.PORT;
connectmongodb()


app.listen(PORT, ()=>{
    console.log(`listening at ${PORT}`)
})