import { Injectable } from '@angular/core';
import {
  DocumentData,
  Firestore,
  QuerySnapshot,
  collection,
  collectionData,
  getDocs,
  query,
  where,
} from '@angular/fire/firestore';
import { Item } from '../interfaces/item';
import { Observable } from 'rxjs';
const CATEGORY_FILTER = 'category';
const PRICE_FILTER = 'price';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private fs: Firestore) {}

  getItems(): Observable<Item[]> {
    const itemsRef = collection(this.fs, 'items');
    return collectionData(itemsRef, { idField: 'id' }) as Observable<Item[]>;
  }

  filterByPriceRange(filterFrom: string,filterTo: string): Promise<QuerySnapshot<DocumentData>> {
    const itemsRef = collection(this.fs, 'items');
    const q = query(itemsRef, where(PRICE_FILTER, '>=', filterFrom),where(PRICE_FILTER, '<=', filterTo));
    return getDocs(q);
  }

  filterByCategory(categorySelected: string): Promise<QuerySnapshot<DocumentData>> {
    const itemsRef = collection(this.fs, 'items');
    const q = query(itemsRef, where(CATEGORY_FILTER, '==', categorySelected));
    return getDocs(q);
  }
}
