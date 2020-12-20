import { Issues, Project, PullRequests } from '../contexts'

export function respond(
  this: Issues | PullRequests | Project,
  success: boolean,
  previousComment?: number,
  body?: string
) {
  if (!previousComment && !success) {
    if (this.curContext.type == 'pr')
      this.util.api.pullRequests.reviews.create(
        this.curContext.context.IDNumber,
        body,
        'REQUEST_CHANGES'
      )
    else
      this.util.api.issues.comments.create(
        this.curContext.context.IDNumber,
        body as string
      )
  } else if (previousComment && !success) {
    if (this.curContext.type == 'pr')
      this.util.api.pullRequests.reviews.update(
        this.curContext.context.IDNumber,
        previousComment,
        body as string
      )
    else this.util.api.issues.comments.update(previousComment, body as string)
  } else if (previousComment && success) {
    if (this.curContext.type == 'pr')
      this.util.api.pullRequests.reviews.dismiss(
        this.curContext.context.IDNumber,
        previousComment,
        'Conventions corrected - Review no longer required'
      )
    else this.util.api.issues.comments.delete(previousComment)
  } else if (!success) {
    if (this.curContext.type == 'pr')
      this.util.api.pullRequests.reviews.create(
        this.curContext.context.IDNumber,
        body,
        'REQUEST_CHANGES'
      )
    else
      this.util.api.issues.comments.create(
        this.curContext.context.IDNumber,
        body as string
      )
  }
}
