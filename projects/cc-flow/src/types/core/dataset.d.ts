import type { SearchDataResponseItemType } from '@fastgpt/global/core/dataset/api';

export type SearchTestItemType = SearchDataResponseItemType & {
  score: { type: string; value: number; index: number }[];
};
