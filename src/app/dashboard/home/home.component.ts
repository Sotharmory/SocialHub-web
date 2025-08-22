import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../services/post.service';
import { Post } from '../../../models/post.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  posts: Post[] = [];
  loading = false;
  error = '';
  currentPage = 1;
  postsPerPage = 10;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.loadPostsWithPagination();
  }

  /**
   * Enhanced post loading with pagination
   */
  async loadPostsWithPagination(page: number = 1, limit: number = 10): Promise<void> {
    try {
      this.loading = true;
      const posts = await this.postService.getPosts(page, limit);
      this.posts = posts;
      this.currentPage = page;
    } catch (error) {
      console.error('Error loading posts:', error);
      this.error = 'Failed to load posts';
    } finally {
      this.loading = false;
    }
  }

  /**
   * Refresh posts data
   */
  async refreshPosts(): Promise<void> {
    await this.loadPostsWithPagination(this.currentPage);
  }

  /**
   * Load next page of posts
   */
  async loadNextPage(): Promise<void> {
    await this.loadPostsWithPagination(this.currentPage + 1);
  }

  /**
   * Load previous page of posts
   */
  async loadPreviousPage(): Promise<void> {
    if (this.currentPage > 1) {
      await this.loadPostsWithPagination(this.currentPage - 1);
    }
  }
}



