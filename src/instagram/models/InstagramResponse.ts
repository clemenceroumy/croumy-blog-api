export default class InstagramResponse {
    constructor(copy: InstagramResponse) {
        this.data = new Data(copy.data);
    }

    data: Data;
}

class Data {
    constructor(copy: Data) {
        this.user = new User(copy.user);
    }

    user: User;
}

class User {
    constructor(copy: User) {
        this.edge_owner_to_timeline_media = new EdgeOwnerToTimelineMedia(copy.edge_owner_to_timeline_media);
    }

    edge_owner_to_timeline_media: EdgeOwnerToTimelineMedia;
}

class EdgeOwnerToTimelineMedia {
    constructor(copy: EdgeOwnerToTimelineMedia) {
        this.count = copy.count;
        this.page_info = new PageInfo(copy.page_info);
        this.edges = copy.edges.map(edge => new Edge(edge));
    }

    count: number;
    page_info: PageInfo;
    edges: Edge[];
}

class PageInfo {
    constructor(copy: PageInfo) {
        this.has_next_page = copy.has_next_page;
        this.end_cursor = copy.end_cursor;
    }

    has_next_page: boolean;
    end_cursor: string;
}

class Edge {
    constructor(copy: Edge) {
        this.node = new Node(copy.node);
    }

    node: Node;
}

class Node {
    constructor(copy: Node) {
        this.id = copy.id;
        this.taken_at_timestamp = copy.taken_at_timestamp;
        this.display_url = copy.display_url;
        this.edge_media_preview_like = copy.edge_media_preview_like;
    }

    id: string;
    taken_at_timestamp: number;
    display_url: string = '';
    edge_media_preview_like: { count: number } = {count: 0};

    get fileName(): string {
        return `${this.id}-${this.taken_at_timestamp}.jpg`
    }
}