import express from 'express';
import path from 'path';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import affiliateRoutes from './routes/affiliate.route';
import athleteRoutes from './routes/athlete.route';
import workoutRoutes from './routes/workout.route';
import scoreRoutes from './routes/score.route';

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/affiliates', affiliateRoutes);
app.use('/api/athletes', athleteRoutes);
app.use('/api/workouts', workoutRoutes);
app.use('/api/scores', scoreRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('/dashboard', (req, res) => {
  res.send(`
    <body style="background: #111; color: white; display: flex; justify-content: center; align-items: center; height: 100vh; font-family: sans-serif;">
      <h1>Dashboard Placeholder</h1>
    </body>
  `);
});

// Serve static files
app.use(express.static(path.join(__dirname, '../public')));

app.get('/api/health', (req, res) => {
  res.json({ message: 'Sports Informatics API is running' });
});

export default app;
