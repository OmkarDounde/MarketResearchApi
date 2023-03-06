let express = require('express');
let app = express();
let dotenv = require('dotenv');
dotenv.config()
let port = process.env.PORT || 1221
let cors = require('cors');
let mongo = require('mongodb');
let bodyParser = require('body-parser');
let MongoClient = mongo.MongoClient;
let mongoUrl = "mongodb+srv://TestUser:test123@cluster0.eskpp2o.mongodb.net/Zomato?retryWrites=true&w=majority"
let db;

//Middleware
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//server Response
app.get('/',(req,res)=>{
    res.send('Omkar Is good Devloper')
})

//Reports
app.get('/Report',(req,res)=>{    
    let ut = Number(req.query.ut)
    let  query = {}
    if(ut){
        query = {category_id:ut}
    }                  
db.collection('report').find(query).toArray((err,result) =>{
    if(err) throw err;
    res.send(result)
})
})

// New Added Reports <Reports>

app.get('/categories',(req,res)=>{    
    let utt = (req.query.utt)
    let  query = {}
    if(utt){
        query = {category_id:utt}
    }                  
db.collection('Reportmain').find(query).toArray((err,result) =>{
    if(err) throw err;
    res.send(result)
})
})

// New Added Reports <Reports>

app.get('/Reports',(req,res)=>{    
    let utt = (req.query.utt)
    let  query = {}
    if(utt){
        query = {category_id:utt}
    }                  
db.collection('Reportmain').find(query).toArray((err,result) =>{
    if(err) throw err;
    res.send(result)
})
})

//New added collection [LReports]

app.get('/LReport',(req,res)=>{    
    let utt = (req.query.utt)
    let  query = {}
    if(utt){
        query = {category_id:utt}
    }                  
db.collection('LReports').find(query).toArray((err,result) =>{
    if(err) throw err;
    res.send(result)
})
})

//To Get Main Report Reportmain

app.get('/details/:restId',(req,res)=>{
    // let id = mongo.ObjectId(req.params.restId);// if you want to find with the ObjectId Then use this
let id = req.params.restId// If You Want To find with restaurants Id then use this

    db.collection('Reportmain').find({ReportNo:id}).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})

//to place order new
app.post('/Orders', (req,res) => {
    db.collection('orders').insert(req.body,(err,result)=>{
        if(err) throw err;
        res.send('Order Placed')
    })
})

//to place Sample Form orders
app.post('/sampleForm', (req,res) => {
    db.collection('samplerequest').insert(req.body,(err,result)=>{
        if(err) throw err;
        res.send('Sample Request Sent Successfully')
    })
})

//to place  Custmization request
app.post('/Custmizationrequest', (req,res) => {
    db.collection('CustmizationRequest').insert(req.body,(err,result)=>{
        if(err) throw err;
        res.send('Custmization Request Sent Successfully')
    })
})

//to place  Inquiry request
app.post('/Inquiryrequest', (req,res) => {
    db.collection('InquiryRequest').insert(req.body,(err,result)=>{
        if(err) throw err;
        res.send('Inquiry Request Sent Successfully')
    })
})

//to receive Custmization request
app.get('/ViewCustmization', (req,res) => {
    let email = req.query.email;
    let query = {};
    if(email){
        query ={email:email}
    }else{
        query ={}
    }
    db.collection('CustmizationRequest').find(query).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})


//to receive ViewInquiry request
app.get('/ViewInquiry', (req,res) => {
    let email = req.query.email;
    let query = {};
    if(email){
        query ={email:email}
    }else{
        query ={}
    }
    db.collection('InquiryRequest').find(query).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})






//to receive sample request
app.get('/ViewSample', (req,res) => {
    let email = req.query.email;
    let query = {};
    if(email){
        query ={email:email}
    }else{
        query ={}
    }
    db.collection('samplerequest').find(query).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})
//To View orders
app.get('/viewOrder', (req,res) => {
    let email = req.query.email;
    let query = {};
    if(email){
        query ={email:email}
    }else{
        query ={}
    }
    db.collection('orders').find(query).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})

//Category
app.get('/Category',(req,res)=>{    
    let ut = Number(req.query.ut)
    let  query = {}
    if(ut){
        query = {category_id:ut}
    }                  
db.collection('Category').find(query).toArray((err,result) =>{
    if(err) throw err;
    res.send(result)
})
})

//Update Order
app.put('/updateOrder/:id', (req,res)=>{
    let oId = Number(req.params.id);
    db.collection('orders').updateOne(
        {orderId:oId},
        {
            $set:{
                "status":req.body.status,
                "bank_name":req.body.bank_name,
                "date":req.body.date,
                "mobile_no":req.body.mobile_no
            }
        },(err,result) =>{
            if(err) throw err;
            res.send('Order is Updated')
        }
    )

})

//delete Order
app.delete('/deleteOrder/:id', (req,res)=>{
    let _id = mongo.ObjectId(req.params.id);
    db.collection('orders').remove({_id},(err,result)=>{
        if (err) throw err;
        res.send('Order Is Deleted')
    })
})

//To Connect with MongoDb
MongoClient.connect(mongoUrl,{useNewUrlParser:true},(err,dc)=>{
    if(err) console.log(`Error While Connecting : ${err}`);
    db = dc.db('Zomato')
    app.listen(port,() => {
       console.log(`Server Is Running On Port ${port}`)
    })
})



