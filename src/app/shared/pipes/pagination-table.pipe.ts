import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'filterFundsData' })
export class PaginationTablePipe implements PipeTransform {
  transform(items: any): any {
    if (!items) {
      return items;
    }
    return items.slice(0, 5);
  }
}
