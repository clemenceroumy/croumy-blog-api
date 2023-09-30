export default class InstagramResponse {
    data: Data
}

class Data {
    user: User
}

class User {
    edge_owner_to_timeline_media: EdgeOwnerToTimelineMedia
}

class EdgeOwnerToTimelineMedia {
    count: number = 0
    page_info: PageInfo
    edges: Edge[]
}

class PageInfo {
    has_next_page: boolean = false;
    end_cursor: string = '';
}

class Edge {
    node: Node
}

class Node {
    id: string;
    display_url: string = '';
    edge_liked_by: { count: number } = {count: 0};
}