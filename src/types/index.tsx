export type BeerProps = {
  id: number;
  name: string;
  description: string;
  image_url: string;
}

export enum BeerCardType {
  Home,
  Fav,
  Random,
}
