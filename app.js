const express = require("express");
const multer=require("multer");
const exceltojson=require("convert-excel-to-json");
const fs=require("fs-extra");


const port = 3500;
const app= express();

// destination to save our upload files
var upload = multer({dest: "uploads/"})
console.log("hjkjhhj");
// route
app.post("/read", upload.single("file"),(req,res)=>{
    try {
        // check if file exists
        if (req.file?.filename==null || req.file?.filename=='undefined') {
            res.status(400).json("No such file")
        } else {
            // handle business logic
            var filepath = 'uploads/'+ req.file.filename;

            const exceldata= exceltojson({
                sourceFile:filepath,
                header:{
                    rows:1
                },
                columnToKey:{
                    '*': '{{columnHeader}}',
                },
            });
            //remove uploaded file after reading to server
            fs.remove(filepath)
            console.log(exceldata)
            res.status(200).json(exceldata)
        }
    } catch (error) {
      res.status(500)  
    }
})

app.listen(port,()=>{
    console.log(`Server running on port ${port}`)
 });


