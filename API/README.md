# RazettoStone API

## Steps
* Run "npm start" to run the API on port 8080.

## Requirements
* Have mongo installed and running locally.

api-routes.js will specify all the available URLs.


## Todo API 

https://docs.google.com/document/d/1I0BHaT3fQC0xmHqalZHGjKzAR1xYOkqas1qF2mdjKOI/edit


- [ ] Implemented

### Users
- [x] Model 
- [x] GET /users/{userid}
- [x] POST /users/
- [x] PUT /users/{userid}

### Posts 
- [x] Model
- [x] Model for replies
- [ ] GET /posts/                   // get post previews
- [x] POST /posts/
- [s] GET /posts/preview 
- [x] GET /posts/{postid}           // get preview of one post, contains full text and preview of trans

### Translations
- [x] Model
- [ ] GET /posts/{postid}/translations/     // this gets translation previews
- [ ] GET /posts/{postid}/translations/{translationId}
- [x] POST /posts/{PostId}/translations
- [x] POST /posts/{postid}/translations/{TranslationID}/flag

### Comments
- [x] Model
- [x] POST /posts/{postid}/comments
- [x] POST /posts/{postid}/translations/{TranslationID}/comments/


### Replies
- [!] POST /posts/{postid}/comments/{commentID}/replies                                 // dateCreated will show up as int if we do nested on commentModel
- [!] POST /posts/{postid}/translations/{TranslationID}/comments/{commentID}/replies

### Flags
- [x] Model
- [!] PUT  /posts/{postid}/translations/{translationId}/flag    // need to make sure a person cant put the same flag twice 

### Votes
- [x] PUT /posts/{postid}/vote
- [x] PUT /posts/{postid}/comments/{commentID}/vote
- [x] PUT /posts/{postid}/translations/{TranslationID}/vote
- [x] PUT /posts/{postid}/translations/{TranslationID}/comments/{commentID}/vote
- [x] PUT /posts/{postid}/comments/{commentID}/replies/{replyID}/vote
- [x] PUT /posts/{postid}/translations/{TranslationID}/comments/{commentID}/replies/{replyID}/vote

### Search
- [x] GET /search
