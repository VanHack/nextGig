




function getArtisData(){
	

	$.post("script/getArtistData.php", $('#frmArtistName').serialize(),function(result){  
	//and after the ajax request ends we check the text returned 

		var artist = JSON.parse(result);
		if (artist.id >0) {
			
			$("#mainSection").show();			
			
			$("#mainArtistName").html(artist.name);
			$("#mainArtistImage").attr("src", artist.thumb_url);
			if (artist.facebook_page_url != ""){
				$("#mainArtistFacebookButtonLink").attr("href", artist.facebook_page_url).html(artist.facebook_page_url);
			}else
				$("#mainArtistFacebookButtonLink").attr("href", "#").html("Not Available");

			$("#labelFacebookMainArtist").show();		
			
			$("#labelQuantNextEvents").html(artist.upcoming_event_count);
			
			if (artist.upcoming_event_count > 0){
				
				$.post("script/getArtistData.php?method=events", $('#frmArtistName').serialize(),function(resultEvents){
					
					var events = JSON.parse(resultEvents);
					var outPutDiv = [];
					var eventCount = 0;
					$.each( events, function( key ) {
					
						   
							var dateTime = events[key].datetime;
							var mydate = new Date(dateTime);
							dateTime = mydate.toLocaleString("en-US");
							
							var url = events[key].url;
							var venue = events[key].venue;					
							var latitude = venue["latitude"];
							var longitude = venue["longitude"];
							var name = venue["name"];
							var city = venue["city"];
							var region = venue["region"].length > 0 ? " , "+venue["region"].length : "";
							var country = venue["country"];							
							
						   outPutDiv.push("<a href='#' class='list-group'>");
								outPutDiv.push("<div class='d-flex w-100 justify-content-between'>");
									outPutDiv.push("<h3 class='mb-1' id='venueName'>"+name+"</h3>");
									outPutDiv.push("<p>Date: <span class='mb-1'>"+dateTime+"</span></p>");
									outPutDiv.push("<p>Venue: <span class='mb-1'>"+city+""+region+", "+country+"</span></p>");
								outPutDiv.push("</div>");								
						   outPutDiv.push("</a>");
						   outPutDiv.push("<a href='"+url+"' target='_blank'><button type='button' class='btn btn-outline-success'>See Event Details</button></a>");
						   offers = events[key].offers;
						   
						   outPutDiv.push("<table class='table'>");
						   outPutDiv.push("<thead class='thead-light'><tr><th>&nbsp;&nbsp;Offer&nbsp;&nbsp;</th><th>&nbsp;&nbsp;Status&nbsp;&nbsp;</th></tr></thead>");
		
						   
							outPutDiv.push("<tbody>");
						   $.each( offers, function( index, value ) {
								outPutDiv.push("<tr>");
									outPutDiv.push("<td>&nbsp;&nbsp;"+offers[index]["type"] +"&nbsp;&nbsp;</td>");
									outPutDiv.push("<td>&nbsp;&nbsp;"+offers[index]["status"] +"&nbsp;&nbsp;</td>");
								outPutDiv.push("</tr>");;
						   });
						
						   outPutDiv.push("</tbody>");						   
						   outPutDiv.push("</table></br></br></br>");				
					});
				
					$("#nextEvents").html(outPutDiv);				
					
				});// post end
				$('html, body').animate({
					scrollTop: $("#mainArtistName").offset().top - 110
				}, 2000);					
			}else
				$("#nextEvents").html('');
		
			
			
		}

	});// post end




}


