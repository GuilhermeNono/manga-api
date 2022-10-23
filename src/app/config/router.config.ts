import MangaApp from '../components/mangas'

export default (app:any) => {
    const components = [MangaApp]
    components.forEach((component:any) => {
        component(app);
    })
}