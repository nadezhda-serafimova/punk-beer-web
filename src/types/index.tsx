export type BeerProps = {
  id: number;
  name: string;
  description: string;
  image_url: string;
  isOutdated?: boolean;
}

export enum BeerCardType {
  Home,
  Fav,
  Random,
}
