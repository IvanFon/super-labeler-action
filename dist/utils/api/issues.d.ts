import { Utils } from "..";
export declare function get(this: Utils, IDNumber: number): Promise<import("@octokit/rest").Octokit.IssuesGetResponse>;
export declare function list(this: Utils, { state, sort, direction, page }: {
    state?: "open" | "closed" | "all";
    sort?: "created" | "updated" | "comments";
    direction?: "asc" | "desc";
    page?: number;
}): Promise<import("@octokit/rest").Octokit.IssuesListForRepoResponse>;
export declare const comments: {
    list(this: Utils, IDNumber: number): Promise<import("@octokit/rest").Octokit.IssuesListCommentsResponse>;
    get(this: Utils, comment_id: number): Promise<import("@octokit/rest").Octokit.IssuesGetCommentResponse>;
    create(this: Utils, IDNumber: number, body: string): Promise<import("@octokit/rest").Octokit.IssuesCreateCommentResponse>;
    update(this: Utils, comment_id: number, body: string): Promise<import("@octokit/rest").Octokit.IssuesUpdateCommentResponse>;
    delete(this: Utils, comment_id: number): Promise<any>;
};
//# sourceMappingURL=issues.d.ts.map