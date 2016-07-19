function zrób_zdjęcie ( szczegóły ) {
	//for ( var e in szczegóły )
		//console.log ( e, "\t:\t", szczegóły[e] );
	//return;*/
	var okno = require('sdk/window/utils').getMostRecentBrowserWindow();
	var tab = require('sdk/tabs/utils').getActiveTab(okno);
	var obraz = okno.document.createElementNS("http://www.w3.org/1999/xhtml", "canvas");

	okno = tab.linkedBrowser.contentWindow;
	//var wpis = okno.document.getElementsByClassName ( "entry iC" )[1];
	obraz.width		= szczegóły.szerokość;//wpis.offsetWidth;
	obraz.height	= szczegóły.wysokość;//wpis.offsetHeight;
	
	var ctx = obraz.getContext("2d");
	
	var xx = szczegóły.x;//(wpis.offsetLeft - wpis.scrollLeft + wpis.clientLeft) ;
	var yy = szczegóły.y;//(wpis.offsetTop - wpis.scrollTop + wpis.clientTop) ;
	
	zarządzaj_paskami ( "ukryj", okno );
	ctx.drawWindow ( okno, xx, yy, obraz.width, obraz.height, "rgb(255,255,255)");
	zarządzaj_paskami ( "odkryj", okno );
	
	var el = okno.document.createElement ( "a" );
	el.href = obraz.toDataURL();
	el.download = "test.png";
	el.target = "_blank";
	((okno.document.getElementsByClassName ( "entry iC" ))[0].appendChild ( el ) ).click();
	//Przenieść do funkcji, a elementu usuwać po kliknięciu.
}

exports.zrób_zdjęcie	= zrób_zdjęcie;

function rozwiń_wątek ( wątek ) {
	do {
		let czy_coś_rozwinięto = false;
		czy_coś_rozwinięto = rozwiń_komentarze	( watek );
		czy_coś_rozwinięto = rozwiń_wpisy		( wątek );
		czy_coś_rozwinięto = rozwiń_obrazki		( wątek );
		czy_coś_rozwinięto = rozwiń_ukryte		( wątek );
	} while ( czy_coś_rozwinięto );
}

function zarządzaj_paskami ( akcja, okno, wpis ) {
	//Napisać obsługę błędów.
	//dozwolone wartości akcji to "ukruj" i "odkryj".
	let elementy_do_ukrycia	= [];
	if ( okno !== undefined ) {
		//elementy_do_ukrycia.push (
			//wpis.getElementsByClassName				( "row elements actions" )[0]
		//);
		//Dodane ponieważ przycisk "< embed > " pozostawał na zdjęciach wątku, pomimo ustawienia atrybutu visibility na hidden dla rodzica.
		//elementy_do_ukrycia.push (
			//{
				//element	: elementy_do_ukrycia[0].getElementsByClassName ( "embed-button" )[0],
				//akcja	: "display"
			//}
		//);
		var tmp = okno.document.getElementsByClassName	( "responsive-menu" );
		for ( let p = 0, k = tmp.length; p < k; ++p )
			elementy_do_ukrycia.push (
				{
					element	: tmp[p],
					akcja	: "visibility"
				}
			);
		tmp = okno.document.getElementsByClassName	( "embed-button" );
		for ( let p = 0, k = tmp.length; p < k; ++p )
			elementy_do_ukrycia.push (
				{
					element	: tmp[p],
					akcja	: "display"
				}
			);
		elementy_do_ukrycia.push (
			{
				element	: okno.document.getElementsByClassName	( "annotation type-alert type-permanent lspace m-reset-position closableContainer cookie" )[0],
				akcja	: "display"
			}
		);
		elementy_do_ukrycia.push (
			{
				element	: okno.document.getElementById			( "nav" ),
				akcja	: "display"
			}
		);
		//var ciastka		= okno.document.getElementsByClassName	( "annotation type-alert type-permanent lspace m-reset-position closableContainer cookie" )[0];
		//var menu			= okno.document.getElementById			( "nav" );
		
		//var ciastka		= okno.document.getElementsByClassName	( "annotation type-alert type-permanent lspace m-reset-position closableContainer cookie" )[0];
		//var menu			= okno.document.getElementById			( "nav" );
	}
	
	if ( akcja === "ukryj" ) {
		for ( let e in elementy_do_ukrycia ) {
			let tmp = elementy_do_ukrycia[e];
			if ( tmp.akcja === "display" ) {
				tmp.element.style.display		= "none";
			}
			else if ( tmp.akcja === "visibility" ) {
				tmp.element.style.visibility	= "hidden";
			}
			//Elementem o indeksie 1 musi być przycisk " < embed > ".
			/*
			if ( e === 1 ) {
				elementy_do_ukrycia[e].style.opacity	= 0.0;
				elementy_do_ukrycia[e].style.display	= "none";
				elementy_do_ukrycia[e].style.visibility	= "hidden";
			}*/
			//else {
				//elementy_do_ukrycia[e].style.visibility	= "hidden"; //	(akcja === "ukryj") ? "hidden" : "visible";
				//Działa ale to błędne roziwiązanie, które i tak wprowadza nowe problemy.
				//elementy_do_ukrycia[e].style.display	= "none"; //	(akcja === "ukryj") ? "hidden" : "visible";
				
			//}
		}
	}
	else if ( akcja === "odkryj" ) {
		for ( let e in elementy_do_ukrycia ) {
			elementy_do_ukrycia[e].element.removeAttribute ( "style" );
		}
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

/*
function aą() {
	var okno = require('sdk/window/utils').getMostRecentBrowserWindow();
	var tab = require('sdk/tabs/utils').getActiveTab(okno);
	var obraz = okno.document.createElementNS("http://www.w3.org/1999/xhtml", "canvas");

	okno = tab.linkedBrowser.contentWindow;
	var wpis = okno.document.getElementsByClassName ( "entry iC" )[1];

	//obraz.appendChild( wpis );
	obraz.width = wpis.offsetWidth;
	obraz.height = wpis.offsetHeight;
	
	var ctx = obraz.getContext("2d");
	
	var xx = (wpis.offsetLeft - wpis.scrollLeft + wpis.clientLeft) ;
	var yy = (wpis.offsetTop - wpis.scrollTop + wpis.clientTop) ;
	
	ctx.drawWindow ( okno, xx, yy, obraz.width, obraz.height, "rgb(255,255,255)");
	
	var el = okno.document.createElement ( "a" );
	el.href = obraz.toDataURL();
	el.download = "test.png";
	el.target = "_blank";
	((okno.document.getElementsByClassName ( "entry iC" ))[0].appendChild ( el ) ).click();
}
*/

//exports.rysuj_element = rysuj_element;
