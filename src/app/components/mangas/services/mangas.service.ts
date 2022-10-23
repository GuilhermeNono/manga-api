import axios, { AxiosRequestConfig } from "axios";
import qs from "qs";
import { MangaInfo, MangaInfoChapter, MangaPages } from "../../../@types/Manga";
import { parseManga } from "../../../lib/ParseManga.lib";
import { parseResults } from "../../../lib/ParseResult.lib";

const search = async (mangaName: string) => {
  const data = qs.stringify({
    search: `${mangaName}`,
  });
  const config:AxiosRequestConfig = {
    method: "post",
    url: "https://mangalivre.net/lib/search/series.json",
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: data,
  };

  try {
    const response = await axios(config);
    return JSON.parse(JSON.stringify(response.data));
  } catch (error) {
    return console.log(error);
  }
};

const getTop = async (page:number) => {
    const config:AxiosRequestConfig = {
        method: "post",
        url: `https://mangalivre.net/series/index/nota?page=${page}`,
      };
    
      const response = await axios(config);

      return parseResults(response.data);
}

const getPages = async (id:string) => {
    const return_data:MangaInfoChapter = {"chapter_number": "", "images": [], "next_chapter": {"number":"", "release_id":""}};

    const identifier = await getIdentifier(return_data, id);

    return await (async () => {
        try {
            let response = await axios({url:`https://mangalivre.net/leitor/pages/${id}.json?key=${identifier}`});
            return_data.images = response.data
        } catch (error) {
            console.log(error);
        }
        return return_data;
    })();
}

const getChapters = async (id:string, page:string) => {

    var return_data:MangaPages = {chapters:[{chapter_name:"", date:"", id_release:0, number:0}], idSerie: "", name: "", urlName:""};

    const config:AxiosRequestConfig = {
        url:`https://mangalivre.net/series/chapters_list.json?page=${page}&id_serie=${id}`,
        headers:{
            "X-Requested-With": "XMLHttpRequest",
            "Content-Type": "application/x-www-form-urlencoded",
        }
    }

    return await getMangaChapters(return_data, config);
}

const getMangaById = async (id:string) => {

    let return_data;
    
        try {
            const response = await axios({url:`https://mangalivre.net/manga/null/${id}`});
            return_data = parseManga(response.data, id);
        } catch (error) {
            console.error(error);
        }

        return return_data;

}

const getIdentifier = async (return_data:MangaInfoChapter, mangaId:string) => {
        try {
            let response = await axios({url:`https://mangalivre.net/ler/null/online/${mangaId}/capitulo-0/`});
            return_data.chapter_number = response.data.match(/(?<=var number = ").*(?=";)/gm)[0].trim();
            let chapters = JSON.parse(response.data.match(/(?<=chapters = ).*?(?=;)/gm)[0].trim()).reverse();
            for (const chapter of chapters) {
                let chapter_index = chapters.indexOf(chapter);
                if(chapter.number == return_data.chapter_number && chapter_index < chapters.length - 1){
                    let next_chapter = chapters[chapter_index + 1];
                    return_data.next_chapter.number = next_chapter.number;
                    return_data.next_chapter.release_id = next_chapter.id_release;
                }
            }
            // retornando identifier
            return response.data.match(/(?<=this\.page\.identifier =\ \").*?(?=\";)/)[0];
        } catch (error) {
            console.log(error);
        }
}

const getMangaChapters = async (return_data:MangaPages, config:AxiosRequestConfig):Promise<MangaPages> => {
    let response;

    try {

        response = await axios(config);

        response = response.data;

        if (response.chapters) {
            return_data.idSerie = response.chapters[0].id_serie;
            return_data.urlName = response.chapters[0].releases[Object.keys(response.chapters[0].releases)[0]].link.match(/(?<=ler\/).*?(?=\/)/)[0];
            return_data.name = response.chapters[0].name;

            for (let chapter of response.chapters) {
                return_data.chapters.push({
                    chapter_name: chapter.chapter_name,
                    number: chapter.number,
                    date: chapter.date,
                    id_release: chapter.releases[Object.keys(chapter.releases)[0]].id_release
                });
            }

            return_data.chapters.reverse()
        }
    } catch (error) {
        console.error(error);
    }

    return return_data;
}

export default {
  search,
  getTop,
  getPages,
  getChapters,
  getMangaById
};
