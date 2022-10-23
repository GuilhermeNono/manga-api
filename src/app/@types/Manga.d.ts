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
    id:any;
    name:any;
    link:any;
    author:any;
    description:any;
    chapters_count:any;
    image:any;
    score:any;
    categories?:[]
}