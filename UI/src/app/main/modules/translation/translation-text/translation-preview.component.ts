import { Component, OnInit } from '@angular/core';
import { Translation } from '../../../translation/translation'
import { Text } from '../../../translation/text/text'
import { TextLine } from '../../../translation/text/textLine'
import { TranslationService } from '../../../translation/translation.service';
import { Router, ActivatedRoute, Params, Data } from '@angular/router';
import { CookieService } from 'ngx-cookie-service'

@Component({
selector: 'app-translation-preview',
templateUrl: './translation-preview.component.html',
styleUrls: ['./translation-preview.component.css']
})
export class TranslationPreviewComponent implements OnInit {
    
translationTexts: Text[];
userID: string;
    
    constructor(public  translationService: TranslationService, public cookieService: CookieService, private route: ActivatedRoute, private router: Router) {
        
    }
    
    ngOnInit() {
        
        console.log("init TranslationPreviewComponent");
        
        var translationID = this.route.parent.parent.snapshot.params['id'];
        this.userID = this.cookieService.get("userId");
        this.translationService.getTranslationPreview(translationID).subscribe((texts) => {
            this.translationTexts = texts;
        });
    }
    
    navigate(path: number): void {
        this.router.navigate([{outlets: {primary: [path]}}], {relativeTo: this.route.parent, skipLocationChange: false});
    }
    
    
    //helper class
    convertToStringArray(textLines: TextLine[]): string[] {
        var stringArray: string[] = [];
        for(let textLine of textLines) {
            stringArray.push(textLine.getText());
        }
        return stringArray;
    }
    upvoteTranslationText(translationID: string): void {
        var postID = this.route.parent.parent.snapshot.params['id'];
        console.log("Attempting to upvote post.")
        this.translationService.voteTranslation(postID, translationID, this.userID, true).subscribe((success) => { this.translationService.getTranslationPreview(postID).subscribe((texts) => {
            this.translationTexts = texts;
        });});
    }
    
    downvoteTranslationText(translationID: string): void {
        var postID = this.route.parent.parent.snapshot.params['id'];
        console.log("Attempting to downvote post.")
        this.translationService.voteTranslation(postID, translationID, this.userID, false).subscribe((success) => { this.translationService.getTranslationPreview(postID).subscribe((texts) => {
            this.translationTexts = texts;
        });});
    }
}