import express from 'express'
import ApiRouter from './routes/router'
import { engine } from 'express-handlebars'; // Импортируем engine из express-handlebars
import bodyParser from 'body-parser';
const cors = require('cors');
const Handlebars = require('handlebars');


function main():void{
    const app = express();
    const PORT: number = 3000;
    app.use(bodyParser.urlencoded({ extended: true })); // Для обработки данных формы
    app.use(cors())
    app.use(express.json());

    Handlebars.registerHelper('cancelButton', function(actionUrl:string) {
        return new Handlebars.SafeString(`
            <form action="${actionUrl}" method="GET">
                <button type="submit">Отказаться</button>
            </form>
        `);
    });

    app.set('views', './src/view'); // Папка с шаблонами

    // Настройка Handlebars
    app.engine('handlebars', engine({
        defaultLayout: 'main', // Указываем основной layout без пути
        layoutsDir: './src/view', // Директория для макетов
        partialsDir: './src/view', // Директория для частичных шаблонов
    }));

    app.set('view engine', 'handlebars');


    const router = new ApiRouter()
    app.use('/api',router.router)

    app.listen(PORT,(): void => console.log("yse"))
}

main();