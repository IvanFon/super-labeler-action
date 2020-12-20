import { Utils } from '..'

export async function get(this: Utils, IDNumber: number) {
  return (
    await this.client.issues.get({
      ...this.repo,
      issue_number: IDNumber
    })
  ).data
}

export const comments = {
  async list(this: Utils, IDNumber: number) {
    return (
      await this.client.issues.listComments({
        ...this.repo,
        issue_number: IDNumber
      })
    ).data
  },
  async get(this: Utils, comment_id: number) {
    return (
      await this.client.issues.getComment({
        ...this.repo,
        comment_id
      })
    ).data
  },
  async create(this: Utils, IDNumber: number, body: string) {
    return (
      await this.client.issues.createComment({
        ...this.repo,
        issue_number: IDNumber,
        body
      })
    ).data
  },
  async update(this: Utils, comment_id: number, body: string) {
    return (
      await this.client.issues.updateComment({
        ...this.repo,
        comment_id,
        body
      })
    ).data
  },
  async delete(this: Utils, comment_id: number) {
    return (
      await this.client.issues.deleteComment({
        ...this.repo,
        comment_id
      })
    ).data
  }
}
