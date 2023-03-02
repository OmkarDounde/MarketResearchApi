let express = require('express');
let app = express();
let port = 1226;
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


//location

app.get('/location',(req,res)=>{    
    let ut = Number(req.query.ut)
    let  query = {}
    if(ut){
        query = {state_id:ut}
    }                  
db.collection('location').find(query).toArray((err,result) =>{
    if(err) throw err;
    res.send(result)
})
})

//Mealtypes

app.get('/Mealtypes',(req,res) => {
    let meal = Number(req.query.meal)
    let query = {}
    if (meal) {
        query = {mealtype_id:meal}
    }
    db.collection('Mealtypes').find(query).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
 })

//RestaurantMenu

app.get('/RestaurantMenu',(req,res) => {
    let stateIdd = Number(req.query.stateIdd)
    let om = Number(req.query.om)
    let query = {}
    if (om){
        query={menu_id:om}
    }
    if(stateIdd){
        query = {restaurant_id:stateIdd}
    }
    db.collection('RestaurantMenu').find(query).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
 })



 //Restaurants

 app.get('/restaurant',(req,res) => {
    // let stateId = req.params.id
    let stateId = Number(req.query.stateId) 
    let mealId = Number(req.query.mealId) 
    let query = {}
    if(stateId && mealId){
        query = {state_id:stateId,"mealTypes.mealtype_id":mealId}
    }else if(stateId){
        query={state_id:stateId}
    }else if(mealId){
        query={"mealTypes.mealtype_id":mealId}
    }
    db.collection('RestaurantsData').find(query).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
 })

 //Filters with respect to mealtypes and mealid&cuisines

 app.get('/filter/:mealId', (req,res)=>{
    let query = {};
    let mealId = Number(req.params.mealId);
    let cuisineId = Number(req.query.cuisineId);
    let lcost = Number(req.query.lcost);
    let hcost = Number(req.query.hcost);
    let sort = {cost:1};
    if(req.query.sort){
        sort = {cost:req.query.sort}
    }
    if (cuisineId){
        query = {
            "mealTypes.mealtype_id":mealId,
            "cuisines.cuisine_id":cuisineId

        }
    }else if(lcost && hcost){
        query ={
            "mealTypes.mealtype_id":mealId,
            $and:[{cost:{$gt:lcost,$lt:hcost}}]
        }
    }
    db.collection('RestaurantsData').find(query).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })


})

// Details for restaurants

app.get('/details/:restId',(req,res)=>{
    // let id = mongo.ObjectId(req.params.restId);// if you want to find with the ObjectId Then use this
let id = Number(req.params.restId) // If You Want To find with restaurants Id then use this

    db.collection('RestaurantsData').find({restaurant_id:id}).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})

//Menu For restaurants
app.get('/menu/:restId',(req,res)=>{
let id = Number(req.params.restId) 
    db.collection('RestaurantMenu').find({restaurant_id:id}).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})

//To Plce Orders
app.post('/placeOrder', (req,res) => {
    db.collection('orders').insert(req.body,(err,result)=>{
        if(err) throw err;
        res.send('Order Placed')
    })
})

