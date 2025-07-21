import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes.js';
import seatRoutes from './routes/seatRoutes.js';

import reportRoutes from './routes/reportRoutes.js';
import reservationRoutes from './routes/reservationRoutes.js';

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('API Running');

});

app.use('/api/auth', userRoutes);
app.use('/api/seats', seatRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/reports', reportRoutes);



app.use((err, req, res, next) => {
  console.error('❌ Error:', err.message);
  res.status(500).json({ message: 'Something went wrong' });
});

export default app;
