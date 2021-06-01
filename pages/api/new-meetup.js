import {MongoClient} from 'mongodb';
const password = 'NvJkMkQ5cxnP2apd'
async function handler(req, res){
    if(req.method === 'POST'){
        const data = req.body;
        console.log(req.body);

        const { title, image, address, description} = data;

        const client = await MongoClient.connect('mongodb+srv://rohan:'+password+'@cluster0.yvlu5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
        const db = client.db();

        const meetupsCollection = db.collection('meetups');

        const result = await meetupsCollection.insertOne(data);

        console.log(result);

        client.close();

        res.status(201).json({message:'meetup inserted'})
    }
}

export default handler;

