import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostService } from '../post.service';
import { Post } from '../post';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit, OnDestroy {

  posts: Post[] = [];
  greeting: string = '';  // Variable for greeting message
  timer: string = '00:00';  // Initialize timer
  startTime: number = Date.now();  // Time when the user opened the page
  timerInterval: any;  // Store interval ID to clear it later

  constructor(public postService: PostService) { }

  ngOnInit(): void {
    this.getPosts();
    this.setGreeting();  // Set the greeting based on the current time
    this.startTimer();  // Start the timer
  }

  ngOnDestroy(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);  // Clear the timer when the component is destroyed
    }
  }

  // Fetch posts from the service
  getPosts(): void {
    this.postService.getAll().subscribe((data: Post[]) => {
      this.posts = data;
      console.log(this.posts);
    });
  }

  // Set greeting message based on the current time
  setGreeting(): void {
    const currentHour = new Date().getHours();  // Get current hour
    if (currentHour < 12) {
      this.greeting = 'Good Morning';
    } else if (currentHour < 18) {
      this.greeting = 'Good Afternoon';
    } else {
      this.greeting = 'Good Evening';
    }
  }

  // Start the timer
  startTimer(): void {
    this.timerInterval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - this.startTime) / 1000); // Time in seconds
      const minutes = Math.floor(elapsed / 60);  // Convert seconds to minutes
      const seconds = elapsed % 60;  // Get remaining seconds
      this.timer = `${this.formatTime(minutes)}:${this.formatTime(seconds)}`;
    }, 1000);
  }

  // Format time to always show 2 digits
  formatTime(time: number): string {
    return time < 10 ? `0${time}` : `${time}`;
  }

  // Delete post function with confirmation
  deletePost(id: number): void {
    const confirmDelete = window.confirm('Are you sure you want to delete this post?');
    if (confirmDelete) {
      this.postService.delete(id).subscribe(() => {
        this.posts = this.posts.filter(item => item.id !== id);
        alert('Deleted Successfully...!!!');
      });
    }
  }
}
