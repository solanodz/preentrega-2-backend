import express from 'express';
import handlebars from 'express-handlebars';
import path from 'path';

import productRouter from './routers/api/products.router.js'
import cartRouter from './routers/api/carts.router.js'
import { __dirname } from './utils.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'handlebars')

// ROUTERS 

app.use('/api', productRouter);
app.use('/api', cartRouter)

app.use((error, req, res, next) => {
    const message = `⛔ Ha ocurrido un error: ${error.message}`;
    console.log(message);
    res.status(500).json({ message });
});

export default app;