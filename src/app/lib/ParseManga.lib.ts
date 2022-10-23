import { MangaInfo } from "../@types/Manga";

export const parseManga = (html:any, id:string) => {
    let manga:any = {};
    html = html.replace(/(\r\n|\n|\r)/gm, "");
    let series_desc_div = html.match(/(<div id="series-desc").*(?=<div id="chapter-list")/gm)[0].trim();

    manga.name = series_desc_div.match(/(?<=series-info touchcarousel.*<h1>).*?(?=<\/h1>)/gm).slice(-1)[0].trim();
    manga.id = id;
    manga.link = "https://mangalivre.net/manga/id/"+id;
    manga.author = series_desc_div.match(/(?<=id="series-data".*?<span class="series-author">).*?(?=<\/span)/gm).slice(-1)[0].trim().replace(/<i.*?<\/i>/gm, "").replace(/<a.*<\/a>/gm, "").trim();
    manga.description = series_desc_div.match(/(?<=<span class="series-desc">.*?span>).*?(?=<\/span>.*?<ol)/gm)[0].trim().replace(/<br>/gm, "").trim().replace(/<(\/|)(br|a|b|span)(\/|)>/gm, "").replace(/&nbsp;/gm, " ");;
    manga.chapters_count = html.match(/(?<=id="chapter-list".*layout\/number-chapters.*?<span>).*?(?=<\/span>)/gm)[0].trim();
    manga.image = series_desc_div.match(/(https?:\/\/[^\s]+)/g)[1].slice(0, -1);
    manga.score = series_desc_div.match(/(?<=<div class="score-number">).*?(?=<\/div>)/gm)[0].trim();
    let categories = series_desc_div.match(/(?<=ul class="tags touchcarousel-container".*?Categoria de mangás: ).*?(?=")/gm);
    if (categories) {
        manga.categories = categories.map((genre:any) => {
            return genre;
        });
    }
    
    return manga;
} 