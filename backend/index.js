import app from './app.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5000;

try {
  app.listen(PORT, () => {
    console.log(` Server running on port ${PORT}`);
  });
} catch (err) {
  console.error(' Server failed to start:', err.message);
}
