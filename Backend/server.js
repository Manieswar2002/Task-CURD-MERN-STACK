// import express from 'express';
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import cors from 'cors';
// import authRoutes from './routes/auth.js';
// import taskRoutes from './routes/tasks.js';

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// const allowedOrigin = 'https://task-curd-mern-stack-rn9n.vercel.app';

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'https://task-curd-mern-stack-rn9n.vercel.app');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
//   res.header('Access-Control-Allow-Credentials', 'true');
//   if (req.method === 'OPTIONS') {
//     return res.sendStatus(200);
//   }
//   next();
// });

// const corsOptions = {
//   origin: allowedOrigin,
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   credentials: true
// };

// app.use(cors(corsOptions));

// // ✅ CRUCIAL: Preflight requests need this
// app.use(express.json());

// app.use('/api/auth', authRoutes);
// app.use('/api/tasks', taskRoutes);

// mongoose.connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log('MongoDB connected');
//     app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//   })
//   .catch(err => console.error('MongoDB connection error:', err));




import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import taskRoutes from './routes/tasks.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// --- CORS Configuration ---
// Define the single origin that is allowed to make requests
const allowedOrigin = 'https://task-curd-mern-stack-rn9n.vercel.app';

// Configure the CORS options
const corsOptions = {
  origin: allowedOrigin,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  credentials: true, // Allow cookies to be sent
  optionsSuccessStatus: 200 // For legacy browser support
};

// Use the cors middleware with your options. This should be one of the first middleware.
app.use(cors(corsOptions));

// This is a pre-flight request handler for all routes.
// The cors middleware above often handles this automatically, but this is an explicit catch-all.
app.options('*', cors(corsOptions));

// --- Body Parser Middleware ---
// This is crucial for your routes to be able to read `req.body`
app.use(express.json());

// --- API Routes ---
// Your API routes should come after the CORS and body-parser middleware
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// --- Database Connection and Server Start ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected successfully.');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('MongoDB connection error:', err));









