import express from 'express';
import cors from 'cors';
import helmet from 'helmet'
import mongoSanitize from 'express-mongo-sanitize';
import rateLimit from 'express-rate-limit'
import connectDB from './config/db.js';
import menuRouter from './routes/menu.route.js';
import authRouter from './routes/auth.route.js';
import { env } from './config/env.js';

const app = express()
const PORT = env.PORT;

app.use(helmet())

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests',
    standardHeaders: true,
    legacyHeaders: false,
});

const authLimit = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: 'Too many authentication attempts, please try again later.'
})

app.use('/api/', limiter)
app.use('/api/auth/', authLimit)

app.use(cors())

app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// app.use(mongoSanitize());

app.use('/assets', express.static('assets', {
  setHeaders: (res) => {
    res.set('Cross-Origin-Resource-Policy', 'cross-origin');
    res.set('Access-Control-Allow-Origin', '*');
  }
}));

app.use('/api/menu', menuRouter);
app.use('/api/auth', authRouter);

const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log("Server is runing!!!")
        })
    } catch (err) {
        console.log(err)
        process.exit(1);
    }
}

startServer();