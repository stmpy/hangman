StmpyMe.BloggrRoute = Ember.Route.extend({
	model: function() {
		return posts;
	}
});

StmpyMe.PostRoute = Ember.Route.extend({
	model: function(params) {
		return posts.findBy('id',params.post_id);
	}
});

var posts = [{
	id: '1',
	name: 'post 1',
	author: 'Travis Jeppson',
	date: '12-31-1981',
	text: 'I with this would work'
},{
	id: '2',
	name: 'post 2',
	author: 'Anonymous',
	date: '03-04-2013',
	text: 'imma cry ... '
}];