export interface JiraIssue {
  expand: string;
  fields: {};
  id: string;
  key: string;
  self: string;
}

export interface JiraIssueListResponse {
  expand: string;
  maxResults: number;
  startAt: number;
  total: number;
  issues: JiraIssue[];
}
