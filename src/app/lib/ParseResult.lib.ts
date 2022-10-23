export const parseResults = (html: any) => {
    let mangas = [];
    html = html.replace(/(\r\n|\n|\r)/gm, "");
  
    // li tags
    let lis = html.match(
      new RegExp('<li> *<a href="/manga/.*?</div> *</a> *</li>', "gm")
    );
  
    interface mangas {
      name: any;
      author: any;
      description: any;
      link: any;
      id: any;
      chapters_count: any;
      image: any;
      score: any;
      categories?: any;
    }
  
    for (let li of lis) {
      let manga: mangas = {
        name: li.match(/(?<=series-title......).*?(?=<\/h1>)/gm)[0].trim(),
        author: li
          .match(/(?<=<span class="series-author">).*?(?=<\/span>)/gm)[0]
          .trim()
          .replace(/\<i.*<\/i>/gm, "")
          .replace(/(\ \ )*/gm, "")
          .replace(/&/, " & "),
        description: li
          .match(/(?<=<span class="series-desc">).*?(?=<\/span>)/gm)[0]
          .trim()
          .replace(/<(\/|)(br|a|b|span)(\/|)>/gm, "")
          .replace(/&nbsp;/gm, " "),
        link: li.match(/(?<=\<a href=\").*?(?=" )/gm)[0].trim(),
        id: li
          .match(/(?<=\<a href=\").*?(?=" )/gm)[0]
          .trim()
          .replace(/.*\//gm, ""),
        chapters_count: li
          .match(/(?<=number of chapters">).*?(?=<\/span>)/gm)[0]
          .trim(),
        image: li.match(/(?<=background-image: url\(\').*?(?=\')/gm)[0].trim(),
        score: li.match(/(?<=class="nota">)....(?=<\/span>)/gm)[0].trim(),
      };
      let categories = li.match(
        /(?<="touch-carousel-item.*<span class="nota">).*?(?=<\/span>)/gm
      );
      if (categories) {
        manga.categories = categories.map((genre: any) => {
          return genre;
        });
      }
      mangas.push(manga);
    }
    return mangas;
}
