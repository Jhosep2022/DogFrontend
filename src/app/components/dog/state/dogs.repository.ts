import{ Injectable }  from '@angular/core';
import { createStore } from '@ngneat/elf';
import { addEntities, withEntities} from '@ngneat/elf-entities';
import {
  PaginationData,
  selectCurrentPage,
  selectCurrentPageEntities,
  selectPaginationData,
  setCurrentPage,
  setPage,
  updatePaginationData,
  withPagination,
} from '@ngneat/elf-pagination';

interface Dog{
  id: number;
  message: string;
  status: string;
}


const store = createStore(
  { name: 'dogs'},
  withEntities<Dog>(),
  withPagination(),
);


@Injectable({ providedIn: 'root'})
export class DogsRepository {
  activePage$ = store.pipe(selectCurrentPage());
  paginationData$ = store.pipe(selectPaginationData());
  activePageDogs$ = store.pipe(selectCurrentPageEntities());

  setActivePage(page: number) {
    store.update(setCurrentPage(page));
  }

  addDogs(page: number, dogs: PaginationData & { data: Dog[] }) {
    const { data, ...paginationData } = dogs;

    store.update(addEntities(data));
    store.update(updatePaginationData(paginationData));
    store.update(setPage(page, data.map((d) => d.id)));
  }

  get store(){
    return store;
  }
}
