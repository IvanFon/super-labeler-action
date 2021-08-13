import { Utils } from "..";
export declare const column: {
    list(this: Utils, project_id: number): Promise<import("@octokit/rest").Octokit.ProjectsListColumnsResponse>;
    get(this: Utils, column_id: number): Promise<import("@octokit/rest").Octokit.ProjectsGetColumnResponse>;
    listCards(this: Utils, column_id: number): Promise<import("@octokit/rest").Octokit.ProjectsListCardsResponse>;
};
export declare const card: {
    get(this: Utils, card_id: number): Promise<import("@octokit/rest").Octokit.ProjectsGetCardResponse>;
    create(this: Utils, content_id: number, column_id: number, content_type?: "Issue" | "PullRequest" | undefined): Promise<import("@octokit/rest").Octokit.ProjectsCreateCardResponse>;
    move(this: Utils, card_id: number, column_id: number): Promise<import("@octokit/rest").Octokit.AnyResponse>;
};
export declare const projects: {
    get(this: Utils, project_id: number): Promise<import("@octokit/rest").Octokit.ProjectsGetResponse>;
    org(this: Utils, org: string): Promise<import("@octokit/rest").Octokit.ProjectsListForOrgResponse>;
    user(this: Utils, username: string): Promise<import("@octokit/rest").Octokit.ProjectsListForUserResponse>;
    repo(this: Utils, owner: string, repository: string): Promise<import("@octokit/rest").Octokit.ProjectsListForRepoResponse>;
};
//# sourceMappingURL=project.d.ts.map