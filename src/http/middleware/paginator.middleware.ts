import { Request } from "express";
import { SelectQueryBuilder } from "typeorm/query-builder/SelectQueryBuilder";

export interface PaginationInfo {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  pages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export class Paginator {
  static async paginate(queryBuilder: SelectQueryBuilder<any>, req: Request) {
    if (!queryBuilder || !(queryBuilder instanceof SelectQueryBuilder)) {
      return { records: [], paginationInfo: null };
    }

    let page = Number(req.query.page) || 1;
    let pageSize = Number(req.query.pageSize) || 10;

    // The form for search through pages is the next:
    // ?pageSize=5&page=2

    const offset = (page - 1) * pageSize;

    const recordsPromise = await queryBuilder
      .skip(offset)
      .take(pageSize)
      .getMany();
    const totalItemsPromise = await queryBuilder.getCount();

    const [records, totalItems] = await Promise.all([
      recordsPromise,
      totalItemsPromise,
    ]);

    const pages = Math.ceil(totalItems / pageSize);
    const currentPage = offset / pageSize + 1;
    const hasNext = currentPage < pages;
    const hasPrevious = currentPage > 1;

    const paginationInfo: PaginationInfo = {
      currentPage: page,
      pageSize: pageSize,
      totalItems,
      pages,
      hasNext,
      hasPrevious,
    };
    return { records, paginationInfo };
  }
}
