app.filter('typeFilter', function(){
	return function(items, type){
		var products = [];
		if (type == ''){
			return items
		}
		for (var i = 0; i < items.length; i++){
			console.log(items[i].productType)
			console.log(type)
			if (items[i].productType == type){
				products.push(items[i])
			}	
		}
		return products
	}
})