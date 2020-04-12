import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, filter, catchError, mergeMap } from 'rxjs/operators'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { User } from '../user/user';
import { Text } from '../translation/text/text';
import { Comment } from '../sidebar/comments/comment';
import { Translation } from '../translation/translation';


@Injectable({
  providedIn: 'root'
})
export class HomePageService {

  private searchUrl: string = "/api/posts/search/";
  private postsUrl: string = "/api/posts/"
	headers: HttpHeaders  = new HttpHeaders(); 
	
	originalTextString: string;
	translatedTextString: string; 
	
	originalText: Text;
  translatedText: Text; 
  
  searchString: string;
  translations: Translation[];
	
	constructor(private http: HttpClient) { 
  
	}
    
    // map user id and comments and translation array
    search(): Observable<Translation[]> {
      console.log('search string = '+this.searchString)
      if (this.searchString != undefined && this.searchString.trim())
      {
        return this.http.get(this.searchUrl+this.searchString).pipe(
          map(res => {
          let response: any = res;
          return response.data.map((translation) => {
                    var _translation = new Translation(null, 
                                                        translation.title, 
                                                        translation.language, 
                                                        null,
                                                        translation.upvotes,
                                                        translation.downvotes,
                                                        translation._id,
                                                        translation.dateCreated,
                                                        translation.text,
                                                        null,
                                                        translation.tags);
            return _translation;
        });
      }));
    }
    else
    {
      //let param = new HttpParams()
      //param.append('postsPerPage', '20');
      return this.http.get(this.postsUrl).pipe(
        map(res => {
        let response: any = res;
        return response.map((translation) => {
                  var _translation = new Translation(null, 
                                                      translation.title, 
                                                      translation.language, 
                                                      null,
                                                      translation.upvotes,
                                                      translation.downvotes,
                                                      translation._id,
                                                      translation.dateCreated,
                                                      translation.previewText,
                                                      null,
                                                      translation.tags);
          return _translation;
        });
      }));
    }
	}
}