export type CategoriesListItem = string;
export type SortListItem = { name: string; sortType: string };
export type TypeNameItem = string;
export type SizePriceItem = { size: number; plus: number };

export interface FiltersSliceInitialState {
  activeCategory: number;
  sortModalValue: SortListItem;
  currentPage: number;
  searchValue: string;
  searchValueLocal: string;
  activeSize: number;
  activePlusPrice: number;
  activeType: number[];
}
