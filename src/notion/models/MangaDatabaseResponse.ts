export default class MangaDatabaseResponse {
    results: MangaDatabaseResult[];
    has_more: boolean;
    next_cursor: string;
}

export class MangaDatabaseResult {
    id: string;
    properties: MangaDatabaseProperties;
}

export class MangaDatabaseProperties {
    picture: {files: {name: string}[]};
    completed: {select: {name: string}};
    auteurs: {multi_select: {name: string}[]};
    nom: {title: {text: {content: string}}[]};
    status: {select: {id: string}};
}