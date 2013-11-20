StmpyMe.Router.map(function () {
  this.resource('bloggr',function(){
  	this.resource('post',{path: ':post_id'});
  });
  this.resource('hangman');
});
