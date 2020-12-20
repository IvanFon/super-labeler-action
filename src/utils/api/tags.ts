import { Tags, Utils } from '..'

export async function get(this: Utils): Promise<Tags> {
  const options = await this.client.repos.listTags({
    ...this.repo
  })
  const tags = await this.client.paginate(options)
  return tags.map(tag => tag.name)
}
