App = Ember.Application.create();

App.Artist = Ember.Object.extend({
	name: null,

	slug: function(){
		return this.get("name").dasherize();
	}.property("name"),

	songs: function(){
		return App.Songs.filterProperty("artist", this.get("name"));
	}.property("name", "App.Songs.@each.artist")
});

App.Song = Ember.Object.extend({
	title: null,
	artist: null,
	rating: null
});

var artistsNames = ["Pearl Jam", "Led Zeppelin", "Foo Fighters", "Kaya Project", "Radiohead", "Red Hot Chilli Peppers" ];
App.Artists = artistsNames.map(function(name){
	return App.Artist.create({name: name});
});

App.SongCollection = Ember.ArrayProxy.extend(Ember.SortableMixin, {
	sortProperties: ["rating"],
	sortAscending: false,
	content: []
});

App.Songs = App.SongCollection.create();
//Pearl Jam songs
App.Songs.pushObject(App.Song.create({title: "Yellow Ledbetter", artist: "Pearl Jam", rating: 5}));
App.Songs.pushObject(App.Song.create({title: "Animal", artist: "Pearl Jam", rating: 4}));
App.Songs.pushObject(App.Song.create({title: "Daughter", artist: "Pearl Jam", rating: 3}));
App.Songs.pushObject(App.Song.create({title: "State of Love and Truth", artist: "Pearl Jam", rating: 4}));
App.Songs.pushObject(App.Song.create({title: "Immortality", artist: "Pearl Jam", rating: 3}));
App.Songs.pushObject(App.Song.create({title: "Alive", artist: "Pearl Jam", rating: 4}));
App.Songs.pushObject(App.Song.create({title: "Given to Fly", artist: "Pearl Jam", rating: 5}));
App.Songs.pushObject(App.Song.create({title: "Inside Job", artist: "Pearl Jam", rating: 2}));

//Led Zeppelin songs
App.Songs.pushObject(App.Song.create({title: "Black Dog", artist: "Led Zeppelin", rating: 4}));
App.Songs.pushObject(App.Song.create({title: "Achilles Last Stand", artist: "Led Zeppelin", rating: 4}));
App.Songs.pushObject(App.Song.create({title: "Immigrant Song", artist: "Led Zeppelin", rating: 3}));
App.Songs.pushObject(App.Song.create({title: "Mole Lotto Song", artist: "Led Zeppelin", rating: 2}));


//Foo Fighters songs
App.Songs.pushObject(App.Song.create({title: "The Pretender", artist: "Foo Fighters", rating: 3}));
App.Songs.pushObject(App.Song.create({title: "Best of you", artist: "Foo Fighters", rating: 5}));

App.alwaysWaiting = App.Song.create({title: "Always Waiting", artist: "Kaya Project", rating: 5});



//defining routes
App.Router.map(function(){
	this.resource("artists", function(){
		this.route("songs", {path: ":slug"});
	});
});
// App.Router.map(function(){
// 	this.route("artists");
// });

App.IndexRoute = Ember.Route.extend({
	beforeModel: function(){
		this.transitionTo("artists");
	}
});

App.ArtistsRoute = Ember.Route.extend({
	model: function(){
		return App.Artists;
	},
	actions: {
		createArtist: function(){
			var name = this.get("controller").get("newArtist");
			var artist = App.Artist.create({name: name});
			App.Artists.pushObject(artist);
			//remove the value fro mthe text field
			this.get("controller").set("newArtist", "");
		}
	}

});

App.ArtistsSongsRoute = Ember.Route.extend({
	model: function(params){
		return App.Artists.findProperty("slug", params.slug);
	},
	actions: {
		addSong: function(){
			var trackName = this.get("controller").get("newSong");
			var artist = this.get("controller.model.name");
			var song = App.Song.create({title: trackName, artist: artist});
			App.Songs.pushObject(song);
			this.get("controller").set("newSong", "");
		}
	}
});

App.StarRating = Ember.View.extend({
	templateName: "star-rating",
	classNames: ["rating-panel"],

	rating: Ember.computed.alias("context.rating"),
	fullStars: Ember.computed.alias("rating"),
	numStars: Ember.computed.alias("maxRating"),

	stars: function(){
		var ratings = [];
		var fullStars = this.starRange(1, this.get("fullStars"), "full");
		var emptyStars = this.starRange(this.get("fullStars") + 1, this.get("numStars"), "empty");
		Array.prototype.push.apply(ratings, fullStars);
		Array.prototype.push.apply(ratings, emptyStars);
		return ratings;
	}.property("fullStars","numStars"),
	starRange: function(start, end, type){
		var starsData = [];
		for(i = start; i <= end; i++){
			starsData.push({rating: i, full: type === "full"});
		}
		return starsData;
	}
});