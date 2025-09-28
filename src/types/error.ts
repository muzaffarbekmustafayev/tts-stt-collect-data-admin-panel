export type ErrorResponse = {
  detail: ErrorDetailResponse[];
}

export type ErrorDetailResponse = {
  type: string;
  msg: string;
  loc: string[];
}