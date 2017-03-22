var mongoose = require('mongoose');
	Schema = mongoose.Schema;
var ArticleSchema = new Schema({
  title: String,
  content: String,
  image:  String,
	created_at: {type: Date, default: Date.now},
	updated_at: {type: Date, default: Date.now}

});
mongoose.model('Article', ArticleSchema);
