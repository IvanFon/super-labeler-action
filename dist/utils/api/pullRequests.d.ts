import { Event, Utils } from "..";
import { Reviews } from "../../conditions";
export declare function list(this: Utils, IDNumber: number): Promise<string[]>;
export declare function changes(Additions: number, deletions: number): Promise<number>;
export declare const reviews: {
    create(this: Utils, IDNumber: number, body?: string | undefined, event?: Event | undefined, comments?: any): Promise<import("@octokit/rest").Octokit.PullsCreateReviewResponse>;
    update(this: Utils, IDNumber: number, review_id: number, body: string): Promise<import("@octokit/rest").Octokit.PullsUpdateReviewResponse>;
    dismiss(this: Utils, IDNumber: number, review_id: number, message: string): Promise<import("@octokit/rest").Octokit.PullsDismissReviewResponse>;
    list(this: Utils, IDNumber: number): Promise<import("@octokit/rest").Octokit.PullsListReviewsResponse>;
    pending(reviews: number, requested_reviews: number): Promise<boolean>;
    requestedChanges(reviews: Reviews): Promise<number>;
    isApproved(reviews: Reviews): Promise<number>;
};
//# sourceMappingURL=pullRequests.d.ts.map