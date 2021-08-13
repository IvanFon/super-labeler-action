import * as github from "@actions/github";
import { Config, Label, Runners } from "../../types";
import { Reviews, UtilThis } from "../conditions";
export declare class Utils {
    client: github.GitHub;
    repo: Repo;
    dryRun: boolean;
    skipDelete: boolean;
    constructor(props: ApiProps, options: {
        dryRun: boolean;
        skipDelete: boolean;
    });
    api: {
        files: {
            get: (file: string, ref?: string | undefined) => Promise<string>;
            list: (IDNumber: number) => Promise<string[]>;
        };
        issues: {
            get: (IDNumber: number) => Promise<import("@octokit/rest").Octokit.IssuesGetResponse>;
            list: ({ state, sort, direction }: {
                state?: "open" | "closed" | "all" | undefined;
                sort?: "created" | "updated" | "comments" | undefined;
                direction?: "asc" | "desc" | undefined;
            }) => Promise<import("@octokit/rest").Octokit.IssuesListForRepoResponse>;
            comments: {
                list: (IDNumber: number) => Promise<import("@octokit/rest").Octokit.IssuesListCommentsResponse>;
                get: (IDNumber: number) => Promise<import("@octokit/rest").Octokit.IssuesGetCommentResponse>;
                create: (IDNumber: number, body: string) => Promise<import("@octokit/rest").Octokit.IssuesCreateCommentResponse>;
                update: (comment_id: number, body: string) => Promise<import("@octokit/rest").Octokit.IssuesUpdateCommentResponse>;
                delete: (comment_id: number) => Promise<any>;
            };
        };
        labels: {
            add: (IDNumber: number, label: string) => Promise<void>;
            create: (label: Label) => Promise<void>;
            del: (name: string) => Promise<void>;
            get: () => Promise<import("../../types").Labels>;
            remove: (IDNumber: number, label: string) => Promise<void>;
            update: (current_name: string, label: Label) => Promise<void>;
        };
        project: {
            column: {
                list: (project_id: number) => Promise<import("@octokit/rest").Octokit.ProjectsListColumnsResponse>;
                get: (column_id: number) => Promise<import("@octokit/rest").Octokit.ProjectsGetColumnResponse>;
                listCards: (column_id: number) => Promise<import("@octokit/rest").Octokit.ProjectsListCardsResponse>;
            };
            card: {
                get: (card_id: number) => Promise<import("@octokit/rest").Octokit.ProjectsGetCardResponse>;
                create: (content_id: number, column_id: number, content_type?: "Issue" | "PullRequest" | undefined) => Promise<import("@octokit/rest").Octokit.ProjectsCreateCardResponse>;
                move: (card_id: number, column_id: number) => Promise<import("@octokit/rest").Octokit.AnyResponse>;
            };
            projects: {
                get: (project_id: number) => Promise<import("@octokit/rest").Octokit.ProjectsGetResponse>;
                org: (org: string) => Promise<import("@octokit/rest").Octokit.ProjectsListForOrgResponse>;
                user: (user: string) => Promise<import("@octokit/rest").Octokit.ProjectsListForUserResponse>;
                repo: (owner: string, repo: string) => Promise<import("@octokit/rest").Octokit.ProjectsListForRepoResponse>;
            };
        };
        pullRequests: {
            list: (IDNumber: number) => Promise<string[]>;
            changes: (additions: number, deletions: number) => Promise<number>;
            reviews: {
                create: (IDNumber: number, body?: string | undefined, event?: Event | undefined, comments?: any) => Promise<import("@octokit/rest").Octokit.PullsCreateReviewResponse>;
                update: (IDNumber: number, review_id: number, body: string) => Promise<import("@octokit/rest").Octokit.PullsUpdateReviewResponse>;
                dismiss: (IDNumber: number, review_id: number, message: string) => Promise<import("@octokit/rest").Octokit.PullsDismissReviewResponse>;
                list: (IDNumber: number) => Promise<import("@octokit/rest").Octokit.PullsListReviewsResponse>;
                requestedChanges: (reviews: Reviews) => Promise<number>;
                isApproved: (reviews: Reviews) => Promise<number>;
                pending: (reviews: number, requested_reviews: number) => Promise<boolean>;
            };
        };
        tags: {
            get: () => Promise<Tags>;
        };
    };
    labels: {
        sync: (config: Runners["labels"]) => Promise<void>;
        addRemove: (labelName: string, IDNumber: number, hasLabel: boolean, shouldHaveLabel: boolean) => Promise<void>;
    };
    parsingData: {
        formatColor: (color: string) => string;
        processRegExpPattern: (pattern: string) => RegExp;
        normalize: (text: string) => string;
        labels: (labels: any) => Promise<import("../../types").Labels | undefined>;
    };
    respond: (that: UtilThis, success: boolean, previousComment?: number | undefined, body?: string | undefined) => void;
    versioning: {
        parse: (config: Config, ref?: string | undefined) => Promise<import("../conditions").Version>;
    };
    shouldRun: (type: functionality) => boolean;
}
export interface Repo {
    owner: string;
    repo: string;
}
export interface ApiProps {
    client: github.GitHub;
    repo: Repo;
}
export declare type functionality = "release" | "convention" | "label";
export declare type packages = "@videndum/release-mastermind" | "@videndum/label-mastermind" | "@videndum/convention-mastermind" | undefined;
export declare type Event = "REQUEST_CHANGES" | "APPROVE" | "COMMENT";
export declare type Tags = string[];
//# sourceMappingURL=index.d.ts.map