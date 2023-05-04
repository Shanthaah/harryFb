import { Component, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { mergeNsAndName } from '@angular/compiler';


@Component({
  selector: 'app-customer-review',
  templateUrl: './customer-review.component.html',
  styleUrls: ['./customer-review.component.css']
})


export class CustomerReviewComponent {
  customerName: string;
  review: string;

  constructor(private httpclient: HttpClient) {
    this.customerName = '';
    this.review = '';
    console.log("Entred")
  }
  
  submitReview() {
    const data = {
      customerName: this.customerName,
      review: this.review
    };
    this.httpclient.post('http://localhost:3000/api/customer-review', data).subscribe(() => {
      alert('Review submitted successfully!');
      this.customerName = '';
      this.review = '';
    });
    
  }
}
