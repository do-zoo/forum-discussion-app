export interface Thread {
  id: string;
  title: string;
  body: string;
  category: string;
  createdAt: string;
  ownerId: string;
  upVotesBy: any[];
  downVotesBy: any[];
  totalComments: number;
}
