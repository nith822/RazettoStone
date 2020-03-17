# RazettoStone

## Todo API 

https://docs.google.com/document/d/1I0BHaT3fQC0xmHqalZHGjKzAR1xYOkqas1qF2mdjKOI/edit


- [ ] Implemented

### Users
- [x] Model 
- [x] GET /users/{userid}
- [x] POST /users/
- [x] PUT /users/{userid}

### Posts 
- [ ] Model
- [ ] GET /posts/ 
- [ ] POST /posts/
- [ ] GET /posts/preview
- [ ] GET /posts/{postid}

### Translations
- [ ] Model
- [ ] GET /posts/{postid}/translations/{translationId}
- [ ] POST /posts/{PostId}/translations
- [ ] POST /posts/{postid}/translations/{TranslationID}/flag

### Comments
- [ ] Model
- [ ] POST /posts/{postid}/comments
- [ ] POST /posts/{postid}/translations/{TranslationID}/comments/
- [ ] POST /posts/{postid}/translations/{TranslationID}/comments/{commentID}/replies

### Flags
- [ ] Model

### Votes
- [ ] POST /posts/{postid}/vote
- [ ] POST /posts/{postid}/translations/{TranslationID}/vote
- [ ] POST /posts/{postid}/translations/{TranslationID}/comments/{commentID}/vote
- [ ] /posts/{postid}/translations/{TranslationID}/comments/{commentID}/replies/{commentID}

### Search
- [ ] GET /search
