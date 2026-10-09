interface RouteType {
  source: string;
  target: string;
  auth: boolean;
  scope?: string;
}
interface TokenType {
  scope: string;
  sub: number;
  exp: number;
  iss: string;
  user: {
    userId: number;
  };
}

interface TqmsTokenType {
  userId: string;
  date: Date;
}

export { RouteType, TokenType, TqmsTokenType };
