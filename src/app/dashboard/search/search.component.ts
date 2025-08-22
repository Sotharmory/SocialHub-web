import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SearchService } from '../../../services/search.service';
import { SearchResult } from '../../../models/search.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchForm: FormGroup;
  searchResults: SearchResult[] = [];
  searchHistory: string[] = [];
  loading = false;
  error = '';
  hasResults = false;

  constructor(
    private searchService: SearchService,
    private fb: FormBuilder
  ) {
    this.searchForm = this.fb.group({
      query: [''],
      type: ['all'],
      category: [''],
      dateRange: ['']
    });
  }

  ngOnInit(): void {
    this.searchHistory = this.loadSearchHistory();
  }

  /**
   * Enhanced search with filters
   */
  async performAdvancedSearch(): Promise<void> {
    try {
      this.loading = true;
      this.error = '';

      const searchParams = {
        query: this.searchForm.get('query')?.value,
        type: this.searchForm.get('type')?.value,
        category: this.searchForm.get('category')?.value,
        dateRange: this.searchForm.get('dateRange')?.value
      };

      const results = await this.searchService.advancedSearch(searchParams);
      this.searchResults = results;
      this.hasResults = results.length > 0;
      
      // Save to history if query exists
      if (searchParams.query) {
        this.saveToHistory(searchParams.query);
      }
    } catch (error) {
      console.error('Search error:', error);
      this.error = 'Search failed';
    } finally {
      this.loading = false;
    }
  }

  /**
   * Save search query to history
   */
  saveToHistory(query: string): void {
    const history = JSON.parse(localStorage.getItem('searchHistory') || '[]');
    if (!history.includes(query)) {
      history.unshift(query);
      if (history.length > 10) {
        history.pop();
      }
      localStorage.setItem('searchHistory', JSON.stringify(history));
    }
  }

  /**
   * Load search history
   */
  loadSearchHistory(): string[] {
    return JSON.parse(localStorage.getItem('searchHistory') || '[]');
  }

  /**
   * Clear search history
   */
  clearSearchHistory(): void {
    localStorage.removeItem('searchHistory');
    this.searchHistory = [];
  }

  /**
   * Quick search from history
   */
  searchFromHistory(query: string): void {
    this.searchForm.patchValue({ query });
    this.performAdvancedSearch();
  }

  /**
   * Clear search results
   */
  clearResults(): void {
    this.searchResults = [];
    this.hasResults = false;
    this.error = '';
  }

  onSubmit(): void {
    this.performAdvancedSearch();
  }
}



