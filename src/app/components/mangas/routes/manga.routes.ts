import MangaController from '../controller/mangas.controller';

import express from 'express';
import { MangaPages } from '../../../@types/Manga';

const app = express();

app.post('/search', async (req, res) => {

    const mangaName:any = req.body.name;

    if(!mangaName) return res.sendStatus(404);

    const result = await MangaController.searchManga(mangaName)

    return res.send(result)

})

app.get('/top/:page', async (req, res) => {

    const numberOfPage = Number(req.params.page)

    const result = await MangaController.getTop(numberOfPage);

    return res.send(result)
})

app.get('/top', (req, res) => {
    res.redirect('/top/1');
})

app.get("/pages/:id", (req, res) => {
    const id = req.params.id;

    MangaController.getPages(id).then((pages) => {
        res.json(pages);
    });
});

app.get('/chapters/:id/:page', async (req, res) => {
    const id = req.params.id;
    const page = req.params.page;

    var return_data:MangaPages = {chapters:[{chapter_name:"", date:"", id_release:0, number:0}], idSerie: "", name: "", urlName:""};

    var result = await MangaController.getChapters(id, page);

    return_data.chapters = result.chapters;

    // checa se as infos já foram adicionadas para evitar ficar reescrevendo os valores.
    if (!return_data.name) { 
        return_data.idSerie = result.idSerie;
        return_data.urlName = result.urlName;
        return_data.name = result.name;
    }

    res.send(return_data!);
})

app.get('/manga/:id', async (req, res) => {
    const id = req.params.id;
    const response = await MangaController.getMangaById(id);

    return res.json(response);
})

export default app