import { Component } from '@angular/core';
import { FormBuilder,FormGroup, FormControl, Validators } from '@angular/forms';
import { Input } from '../models/input.model';
import { ApiService } from './../services/api.service';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {
  reviewForm: FormGroup;
  private userid: number = 0;
  public pastReviews: Input[] = [];

  constructor(fb: FormBuilder, private apiService: ApiService, private authService: AuthService) {
    this.reviewForm = fb.group({
        name: fb.control('', Validators.required),
        movieName: fb.control('', Validators.required),
        genre: fb.control('', Validators.required),
        text: fb.control('', Validators.required),
        feeling: fb.control('', Validators.required),
    });
  }
  
  ngOnInit(): void {
    this.reviewForm.reset({name: 'type your full name here'});
    this.reviewForm.reset({movieName: 'type the movie name here'});
    this.reviewForm.reset({genre: 'type the genre of the movie here'});
    this.reviewForm.reset({text: 'type your review here'});
    this.reviewForm.reset({feeling: 'select your feeling about the movie (POSITIVE, NEGATIVE)'});
    this.userid = this.authService.getUser()!.id;
        if (this.userid == null || this.userid == 0) {
          console.log("User not logged in");
        }
    console.log("User logged in: ",this.authService.getUser());
    this.apiService.getPastReviews(this.userid).subscribe((reviews: Input[]) => {
      this.pastReviews = reviews;
    });
  }

  onReview(){
    if(this.reviewForm.valid){
        const reviewData: Input = {
          name: this.reviewForm.value.name,
          movieName: this.reviewForm.value.movieName,
          genre: this.reviewForm.value.genre,
          text: this.reviewForm.value.text,
          feeling: this.reviewForm.value.feeling,
        }
  
        this.apiService.submitReview(reviewData, this.userid).subscribe((result) => {
          console.log(result);
        });
    }
  }

}
