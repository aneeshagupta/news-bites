var search_results = []; 
var result = {
	name: '',  
	link: '', 
	abstract: ''
};

function svc_search_v2_articlesearch(jsonObj) { 
		var num = jsonObj.response.docs.length
		for(i = 0; i<num; i++ ) {
			//document.getElementById('search-results').innerHTML += ' <a href = '+ jsonObj.response.docs[i].web_url+'>'+jsonObj.response.docs[i].headline.print_headline+ '</a> </br> '; 
			var result = new Object(); 
			result.name = jsonObj.response.docs[i].headline.main; 
			result.link = jsonObj.response.docs[i].web_url; 
			result.abstract = jsonObj.response.docs[i].abstract; 
			if(result.abstract == null) { 
				result.abstract = jsonObj.response.docs[i].snippet; 
			}
			search_results.push(result); 
			var iDiv = document.createElement('div');  //creates div for each search result 
			iDiv.id = 'result'+i; 
			document.getElementsByTagName('body')[0].appendChild(iDiv); //appends div to HTML 
		}
		if(search_results.length == 0) { 
			alert("No results fit that search criteria.  Please search for something else"); 
		}

		for(i=0; i<num; i++) { 
			var item = "result"+i; 
			$('#'+item).data(search_results[i]); 
			$('#'+item).html(search_results[i].name); 
			$('#'+item).click(function(){
				console.log($(this).data("abstract")); //prints out abstracts for each individual div 
				
			});
		}
}


$(function() { 	
	$('#search-btn').click( function(){
		search_results = []; 
		$('#search-results').html(''); 
		var searchTerm = $('#search-term').val(); 
		searchTerm = searchTerm.replace(/\s/g, '+'); 
		var searchSrc = 'http://api.nytimes.com/svc/search/v2/articlesearch.jsonp?callback=svc_search_v2_articlesearch&q='+searchTerm+'&begin_date=20150101&end_date=20150411&api-key=1005f771230760e52cd130064324c61d%3A19%3A71800087';
		var searchScript = document.createElement('script'); 
		searchScript.src = searchSrc; 
		$('head').append(searchScript); 
	}); 
}); 



