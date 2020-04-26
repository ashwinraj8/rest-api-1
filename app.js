let express = require('express');
let mongoose = require('mongoose');
let shop = require('./models/shop');

mongoose.connect('mongodb://localhost/subscribers')
let db = mongoose.connection
db.on('error',(error)=>console.log(error));
db.once('open',()=>console.log('Connected to database'));



let app = express();
//let products = [];
let id = 1;
app.use(express.json());
app.use(express.static('public'));


app.get('/products',async (req,resp)=>{

    let products = await shop.find();
    resp.send(products);
})

app.get('/products/:id', (req,resp)=>{

    let id = req.params.id
    shop.findById(id)
    .exec()
    .then(doc =>{
        console.log(doc);
        resp.status(200).json(doc);  
    })
    .catch(err=>{
        console.log(err);
        resp.status(500).json({error:err});
    }); 
    
})

app.post('/products',(req,resp)=>{

    let product = new shop({
        _id: new mongoose.Types.ObjectId(),
        Product: req.body.product,
        Price: req.body.price
    })
    product
    .save()
    .then(result =>{
        console.log(result);
        resp.status(201).json({
            message:"Handling POST",
            createdProduct: result
        });
    })
    .catch(err=>{
        console.log(err);
        resp.status(500).json({error:err});
    }); 
    
    
    //////////////////////////
   /* let newProduct = req.body;
    newProduct.id = id;
    id++;
    products.push(newProduct);
    resp.send('Created!');
    console.log(products);*/
})

app.put('/products/:id', (req,resp)=>{

    let id = req.params.id;
    shop.update({_id:id},{$set:{Product:req.body.product,Price:req.body.price}})
    .then(result=>{
        console.log(result);
        resp.status(201).json({
            message:"Handling PUT",
            createdProduct: result
        });
        
    })


})

app.delete('/products/:id',(req,resp)=>{

    let id = req.params.id;
    shop.remove({_id:id})
    .exec()
    .then(doc =>{
        console.log(doc);
        resp.status(200).json(doc);  
    })
    .catch(err=>{
        console.log(err);
        resp.status(500).json({error:err});
    }); 
})

app.listen(3000,()=> console.log('Listening to 3000...'));