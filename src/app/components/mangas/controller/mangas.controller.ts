import MangaService from '../services/mangas.service';

const searchManga = async (mangaName:string) => {

    return await MangaService.search(mangaName);

}

const getTop = async (pageNumber:number) => {

    return await MangaService.getTop(pageNumber);

}

const getPages = async (id:string) => {

    return await MangaService.getPages(id)

}

const getChapters = async (id:string, page:string) => {

    return await MangaService.getChapters(id, page);

}

const getMangaById = async (id:string) => {

    return await MangaService.getMangaById(id);

}

export default {
    searchManga,
    getTop,
    getPages,
    getChapters,
    getMangaById
}