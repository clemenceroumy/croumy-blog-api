import MangaDatabaseResponse, {MangaDatabaseProperties} from "./MangaDatabaseResponse";

export default class Manga {
    illustration: string;
    title: string;
    authors: string[];
    completedYear: string;

    constructor(data: MangaDatabaseProperties) {
        this.illustration = data.picture.files[0]?.name;
        this.title = data.nom.title[0]?.text.content;
        this.authors = data.auteurs.multi_select.map(author => author.name);
        this.completedYear = data.completed.select?.name;
    }
}