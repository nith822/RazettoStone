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
- [ ] Model for replies
- [ ] GET /posts/                   // get post previews
- [x] POST /posts/
- [s] GET /posts/preview 
- [x] GET /posts/{postid}           // get preview of one post, contains full text and preview of trans

### Translations
- [x] Model
- [?] GET /posts/{postid}/translations/{translationId}
- [x] POST /posts/{PostId}/translations
- [ ] POST /posts/{postid}/translations/{TranslationID}/flag

### Comments
- [x] Model
- [x] POST /posts/{postid}/comments
- [x] POST /posts/{postid}/translations/{TranslationID}/comments/
- [ ] POST /posts/{postid}/translations/{TranslationID}/comments/{commentID}/replies

### Flags
- [ ] Model

### Votes
- [x] PUT /posts/{postid}/vote
- [x] PUT /posts/{postid}/comments/{commentID}/vote
- [x] PUT /posts/{postid}/translations/{TranslationID}/vote
- [x] PUT /posts/{postid}/translations/{TranslationID}/comments/{commentID}/vote
- [ ] PUT /posts/{postid}/translations/{TranslationID}/comments/{commentID}/replies/{commentID}/vote

### Search
- [ ] GET /search
