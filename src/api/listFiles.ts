import { IssueApiProps } from '.';

export const listFiles = async ({ client, num, repo }: IssueApiProps) => {
  const files = await client.pulls.listFiles({
    ...repo,
    pull_number: num,
    per_page: 100,
  });
  return files.data.map((file) => file.filename);
};
