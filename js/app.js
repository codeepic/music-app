App = Ember.Application.create();

App.Artist = Ember.Object.extend({
	name: null
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
App.Songs.pushObject(App.Song.create({title: "Yellow Ledbetter", artist: "Pearl Jam", rating: 10}));
App.Songs.pushObject(App.Song.create({title: "Animal", artist: "Pearl Jam", rating: 8}));
App.Songs.pushObject(App.Song.create({title: "Daughter", artist: "Pearl Jam", rating: 7}));
App.Songs.pushObject(App.Song.create({title: "State of Love and Truth", artist: "Pearl Jam", rating: 9}));
App.Songs.pushObject(App.Song.create({title: "Immortality", artist: "Pearl Jam", rating: 6}));
App.Songs.pushObject(App.Song.create({title: "Alive", artist: "Pearl Jam", rating: 8}));
App.Songs.pushObject(App.Song.create({title: "Given to Fly", artist: "Pearl Jam", rating: 9}));
App.Songs.pushObject(App.Song.create({title: "Inside Job", artist: "Pearl Jam", rating: 4}));

//Led Zeppelin songs
App.Songs.pushObject(App.Song.create({title: "Black Dog", artist: "Led Zeppelin", rating: 8}));
App.Songs.pushObject(App.Song.create({title: "Achilles Last Stand", artist: "Led Zeppelin", rating: 7}));
App.Songs.pushObject(App.Song.create({title: "Immigrant Song", artist: "Led Zeppelin", rating: 6}));
App.Songs.pushObject(App.Song.create({title: "Mole Lotto Song", artist: "Led Zeppelin", rating: 4}));


//Foo Fighters songs
App.Songs.pushObject(App.Song.create({title: "The Pretender", artist: "Foo Fighters", rating: 6}));
App.Songs.pushObject(App.Song.create({title: "Best of you", artist: "Foo Fighters", rating: 9}));

App.alwaysWaiting = App.Song.create({title: "Always Waiting", artist: "Kaya Project", rating: 9});



//defining routes
App.Router.map(function(){
	this.route("artists", {path: "/artists"});
});

App.ArtistsRoute = Ember.Route.extend({
	model: function(){
		return App.Artists;
	}
});