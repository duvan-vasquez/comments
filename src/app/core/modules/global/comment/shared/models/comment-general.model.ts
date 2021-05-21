export class CommentGeneral {
    id: number = 0;
    article_id?: number = 0;
    content?: string = '';
    name?: string = '';
    email?: string = '';
    website?: string = '';
    dates?: object = {
        created: '',
        updated: ''
    }
}