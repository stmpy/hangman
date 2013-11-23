StmpyMe.HangmanController = Ember.Controller.extend({
	init: function(){
		console.log('now I am running ');
		this._super();
	},
	allLetters: ("abcdefghijklmnopqrstuvwxyz").split(""),
	word: "pumpkins".split(""),
	attempts: 0,
	guessesLeft: function() {
		return 10 - this.attempts;
	}.property('attempts'),
	actions: {
		checkLetter: function(letter) {
			// disable after it has been clicked
			$('#'+letter).attr('disabled',true);
			// update attempts
			this.set('attempts',parseInt(this.attempts+1));
			console.log(this.get('guessesLeft'));
			switch(this.get('guessesLeft')) {
				case 5:
					$('#guesses').removeClass('label-success').addClass('label-warning');
					break;
				case 2:
					$('#guesses').removeClass('label-warning').addClass('label-danger');
					break;
			}

			if(this.word.indexOf(letter) != -1) {
				$('span[data\-letter="'+letter+'"]').removeClass('hide-letter');
			}
		}
	}
});