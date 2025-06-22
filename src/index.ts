import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { graphqlHTTP } from 'express-graphql';
import schema from './schema/schema';

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://karthikb2701:Karthikb2701@cluster0.gcwvkms.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('MongoDB Connected'));

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/graphql`);
});
