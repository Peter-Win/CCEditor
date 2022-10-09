export interface CompoundItem {
  id: number;
  name: string;
  lang: string;
}

export interface AskCompounds {
  query: string;
  list: CompoundItem[];
}
