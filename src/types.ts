export type SwipeCardProps = {
  id: string;
  name: string;
  image?: string;
  description?: string;
  status: Status;
};

export type Status = "undecided" | "yes" | "no";
