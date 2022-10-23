export interface MangaInfoChapter {
    chapter_number: string;
    images: never[];
    next_chapter: {
        number: string;
        release_id: string;
    };
}

export interface MangaPages {
    idSerie: any,
    urlName: string,
    name: string,
    chapters: [{
        chapter_name: string,
        number: number,
        date: string,
        id_release: number
    }]
}

export interface MangaInfo {
    id:string;
    name:string;
    link:string;
    author:string;
    description:string;
    chapters_count:string;
    image:string;
    score:string;
    categories?:[]
}