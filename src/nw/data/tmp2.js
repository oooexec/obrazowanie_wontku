
function włącz () {
	//console.log ( "> trwa włączanie..." );
	let	page_mod		= require ( "sdk/page-mod" );
	let to_ja_skrypt		= require ( "sdk/self" );
	
	let mod_mirko	= page_mod.PageMod ( {
		include				:	[
									"http://www.wykop.pl/mikroblog/*"	,
									"http://www.wykop.pl/tag/*"			,
									"http://www.wykop.pl/wpis/*"
								] ,
		contentScriptFile	:	to_ja_skrypt.data.url ( "oznacz_wpisy.js" )	,
		onAttach			:	słuchaj_mirko
	} );
	//console.log ( "> włączono" );
}

function słuchaj_mirko ( kontekst ) {
	kontekst.port.on	( "zrób_zdjęcie_wątku", zrób_zdjęcie );
}

function zrób_zdjęcie ( szczegóły ) {
	//console.log ( "klik" );
	let okno		= require('sdk/window/utils').getMostRecentBrowserWindow();
	let tab			= require('sdk/tabs/utils').getActiveTab(okno);
	let obraz		= okno.document.createElementNS("http://www.w3.org/1999/xhtml", "canvas");

	okno			= tab.linkedBrowser.contentWindow;
	let wpis		= (okno.document.getElementsByClassName ( "entry iC" ))[szczegóły.arg];

	obraz.width		= wpis.offsetWidth;
	obraz.height	= wpis.offsetHeight;
	
	let ctx			= obraz.getContext("2d");
	
	let xx			= (wpis.offsetLeft - wpis.scrollLeft + wpis.clientLeft) ;
	let yy			= (wpis.offsetTop - wpis.scrollTop + wpis.clientTop) ;
	
	//Zaimplementować rozwinięcie wątku, aby po zrobieniu zdjęcia został zwinięty.
	let tmp = wpis;
	rozwiń_wątek ( wpis );

	//Bez ukrycia paski "Ciastka!" i "Menu wykopu", będą na zdjęciu".
	
	//Zmodyfikować tak, aby pobierane elementy do ukrycia i odkrycia były pobierane tylko raz
	//Zamiast za każdym wywołaniem funkcji zarządzaj_paskami
	zarządzaj_paskami ( "ukryj", okno, wpis )//, "paski_duże" );
	//zarządzaj_paskami ( "ukryj", okno, "pasek_mały" );
	ctx.drawWindow ( okno, xx, yy, obraz.width, obraz.height, "rgb(255,255,255)");
	zarządzaj_paskami ( "odkryj", okno, wpis );//, "paski_duże" );
	//zarządzaj_paskami ( "odkryj", okno, "pasek_mały" );
	//Zwinięcie wątku
	let rodzic	=	wpis.parentNode;
	wpis 		= 	rodzic.replaceChild ( tmp, wpis );
	
	pobierz_zdjęcie ( obraz, okno );

}

function rozwiń_wątek ( wpis ) {
	var wincyj	= wpis.getElementsByClassName ( "more" );

	for ( var p = 0, k = wincyj.length; p < k; ++p ) {
		var tmp = wincyj[p].getElementsByClassName ( "affect ajax" );
		tmp[0].click();
	}
	var currentTime = new Date().getTime();

}

function zarządzaj_paskami ( akcja, okno, wpis ) {
	//Napisać obsługę błędów.
	//dozwolone wartości akcji to "ukruj" i "odkryj".
	let elementy_do_ukrycia	= [];
	if ( okno !== undefined ) {
		elementy_do_ukrycia.push (
			wpis.getElementsByClassName				( "row elements actions" )[0]
		);
		//Dodane ponieważ przycisk "< embed > " pozostawał na zdjęciach wątku, pomimo ustawienia atrybutu visibility na hidden dla rodzica.
		elementy_do_ukrycia.push (
			elementy_do_ukrycia[0].getElementsByClassName ( "embed-button" )[0]
		);
		elementy_do_ukrycia.push (
			okno.document.getElementsByClassName	( "annotation type-alert type-permanent lspace m-reset-position closableContainer cookie" )[0]
		);
		elementy_do_ukrycia.push (
			okno.document.getElementById			( "nav" )
		);
		//var ciastka		= okno.document.getElementsByClassName	( "annotation type-alert type-permanent lspace m-reset-position closableContainer cookie" )[0];
		//var menu			= okno.document.getElementById			( "nav" );
		
		//var ciastka		= okno.document.getElementsByClassName	( "annotation type-alert type-permanent lspace m-reset-position closableContainer cookie" )[0];
		//var menu			= okno.document.getElementById			( "nav" );
	}
	
	if ( akcja === "ukryj" ) {
		for ( let e in elementy_do_ukrycia ) {
			//Elementem o indeksie 1 musi być przycisk " < embed > ".
			if ( e === 1 ) {
				elementy_do_ukrycia[e].style.opacity	= 0.0;
				elementy_do_ukrycia[e].style.display	= "none";
				elementy_do_ukrycia[e].style.visibility	= "hidden";
			}
			else {
				elementy_do_ukrycia[e].style.visibility	= "hidden"; //	(akcja === "ukryj") ? "hidden" : "visible";
				//Działa ale to błędne roziwiązanie, które i tak wprowadza nowe problemy.
				//elementy_do_ukrycia[e].style.display	= "none"; //	(akcja === "ukryj") ? "hidden" : "visible";
				
			}
		}
	}
	else if ( akcja === "odkryj" ) {
		for ( let e in elementy_do_ukrycia )
				elementy_do_ukrycia[e].removeAttribute ( "style" );
	}
	/*
	if ( akcja === "ukryj" ) {
		ciastka.style.visibility	= "hidden";
		menu.style.visibility		= "hidden";
	}
	else if ( akcja === "odkryj" ) {
		ciastka.style.visibility	= "visible";
		menu.style.visibility		= "visible";
	}
	*/
}

function pobierz_zdjęcie ( obraz, okno ) {
	let el = okno.document.createElement ( "a" );
	el.href = obraz.toDataURL();
	el.download = "test.png";
	el.target = "_blank";
	let elem = (okno.document.getElementsByTagName ( "body" ) )[0];
	let link = elem.appendChild ( el );
	link.click();
	elem.removeChild ( el );
}

exports.włącz	=	włącz;