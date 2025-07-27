export interface Page<T> {
  items: T[];
  currentPage: number;
  hasNextPage: boolean;
}