//To View orders
app.get('/viewOrder', (req,res) => {
    db.collection('orders').find().toArray((err,result) => {
        if(err) throw err;
        res.send(result)
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



// // all api

// let express = require('express');
// let app = express();
// let port = 1226;
// let cors = require('cors');
// let mongo = require('mongodb');
// let bodyParser = require('body-parser');
// let MongoClient = mongo.MongoClient;
// let mongoUrl = "mongodb+srv://TestUser:test123@cluster0.eskpp2o.mongodb.net/Zomato?retryWrites=true&w=majority"
// let db;

// //Middleware
// app.use(cors())
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({extended:true}))
// app.use(express.json())
// app.use(express.urlencoded({extended:true}))

// //server Response
// app.get('/',(req,res)=>{
//     res.send('Omkar Is good Devloper')
// })


// //location

// app.get('/location',(req,res)=>{    
//     let ut = Number(req.query.ut)
//     let  query = {}
//     if(ut){
//         query = {state_id:ut}
//     }                  
// db.collection('location').find(query).toArray((err,result) =>{
//     if(err) throw err;
//     res.send(result)
// })
// })

// //Mealtypes

// app.get('/Mealtypes',(req,res) => {
//     let meal = Number(req.query.meal)
//     let query = {}
//     if (meal) {
//         query = {mealtype_id:meal}
//     }
//     db.collection('Mealtypes').find(query).toArray((err,result) => {
//         if(err) throw err;
//         res.send(result)
//     })
//  })

// //RestaurantMenu

// app.get('/RestaurantMenu',(req,res) => {
//     let stateIdd = Number(req.query.stateIdd)
//     let om = Number(req.query.om)
//     let query = {}
//     if (om){
//         query={menu_id:om}
//     }
//     if(stateIdd){
//         query = {restaurant_id:stateIdd}
//     }
//     db.collection('RestaurantMenu').find(query).toArray((err,result) => {
//         if(err) throw err;
//         res.send(result)
//     })
//  })



//  //Restaurants

//  app.get('/restaurant',(req,res) => {
//     // let stateId = req.params.id
//     let stateId = Number(req.query.stateId) 
//     let mealId = Number(req.query.mealId) 
//     let query = {}
//     if(stateId && mealId){
//         query = {state_id:stateId,"mealTypes.mealtype_id":mealId}
//     }else if(stateId){
//         query={state_id:stateId}
//     }else if(mealId){
//         query={"mealTypes.mealtype_id":mealId}
//     }
//     db.collection('RestaurantsData').find(query).toArray((err,result) => {
//         if(err) throw err;
//         res.send(result)
//     })
//  })

//  //Filters with respect to mealtypes and mealid&cuisines

//  app.get('/filter/:mealId', (req,res)=>{
//     let query = {};
//     let mealId = Number(req.params.mealId);
//     let cuisineId = Number(req.query.cuisineId);
//     let lcost = Number(req.query.lcost);
//     let hcost = Number(req.query.hcost);
//     let sort = {cost:1};
//     if(req.query.sort){
//         sort = {cost:req.query.sort}
//     }
//     if (cuisineId){
//         query = {
//             "mealTypes.mealtype_id":mealId,
//             "cuisines.cuisine_id":cuisineId

//         }
//     }else if(lcost && hcost){
//         query ={
//             "mealTypes.mealtype_id":mealId,
//             $and:[{cost:{$gt:lcost,$lt:hcost}}]
//         }
//     }
//     db.collection('RestaurantsData').find(query).toArray((err,result) => {
//         if(err) throw err;
//         res.send(result)
//     })


// })

// // Details for restaurants

// app.get('/details/:restId',(req,res)=>{
//     // let id = mongo.ObjectId(req.params.restId);// if you want to find with the ObjectId Then use this
// let id = Number(req.params.restId) // If You Want To find with restaurants Id then use this

//     db.collection('RestaurantsData').find({restaurant_id:id}).toArray((err,result) => {
//         if(err) throw err;
//         res.send(result)
//     })
// })

// //Menu For restaurants
// app.get('/menu/:restId',(req,res)=>{
// let id = Number(req.params.restId) 
//     db.collection('RestaurantMenu').find({restaurant_id:id}).toArray((err,result) => {
//         if(err) throw err;
//         res.send(result)
//     })
// })

// //To Plce Orders
// app.post('/placeOrder', (req,res) => {
//     db.collection('orders').insert(req.body,(err,result)=>{
//         if(err) throw err;
//         res.send('Order Placed')
//     })
// })

// //To View orders
// app.get('/viewOrder', (req,res) => {
//     db.collection('orders').find().toArray((err,result) => {
//         if(err) throw err;
//         res.send(result)
//     })
// })



// //To Connect with MongoDb

// MongoClient.connect(mongoUrl,{useNewUrlParser:true},(err,dc)=>{
//     if(err) console.log(`Error While Connecting : ${err}`);
//     db = dc.db('Zomato')
//     app.listen(port,() => {
//        console.log(`Server Is Running On Port ${port}`)
//     })
// })

