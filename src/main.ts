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
    app.set('partialsDir', 'D:/6_semestr/PSKP/lab_20/src/view');

    Handlebars.registerHelper('cancelButton', function(actionUrl:string) {
        return new Handlebars.SafeString(`
            <form action="${actionUrl}" method="GET">
                <button type="submit">Отказаться</button>
            </form>
        `);
    });

    app.engine('handlebars', engine({
        defaultLayout: 'D:/6_semestr/PSKP/lab_20/src/view/main', // Указываем основной layout
        layoutsDir : "D:/6_semestr/PSKP/lab_20/src/view",
        partialsDir : "D:/6_semestr/PSKP/lab_20/src/view",
    }));
    app.set('view engine', 'handlebars');
    app.set('views', "D:/6_semestr/PSKP/lab_20/src/view"); // Указываем путь к папке с шаблонами


    const router = new ApiRouter()
    app.use('/api',router.router)

    app.listen(PORT,(): void => console.log("yse"))
}

main();