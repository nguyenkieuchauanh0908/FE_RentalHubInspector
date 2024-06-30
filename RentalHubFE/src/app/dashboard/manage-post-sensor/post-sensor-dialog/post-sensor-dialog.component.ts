import {
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotifierService } from 'angular-notifier';
import { Subscription } from 'rxjs';
import { User } from 'src/app/auth/user.model';
import { PostService } from 'src/app/posts/post.service';
import { PostItem } from 'src/app/posts/posts-list/post-item/post-item.model';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { Tags } from 'src/app/shared/tags/tag.model';

@Component({
  selector: 'app-post-sensor-dialog',
  templateUrl: './post-sensor-dialog.component.html',
  styleUrls: ['./post-sensor-dialog.component.scss'],
})
export class PostSensorDialogComponent implements OnInit, OnDestroy {
  @ViewChild('contentToDisplay') contentToDisplay: ElementRef | undefined;
  private getProfileSub!: Subscription;
  private getPostHistorySub!: Subscription;
  isLoading = false;
  seeMore: boolean = false;
  post: any | null = null;
  profile!: User | null;
  currentUid!: string | null;
  myProfile!: User | null;
  historyPosts: PostItem[] = new Array<PostItem>();
  totalPages: number = 1;
  currentPage: number = 1;
  pageItemLimit: number = 5;
  isHost: boolean = false;
  myProfileSub = new Subscription();
  getTagSub = new Subscription();

  previews: string[] = [];
  selectedImage!: File;
  selectedFiles!: FileList;
  selectedFileNames: string[] = [];
  updatedFiles!: FileList;
  deletedImageIndexes: number[] = [];

  selectedTags!: Tags[];

  currentActiveStatus = {
    status: 4, //All posts
    data: this.historyPosts,
  };
  authService: any;

  sensorResult = new EventEmitter();
  denySensorResult = new EventEmitter();

  constructor(
    private postService: PostService,
    private notifierService: NotifierService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log('🚀 ~ PostSensorDialogComponent ~ data:', this.data);
    this.post = data;
  }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
  ngAfterViewInit(): void {
    setTimeout(() => this.attachingInnerHtmlContent(), 100);
  }

  ngOnInit(): void {
    this.postService.setCurrentChosenTags([]);
    this.previews = this.data._images;
    this.postService.setCurrentChosenTags(this.data._tags);
    this.postService.getCurrentChosenTags.subscribe((tags) => {
      this.selectedTags = tags;
    });
  }

  attachingInnerHtmlContent() {
    if (this.contentToDisplay) {
      this.contentToDisplay.nativeElement.innerHTML = this.post._content;
    } else {
      console.log('contentToDisplay is not ready yet');
      setTimeout(() => this.attachingInnerHtmlContent(), 100);
    }
  }

  denyPost() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: 'Xác nhận từ chối duyệt?',
    });
    const sub = dialogRef.componentInstance.confirmYes.subscribe(() => {
      this.isLoading = true;
      this.postService.sensorPost(this.data._id, 3).subscribe(
        (res) => {
          if (res.data) {
            this.isLoading = false;
            this.denySensorResult.emit(this.data._id);
            this.notifierService.hideAll();
            this.notifierService.notify('success', 'Từ chối duyệt thành công!');
          }
        },
        (errMsg) => {
          this.isLoading = false;
        }
      );
    });
    dialogRef.afterClosed().subscribe(() => {
      sub.unsubscribe();
    });
  }

  sensor() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: 'Xác nhận duyệt?',
    });
    const sub = dialogRef.componentInstance.confirmYes.subscribe(() => {
      this.isLoading = true;
      this.postService.sensorPost(this.data._id, 1).subscribe(
        (res) => {
          if (res.data) {
            this.isLoading = false;
            this.sensorResult.emit(this.data._id);
            this.notifierService.hideAll();
            this.notifierService.notify(
              'success',
              'Duyệt bài viết thành công!'
            );
          }
        },
        (errMsg) => {
          this.isLoading = false;
        }
      );
    });
    dialogRef.afterClosed().subscribe(() => {
      sub.unsubscribe();
    });
  }

  removePost() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: 'Xác nhận khóa bài viết?',
    });
    const sub = dialogRef.componentInstance.confirmYes.subscribe(() => {
      this.isLoading = true;
      this.postService.removePost(this.data._id).subscribe(
        (res) => {
          if (res.data) {
            this.isLoading = false;
            this.sensorResult.emit(this.data._id);
            this.notifierService.hideAll();
            this.notifierService.notify('success', 'Khóa bài viết thành công!');
          }
        },
        (errMsg) => {
          this.isLoading = false;
        }
      );
    });
    dialogRef.afterClosed().subscribe(() => {
      sub.unsubscribe();
    });
  }

  seeMoreContentClick() {
    this.seeMore = !this.seeMore;
  }
}
