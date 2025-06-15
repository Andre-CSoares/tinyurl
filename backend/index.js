import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import shortid from "shortid";
import Url from "./url.js";
import { validateUrl } from './util/util.js';

dotenv.config()
const app = express();

app.use(cors());
app.use(express.json());

const connectDB = async () => {
    try {
        console.log('Tentando conectar ao MongoDB...');
        console.log('MONGO_URI:', process.env.MONGO_URI ? 'Definida' : 'Não definida');
        
        await mongoose.connect(process.env.MONGO_URI);
        
        console.log('✅ DB conectado com sucesso!');
    } catch (err) {
        console.error('❌ Erro ao conectar ao MongoDB:', err.message);
        console.error('Verifique:');
        console.error('1. Se as credenciais estão corretas no .env');
        console.error('2. Se o IP está na whitelist do MongoDB Atlas');
        console.error('3. Se o usuário tem permissões adequadas');
        process.exit(1);
    }
};

connectDB();

app.get("/all", async (req, res) => {
    try {
        const data = await Url.find();
        res.json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json('Server Error');
    }
});

app.post("/short", async (req, res) => {
    console.log(req.body.origUrl);

    const { origUrl } = req.body;
    const base = `http://localhost:3333`;

    const urlId = shortid.generate();
    if (validateUrl(origUrl)) {
        try {
            let url = await Url.findOne({ origUrl });
            if (url) {
                res.json(url);
            } else {
                const shortUrl = `${base}/${urlId}`;

                url = new Url({
                    origUrl,
                    shortUrl,
                    urlId,
                    date: new Date(),
                });

                await url.save();
                res.json(url);
            }
        } catch (err) {
            console.log(err);
            res.status(500).json('Server Error');
        }
    } else res.status(400).json('Invalid Url');
});

app.get("/:urlId", async (req, res) => {
    try {
        const url = await Url.findOne({ urlId: req.params.urlId });
        console.log(url);

        if (url) {
            url.clicks++;
            await url.save();
            return res.redirect(url.origUrl);
        } else res.status(404).json('Not Found')
    } catch (err) {
        console.log(err);
        res.status(500).json('Server Error');
    }
});

const PORT = process.env.PORT || 3333;
mongoose.connection.once('open', () => {
    app.listen(PORT, () => {
        console.log(`🚀 Servidor rodando na porta ${PORT}`);
        console.log(`📱 Acesse: http://localhost:${PORT}`);
    });
});