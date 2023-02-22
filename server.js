const express = require("express");
const mongoose = require("mongoose");
const BrandName = require('./model');

const app = express()
app.use(express.json())

mongoose.connect("mongodb+srv://<username>:<password>@cluster0.jsmfma8.mongodb.net/?retryWrites=true&w=majority").then(() => 
console.log("DB Connected")
).catch(err => console.log(err))


app.post("/addbrands", async(req, res) => {
    const {brandname} = req.body ; 
    try {
        const newData = new BrandName({brandname})
        await newData.save()
        return res.json(await BrandName.find()) 
    } catch (error) {
        console.log(error)
    }
})

app.get("/getAllBrands", async(req,res) => {
    try {
        const AllData = await BrandName.find()
        return res.json(AllData);

    } catch (error) {
        console.log(error)
    }
})

app.get("/allBrands/:id", async(req, res) => {
    try {
        const data = await BrandName.findById(req.params.id)
        return res.json(data)
    } catch (error) {
        console.log(error)
    }
})

app.listen(5000, () => console.log("express 5000 port runnning"))
