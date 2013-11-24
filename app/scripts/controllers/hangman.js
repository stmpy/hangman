var alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
var word = "pumpkins".split("");
StmpyMe.HangmanController = Ember.Controller.extend({
	init: function(){
		// set up alphabet
		for(i=0; i<alphabet.length; i++) {
			this.alphabet.push({
				id: i,
				value: alphabet[i],
				isClicked: false
			});
		}
		// set up word
		for(i=0; i<word.length; i++) {
			this.word.push({
				id: i,
				value: word[i],
				isFound: false
			});
		}
		this._super();
	},
	alphabet: [],
	word: [],
	guesses: {
		attempts: 0,
		left: function() {
			console.log(this.guesses.attempts);
			return 10 - this.guesses.attempts;
		}.property('guesses.attempts'),
		class: function() {
			if(this.get('guesses.left') <= 2) {
				return 'label-danger';
			} else if(this.get('guesses.left') <= 5) {
				return 'label-warning';
			}
			return 'label-success';
		}.property('guesses.left')
	},
	actions: {
		checkLetter: function(value) {
			// disable after it has been clicked
			Ember.set(this.alphabet.findBy('value',value),'isClicked',true);

			// update attempts
			this.set('attempts',parseInt(this.guesses.attempts+1));

			// check the word to see if any letters were found
			var letters = this.word.filterBy('value',value);
			if(letters.length > 0) {
				letters.forEach(function(item,index){
					Ember.set(item,'isFound',true);
				});
			}
		}
	}
});