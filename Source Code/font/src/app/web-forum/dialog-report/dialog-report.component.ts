import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReportPost } from 'src/app/model/ReportPost';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-dialog-report',
  templateUrl: './dialog-report.component.html',
  styleUrls: ['./dialog-report.component.css']
})
export class DialogReportComponent implements OnInit {

  isCheck = false;
  spam = false;
  not = false;
  language = false;
  write = "";
  constructor(public dialogRef: MatDialogRef<DialogReportComponent>, @Inject(MAT_DIALOG_DATA) public data: string,public postService:PostService) { }

  ngOnInit(): void {
  }

  check(){
    this.isCheck = true;
    this.spam = false;
    this.not = false;
    this.language = false;
  }

  updateSpam(event: any)
  {
    this.spam = true;
    this.not = false;
    this.language = false;
  }
  updateNot(event: any)
  {
    this.spam = false;
    this.not = true;
    this.language = false;
  }
  updateLanguage(event: any)
  {
    this.spam = false;
    this.not = false;
    this.language = true;
  }

  submit(){
    var report= new ReportPost;
    report.postId = this.data;
    report.write = this.write;
    if(this.spam == true){
      report.report = "Tin spam"
    }
    else if(this.not == true){
      report.report = "Tin không đúng"
    }
    else if(this.language == true){
      report.report = "Ngôn ngữ sai trái"
    }
    else{
      report.report = "Khác"
    }

    this.postService.postReportPost(report).subscribe();
    alert("Báo cáo của bạn đã được gửi")
    this.dialogRef.close();
  }

}
