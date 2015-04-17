var search_results = []; 
var result = {
	name: '',  
	link: '', 
	abstract: ''
};

function svc_search_v2_articlesearch(jsonObj) { 
		var num = jsonObj.response.docs.length
		for(i = 0; i<num; i++ ) { 
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

			var jDiv = document.createElement('div'); 
			jDiv.id = 'abstract'+i; 
			document.getElementsByTagName('body')[0].appendChild(jDiv); 
		}
		if(search_results.length == 0) { 
			alert("No results fit that search criteria.  Please search for something else"); 
		}

		load_links(); 
}

function svc_mostpopular_v2_mostviewed(jsonObj) { 
	var num = jsonObj.num_results; 
	for(i=0; i<10; i++) { 
		var result = new Object(); 
		result.name = jsonObj.results[i].title;
		result.abstract = jsonObj.results[i].abstract; 
		search_results.push(result); 

		var iDiv = document.createElement('div');  //creates div for each search result 
		iDiv.id = 'result'+i; 
		document.getElementsByTagName('body')[0].appendChild(iDiv); 

		var jDiv = document.createElement('div'); 
		jDiv.id = 'abstract'+i; 
		document.getElementsByTagName('body')[0].appendChild(jDiv); 
	}
	load_links(); 

		
}

$(function(){
	var mainSrc = 'http://api.nytimes.com/svc/mostpopular/v2/mostviewed/all-sections/1.jsonp?callback=svc_mostpopular_v2_mostviewed&api-key=76807123647841a8459032ebe54c5969%3A11%3A71800087'; 
	var mainScript = document.createElement('script'); 
	mainScript.src = mainSrc; 
	$('head').append(mainScript); 
}); 

$(function() { 	
	$('#search-btn').click( function(){
		search_results = []; 
		$("#results").empty(); 
		var searchTerm = $('#search-term').val(); 
		searchTerm = searchTerm.replace(/\s/g, '+'); 
		var searchSrc = 'http://api.nytimes.com/svc/search/v2/articlesearch.jsonp?callback=svc_search_v2_articlesearch&q='+searchTerm+'&begin_date=20150101&end_date=20150412&api-key=1005f771230760e52cd130064324c61d%3A19%3A71800087';
		var searchScript = document.createElement('script'); 
		searchScript.src = searchSrc; 
		$('head').append(searchScript); 
	}); 
}); 

$(function(){
	$('#sports').click(function(){
		change_headline('sports'); 
	}); 
	$('#politics').click(function(){
		change_headline('politics'); 
	}); 
	$('#international').click(function(){
		change_headline('international'); 
	}); 

}); 

function change_headline(keyword) { 
	$('#results').empty(); 
	search_results = []; 
	var source = 'http://api.nytimes.com/svc/mostpopular/v2/mostviewed/'+keyword+'/1.jsonp?callback=svc_mostpopular_v2_mostviewed&api-key=76807123647841a8459032ebe54c5969%3A11%3A71800087';
	var script = document.createElement('script'); 
	script.src = source; 
	$('head').append(script); 

}

function load_links() { 
	for(i=0; i<10; i++) { 
		var item = "result"+i; 
		var description = "abstract"+i; 

		$('#results').append($('#'+item));
		$('#'+item).addClass("headlines"); 
		$('#'+item).html(search_results[i].name); 

		$('#'+item).append($('#'+description)); 
		$('#'+description).addClass("abstracts"); 
		$('#'+description).html(search_results[i].abstract); 
		$('#'+description).hide(); 

		$('#'+item).click(function(){
			$(this).children().first().slideToggle();  //prints out abstracts for each individual div 
		});
	}
}



