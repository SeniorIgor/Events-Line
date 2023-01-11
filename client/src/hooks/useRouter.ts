import { NextRouter, useRouter as useNextRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';

type BaseQuery = NextRouter['query'];

interface TypedNextRouter<T extends ParsedUrlQuery = BaseQuery> extends Omit<NextRouter, 'query'> {
  query: Partial<T>;
}

export const useRouter = <T extends ParsedUrlQuery = BaseQuery>(): TypedNextRouter<T> =>
  useNextRouter() as TypedNextRouter<T>;
