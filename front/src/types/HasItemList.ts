export interface Item {
  _id: string[];
  grade: string[];
  forwho: string[];
  category: string[];
  stat: {
    [key: string]: number;
  };
  skill: {
    [key: string]: number;
  };
  panalty: {
    [key: string]: number;
  };
  location: string[];
}
