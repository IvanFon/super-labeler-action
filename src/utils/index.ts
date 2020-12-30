import * as github from '@actions/github'
import { Config, Label, Labels, Runners } from '../../types'
import { Reviews } from '../conditions'
import { Issues, Project, PullRequests } from '../contexts/'
import * as APIFiles from './api/files'
import * as APIIssues from './api/issues'
import * as APILabels from './api/labels'
import * as APIProject from './api/project'
import * as APIPullRequests from './api/pullRequests'
import * as APITag from './api/tags'
import * as UtilLabels from './labels'
import * as UtilParsingData from './parsingData'
import * as UtilRespond from './respond'
import * as UtilVersioning from './versioning'

export class Utils {
  client: github.GitHub
  repo: Repo
  dryRun: boolean
  skipDelete: boolean
  constructor(props: ApiProps, options: { dryRun: boolean, skipDelete: boolean }) {
    this.client = props.client
    this.repo = props.repo
    this.dryRun = options.dryRun
    this.skipDelete = options.skipDelete
  }
  api = {
    files: {
      get: (file: string, ref?: string) => APIFiles.get.call(this, file, ref),
      list: (IDNumber: number) => APIFiles.list.call(this, IDNumber)
    },
    issues: {
      get: (IDNumber: number) => APIIssues.get.call(this, IDNumber),
      comments: {
        list: (IDNumber: number) =>
          APIIssues.comments.list.call(this, IDNumber),
        get: (IDNumber: number) => APIIssues.comments.get.call(this, IDNumber),
        create: (IDNumber: number, body: string) =>
          APIIssues.comments.create.call(this, IDNumber, body),
        update: (comment_id: number, body: string) =>
          APIIssues.comments.update.call(this, comment_id, body),
        delete: (comment_id: number) =>
          APIIssues.comments.delete.call(this, comment_id)
      }
    },
    labels: {
      add: (IDNumber: number, label: string) =>
        APILabels.add.call(this, IDNumber, label),
      create: (label: Label) => APILabels.create.call(this, label),
      del: (name: string) => APILabels.del.call(this, name),
      get: () => APILabels.get.call(this),
      remove: (IDNumber: number, label: string) =>
        APILabels.remove.call(this, IDNumber, label),
      update: (label: Label) => APILabels.update.call(this, label)
    },
    project: {
      column: {
        list: (project_id: number) =>
          APIProject.column.list.call(this, project_id),
        get: (column_id: number) => APIProject.column.get.call(this, column_id),
        listCards: (column_id: number) =>
          APIProject.column.listCards.call(this, column_id)
      },
      card: {
        get: (card_id: number) => APIProject.card.get.call(this, card_id),
        create: (
          content_id: number,
          column_id: number,
          content_type?: 'Issue' | 'PullRequest'
        ) =>
          APIProject.card.create.call(
            this,
            content_id,
            column_id,
            content_type
          ),
        move: (card_id: number, column_id: number) =>
          APIProject.card.move.call(this, card_id, column_id)
      },
      projects: {
        get: (project_id: number) =>
          APIProject.projects.get.call(this, project_id),
        org: (org: string) => APIProject.projects.org.call(this, org),
        user: (user: string) => APIProject.projects.user.call(this, user),
        repo: (owner: string, repo: string) =>
          APIProject.projects.repo.call(this, owner, repo)
      }
    },
    pullRequests: {
      list: (IDNumber: number) => APIPullRequests.list.call(this, IDNumber),
      changes: (additions: number, deletions: number) =>
        APIPullRequests.changes(additions, deletions),
      reviews: {
        create: (
          IDNumber: number,
          body?: string,
          event?: Event,
          comments?: any
        ) =>
          APIPullRequests.reviews.create.call(
            this,
            IDNumber,
            body,
            event,
            comments
          ),
        update: (IDNumber: number, review_id: number, body: string) =>
          APIPullRequests.reviews.update.call(this, IDNumber, review_id, body),
        dismiss: (IDNumber: number, review_id: number, message: string) =>
          APIPullRequests.reviews.dismiss.call(
            this,
            IDNumber,
            review_id,
            message
          ),
        list: (IDNumber: number) =>
          APIPullRequests.reviews.list.call(this, IDNumber),
        requestedChanges: (reviews: Reviews) =>
          APIPullRequests.reviews.requestedChanges.call(this, reviews),
        isApproved: (reviews: Reviews) =>
          APIPullRequests.reviews.isApproved(reviews),
        pending: (reviews: number, requested_reviews: number) =>
          APIPullRequests.reviews.pending(reviews, requested_reviews)
      }
    },
    tags: {
      get: () => APITag.get.call(this)
    }
  }
  labels = {
    sync: (config: Runners['labels']) => UtilLabels.sync.call(this, config),
    addRemove: (
      labelID: string,
      labelName: string,
      IDNumber: number,
      hasLabel: boolean,
      shouldHaveLabel: boolean,
      curLabels?: Labels
    ) =>
      UtilLabels.addRemove.call(
        this,
        curLabels,
        labelID,
        labelName,
        IDNumber,
        hasLabel,
        shouldHaveLabel
      )
  }
  parsingData = {
    formatColor: (color: string) => UtilParsingData.formatColor(color),
    processRegExpPattern: (pattern: string) =>
      UtilParsingData.processRegExpPattern(pattern),
    normalize: (text: string) => UtilParsingData.normalize(text)
  }
  respond = (
    that: Issues | PullRequests | Project,
    success: boolean,
    previousComment?: number,
    body?: string
  ) => UtilRespond.respond.call(that, success, previousComment, body)
  versioning = {
    parse: (config: Config, ref?: string) =>
      UtilVersioning.parse.call(this, config, ref)
  }
}
export interface Repo {
  owner: string
  repo: string
}
export interface ApiProps {
  client: github.GitHub
  repo: Repo
}

export type Event = 'REQUEST_CHANGES' | 'APPROVE' | 'COMMENT'
export type Tags = string[]
