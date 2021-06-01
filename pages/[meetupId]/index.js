import MeetupDetail from '../../components/meetups/MeetupDetails';
import {MongoClient, ObjectId} from 'mongodb';

function MeetupDetails(props) {
  return (
    <MeetupDetail
      image={props.meetupData.image}
      title={props.meetupData.title}
      address={props.meetupData.address}
      description={props.meetupData.description}
    />
  );
}

export async function getStaticPaths() {
    const password = 'NvJkMkQ5cxnP2apd'

    const client = await MongoClient.connect('mongodb+srv://rohan:'+password+'@cluster0.yvlu5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find({},{_id:1}).toArray();
    return {
    fallback: false,
    paths: meetups.map(meetup=>({  params: {meetupId: meetup._id.toString()}}))
  };
}

export async function getStaticProps(context) {
  // fetch data for a single meetup
  const password = 'NvJkMkQ5cxnP2apd'

  const client = await MongoClient.connect('mongodb+srv://rohan:'+password+'@cluster0.yvlu5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
  const db = client.db();

  const meetupsCollection = db.collection('meetups');
  const meetupId = context.params.meetupId;


  const meetup = await meetupsCollection.findOne({_id:ObjectId(meetupId)});
  



  console.log(meetupId);

  return {
    props: {
      meetupData: {
          id:meetup._id.toString(),
          title:meetup.title,
          address:meetup.address,
          image:meetup.image,
          description:meetup.description
      },
    },
  };
}

export default MeetupDetails;