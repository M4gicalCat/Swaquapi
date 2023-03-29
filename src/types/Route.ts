export type Route = {
  method: 'get' | 'post' | 'put' | 'delete';
  url: string;
  middlewares?: ((req: any, res: any, next: () => void) => void)[];
  handler: (req: any, res: any) => void;
};
