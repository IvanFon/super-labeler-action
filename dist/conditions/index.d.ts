export { log } from "../";
export * from "./issue";
export * from "./pr";
export * from "./project";
export * from "./schedule";
export * from "./util";
import { Labels } from "../../types";
import { Issues, Project, PullRequests, Schedule } from "../contexts";
export declare type CurContext = {
    type: "pr";
    context: PRContext;
} | {
    type: "issue";
    context: IssueContext;
} | {
    type: "project";
    context: ProjectContext;
} | {
    type: "schedule";
    context: ScheduleContext;
};
export interface PRContext extends GeneralContext {
    currentVersion: Version;
    IDNumber: number;
    props: PRProps;
}
export interface IssueContext extends GeneralContext {
    currentVersion: Version;
    IDNumber: number;
    props: IssueProps;
}
export interface ProjectContext extends GeneralContext {
    currentVersion: Version;
    IDNumber: number;
    props: ProjectProps;
}
export interface ScheduleContext extends GeneralContext {
    props?: ScheduleProps;
}
interface GeneralContext {
    ref?: string;
    sha: string;
    action: string;
}
interface Props {
    creator: string;
    description: string;
    locked: boolean;
    state: "open" | "closed";
    title: string;
    labels?: Labels;
    ID: number;
    type: "issue" | "pr" | "project";
    lastUpdated?: string;
}
export interface PRProps extends Props {
    branch: string;
    isDraft: boolean;
    files: string[];
    reviews: Reviews;
    pendingReview: boolean;
    requestedChanges: number;
    approved: number;
    changes: number;
}
export interface IssueProps extends Props {
}
export interface ProjectProps extends Props {
    project: any;
    column_id: number;
    localCard: localCard;
    localColumn: localColumn;
    changes: {
        column_id: {
            from: number;
        };
    };
}
export interface ScheduleProps extends Props {
}
export interface Version {
    name?: string;
    semantic?: {
        major: number;
        minor: number;
        patch: number;
        prerelease?: string;
        build?: number;
    };
}
export declare type Reviews = Review[];
export interface Review {
    id?: number;
    node_id?: string;
    user?: any;
    body?: string;
    state?: "APPROVED" | "" | string;
    html_url?: string;
    pull_request_url?: string;
    author_association?: string;
    _links?: {};
    submitted_at?: string;
    commit_id?: string;
}
interface localCard {
    archived: boolean;
    column_url: string;
    content_url: string;
    created_at: string;
    creator: any;
    id: number;
    node_id: string;
    note: string;
    project_url: string;
    updated_at: string;
    url: string;
}
interface localColumn {
    name: any;
    cards_url: string;
    created_at: string;
    id: number;
    node_id: string;
    project_url: string;
    updated_at: string;
    url: string;
}
export declare type UtilThis = Issues | PullRequests | Project | Schedule;
export declare type UtilProps = IssueProps | PRProps | ProjectProps | ScheduleProps;
//# sourceMappingURL=index.d.ts.map