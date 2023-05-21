import express, {Application, Request, Response} from 'express';
const app:Application = express();
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';

// using cors
app.use(cors());

// parse data
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const {URI} = process.env;
console.log(URI)
const {PORT} = process.env;

const dbConnect = async (): Promise<void> => {
    if(!URI) {
        throw new Error('URI must be provided')
    }
    try {
        await mongoose.connect(URI);
        console.log('Database Connected 🌐');
    } catch (error) {
        console.error('Database connection error:', error);
    }
}
dbConnect();


app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
})

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});