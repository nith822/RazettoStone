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
- [ ] GET /posts/ 
- [x] POST /posts/
- [s] GET /posts/preview 
- [x] GET /posts/{postid}

### Translations
- [x] Model
- [?] GET /posts/{postid}/translations/{translationId}
- [x] POST /posts/{PostId}/translations
- [ ] POST /posts/{postid}/translations/{TranslationID}/flag

### Comments
- [x] Model
- [x] POST /posts/{postid}/comments
- [ ] POST /posts/{postid}/translations/{TranslationID}/comments/
- [ ] POST /posts/{postid}/translations/{TranslationID}/comments/{commentID}/replies

### Flags
- [ ] Model

### Votes
- [x] PUT /posts/{postid}/vote
- [x] PUT /posts/{postid}/translations/{TranslationID}/vote
- [ ] PUT /posts/{postid}/translations/{TranslationID}/comments/{commentID}/vote
- [ ] PUT /posts/{postid}/translations/{TranslationID}/comments/{commentID}/replies/{commentID}/vote

### Search
- [ ] GET /search
