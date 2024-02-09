import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Item } from '../interfaces/item';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  items: Item[] = [];
  filteredItems: Item[] = [];
  selectedCategory: string = 'all';
  constructor(
    private storageService: StorageService,
    public dms: DomSanitizer
  ) {}
  ngOnInit(): void {
    this.getItems();
  }

  display(b64: string) {
    return this.dms.bypassSecurityTrustUrl(b64);
  }

  getItems() {
    this.storageService.getItems().subscribe((response) => {
      this.items = response;
    });
  }

  filterItemsByCategory(category: string) {
    this.filteredItems = this.items.filter((item) => {
      return item.category === category;
    });
  }

  filterItems() {
    if (this.selectedCategory !== 'all') {
      this.filterItemsByCategory(this.selectedCategory);
    } else {
      this.filteredItems = this.items;
    }
  }
}
