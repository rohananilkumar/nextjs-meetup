import { useEffect, useState } from 'react';
import {MongoClient} from 'mongodb';
import MeetupList from '../components/meetups/MeetupList';
const password = 'NvJkMkQ5cxnP2apd'

import Head from 'next/head';

function HomePage(props) {
    return <>
    <Head>
        <title>React Meetups</title>
        <meta name='description' content='Browse a huge list of active React meetups!'/>
    </Head>
    <MeetupList meetups={props.meetups}></MeetupList>
    </>
}

/*

export async function getServerSideProps(context){ //Works only one page components and name is fixed
    //any code written here runs in the server side only (every time a client requests for it)
    //This function generates props and sends it to the HomePage component
    
    const req = context.req;    //request data
    const res = context.res;    //response data
    
    return {
        props:{
            meetups:DUMMY_MEETUPS,
        }
    }
}
*/


export async function getStaticProps(){   //Works only one page components and name is fixed
    //Any code you write here runs only on the build time
    //This function generates props and sends it to the HomePage component
    const client = await MongoClient.connect('mongodb+srv://rohan:'+password+'@cluster0.yvlu5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find().toArray();

    
    return {
        props:{
            meetups:meetups.map(meetup=>{
                return {
                    title:meetup.title,
                    image:meetup.image,
                    description:meetup.description,
                    id: meetup._id.toString()
                }
            }),
        },
        revalidate:10,  //Regenerates the page after 10s if there is request for this page
    }
}


export default HomePage;