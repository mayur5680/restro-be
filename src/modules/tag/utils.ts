import { Like } from 'typeorm';
import { GygQueryOptions } from './types';
import { object as dotToObject } from 'dot-object';

export function getSortFieldAndDir(options: GygQueryOptions, defaultSorting) {
  if (!options?.sortBy) {
    return defaultSorting;
  }

  const sortDir = options.sortBy?.[0] === '-' ? 'DESC' : 'ASC';
  const sortField =
    options?.sortBy?.[0] === '-'
      ? options?.sortBy?.substring(1)
      : options?.sortBy;

  let uSortField: object;

  // If nested sorting
  if (options?.sortBy?.includes('.')) {
    uSortField = dotToObject({ [sortField]: sortDir });
  } else {
    uSortField = { [sortField]: sortDir };
  }

  return uSortField;
}

export function getFilteredWhere(options: GygQueryOptions) {
  let where = {};
  if (!options.filters) {
    return where;
  }

  for (const [key, value] of Object.entries(options.filters)) {
    let uWhere;
    if (key.includes('.')) {
      uWhere = dotToObject({ [key]: Like(`%${value}%`) });
    } else {
      uWhere = { [key]: Like(`%${value}%`) };
    }
    where = { ...where, ...uWhere };
  }

  return where;
}
