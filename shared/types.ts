export type ParamsType = {
  params: { id: string };
};

export type GenericObject = Record<string, any>;

export type PaginationInfo = {
  dataCount: number;
  skip: number;
  take?: number;
  limit?: number;
};
