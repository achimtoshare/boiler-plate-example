const express = require('express')
const app = express()
const port = 5000

const mongoose= require('mongoose')
mongoose.connect(
'mongodb+srv://hkh:0903@sandbox.ilr8m.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
{useNewUrlParser:true, useUnifiedTopology:true}
).then(() => console.log('MongoDb Connected..')).catch(err => console.log(err))
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})