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
	attempts: 0,
	message: null,
	messageType: 'alert-success',
	guessesLeft: function() {
		return 10 - this.attempts;
	}.property('attempts'),
	guessesClass: function() {
		if(this.get('guessesLeft') <= 2) {
			return 'label-danger';
		} else if(this.get('guessesLeft') <= 5) {
			return 'label-warning';
		}
		return 'label-success';
	}.property('guessesLeft'),
	_disableAlphabet: function() {
		// disable all the alphabet
		this.alphabet.forEach(function(item,index){
			Ember.set(item,'isClicked',true);
		});
	},
	_youLose: function() {
		this._disableAlphabet();
		this.set('message','Sorry you have lost!');
		this.set('messageType','alert-danger');
	},
	_youWin: function() {
		this._disableAlphabet();
		this.set('message','You have won!!!!! Yay! and the peasants rejoice');
	},
	actions: {
		checkLetter: function(value) {
			// disable after it has been clicked
			Ember.set(this.alphabet.findBy('value',value),'isClicked',true);

			// check the word to see if any letters were found
			var letters = this.word.filterBy('value',value);
			if(letters.length > 0) {
				letters.forEach(function(item,index){
					Ember.set(item,'isFound',true);
				});
			} else {
				// update attempts
				this.incrementProperty('attempts',1);
			}
			// check if they have won
			var haveWon = true;
			this.word.forEach(function(item,index){
				if(!item.isFound) {
					haveWon = false;
				}
			});
			if(haveWon) {
				this._youWin();
			}
			// check if they have lost
			if(this.get('guessesLeft') == 0) {
				this._youLose();
			}
		}
	}
});