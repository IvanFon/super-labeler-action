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
        this.curContext.context.props.ID,
        body,
        'REQUEST_CHANGES'
      )
    else
      this.util.api.issues.comments.create(
        this.curContext.context.props.ID,
        body as string
      )
  } else if (previousComment && !success) {
    if (this.curContext.type == 'pr')
      this.util.api.pullRequests.reviews.update(
        this.curContext.context.props.ID,
        previousComment,
        body as string
      )
    else this.util.api.issues.comments.update(previousComment, body as string)
  } else if (previousComment && success) {
    if (this.curContext.type == 'pr')
      this.util.api.pullRequests.reviews.dismiss(
        this.curContext.context.props.ID,
        previousComment,
        'Conventions corrected - Review no longer required'
      )
    else this.util.api.issues.comments.delete(previousComment)
  } else if (!success) {
    if (this.curContext.type == 'pr')
      this.util.api.pullRequests.reviews.create(
        this.curContext.context.props.ID,
        body,
        'REQUEST_CHANGES'
      )
    else
      this.util.api.issues.comments.create(
        this.curContext.context.props.ID,
        body as string
      )
  }
}
