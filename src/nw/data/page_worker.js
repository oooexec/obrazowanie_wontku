
self.port.on ( "usuń_przyciski", usuń_wszystkie_dodane_przyciski );
dodaj_przyciski_na_stronę();

//////////////////////////////
//POCZĄTEK FUNKCJI USUWAJĄCYCH
function usuń_wszystkie_dodane_przyciski () {
	 //zmienić nazwę clsuuid i to co wysyła self.port.emit
	 var lista_przycisków	=	document.getElementsByClassName ( self.options.clsuuid );
	 while ( lista_przycisków.length > 0 ) {
		 let przycisk	= lista_przycisków[0];
		 przycisk.removeEventListener ( "click", działanie_po_naciśnięciu_przycisku );
		 przycisk.remove();
	 }
	 self.port.emit ( "usunięto", "usunięto" );
}
//KONIEC FUNKCJI USUWAJĄCYCH
////////////////////////////

////////////////////////////////////////////////////
//POCZĄTEK FUNKCJI TWORZĄCYCH I DODAJĄCYCH PRZYCISKI
function dodaj_przyciski_na_stronę () {
	let wpisy_na_stronie	=	document.getElementsByClassName ( "wblock lcontrast dC" );
	
	for ( var p = 0, k = wpisy_na_stronie.length; p < k; ++p ) {
		let element_do_którego_dodać_przycisk	=	wpisy_na_stronie[p].getElementsByClassName ( "responsive-menu" );
		if ( element_do_którego_dodać_przycisk[0] === undefined )
			continue;
		element_do_którego_dodać_przycisk[0].appendChild ( stwórz_przycisk ( "Zrób zdjęcie wątku."		, "wątek" ) );
		element_do_którego_dodać_przycisk[0].appendChild ( stwórz_przycisk ( "Zrób zdjęcie wpisowi."	, "wpis"  ) );
	}
}
function stwórz_przycisk ( opis_przycisku, rodzaj_przycisku ) {
	let odnośnik			= nowy_element_html ( "a", {
								"class"		:	"affect hide",
								"href"		:	"javascript:void(0);",
								"rodzaj"	:	rodzaj_przycisku } );
	let element_listy		= nowy_element_html ( "li", {
								"class"		:	self.options.clsuuid,
								"rodzaj"	:	rodzaj_przycisku } );
	let styl				= nowy_element_html ( "style", {
								"type"		:	"text/css",
								"rodzaj"	:	rodzaj_przycisku },
								".fa-aparat:before { content : \"\\f030\"; margin-right: 4px; }" );
	let aparat				= nowy_element_html ( "i", {
								"class"		:	"fa fa-aparat",
								"rodzaj"	:	rodzaj_przycisku } );
	odnośnik.appendChild		( styl   );
	odnośnik.appendChild		( aparat );
	odnośnik.appendChild		( document.createTextNode ( opis_przycisku )  );
	odnośnik.addEventListener	( "click", działanie_po_naciśnięciu_przycisku );
	element_listy.appendChild	( odnośnik );
	
	return element_listy;
}
function nowy_element_html ( nazwa_elementu_do_stworzenia, atrybuty_elementu, innerHTML ) {
	var element_html		=	document.createElement ( nazwa_elementu_do_stworzenia );
	
	if ( atrybuty_elementu !== undefined )
		for ( var atrybut in atrybuty_elementu )
			element_html.setAttribute ( atrybut, atrybuty_elementu[atrybut] );
			
	if ( innerHTML !== undefined )
		element_html.innerHTML = innerHTML;
		
	return element_html;
}
function działanie_po_naciśnięciu_przycisku ( event ) {
	console.log ( "> wysłana wiadomość \"zrób zrzut ekranu w przekazanym obszarze\"" );
	self.port.emit ( "zrób_zrzut_ekranu_w_przekazanym_obszarze", oblicz_obszar_zrzutu_ekranu ( event.target ) );
}
//KONIEC FUNKCJI TWORZĄCYCH I DODAJĄCYCH PRZYCISKI
//////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////
//POCZĄTEK FUNKCJI OBLICZAJĄCYCH OBSZAR ZRZUTU EKRANU DO ZROBIENIA
function oblicz_obszar_zrzutu_ekranu ( przycisk_w_elemencie_do_analizy ) {
	console.log ( "rozpoczęto obliczanie obszaru zrzutu ekranu..." );
	var element_do_analizy		=	wyszukaj_element_do_analizy ( przycisk_w_elemencie_do_analizy );
	if 	(element_do_analizy === null ) return null;
	
	var obszar_zrzutu_ekranu			=	{};
	obszar_zrzutu_ekranu.współrzędne	=	oblicz_współrzędne_elementu_do_analizy ( element_do_analizy );
	obszar_zrzutu_ekranu.szerokość		=	element_do_analizy.offsetWidth;
	obszar_zrzutu_ekranu.wysokość		=	element_do_analizy.offsetHeight;
	
	console.log ( "zakończono obliczanie obszaru zrzutu ekranu..." );
	return obszar_zrzutu_ekranu;
}
function wyszukaj_element_do_analizy ( przycisk_w_elemencie_do_analizy ) {
	var element_to_wpis_czy_wątek	=	przycisk_w_elemencie_do_analizy.getAttribute ( "rodzaj" );
	var klasa_elementu_do_analizy;
	
	if		( element_to_wpis_czy_wątek === "wpis"	)	klasa_elementu_do_analizy = "wblock lcontrast dC";
	else if	( element_to_wpis_czy_wątek === "wątek"	)	klasa_elementu_do_analizy = "entry iC";
	
	for (	var element_do_analizy = przycisk_w_elemencie_do_analizy;
			element_do_analizy !== null;
			element_do_analizy = element_do_analizy.parentElement		) {
		
		let klasa_elementu	=	element_do_analizy.getAttribute ( "class" );
		if ( klasa_elementu !== null && klasa_elementu.indexOf ( klasa_elementu_do_analizy ) > -1 )
			break;
	}
	
	return element_do_analizy;
}
function oblicz_współrzędne_elementu_do_analizy ( element_do_analizy ) {
	var współrzędne = {};
	współrzędne.x	=	(element_do_analizy.offsetLeft - element_do_analizy.scrollLeft + element_do_analizy.clientLeft);
	współrzędne.y	=	(element_do_analizy.offsetTop  - element_do_analizy.scrollTop  + element_do_analizy.clientTop );
	return współrzędne;
}
//KONIEC FUNKCJI OBLICZAJĄCYCH OBSZAR ZRZUTU EKRANU DO ZROBIENIA
////////////////////////////////////////////////////////////////


/*
function utwórz_przycisk ( opis, rodzaj ) {
	let link				= nowy_element ( "a", {
								"class"		:	"affect hide",
								"href"		:	"javascript:void(0);",
								"rodzaj"	:	rodzaj } );
	let przycisk			= nowy_element ( "li", {
								"class"		:	self.options.clsuuid,
								"rodzaj"	:	rodzaj } );
	let tmp_styl			= nowy_element ( "style", {
								"type"		:	"text/css",
								"rodzaj"	:	rodzaj },
								".fa-aparat:before { content : \"\\f030\"; margin-right: 4px; }" );
	let tmp					= nowy_element ( "i", {
								"class"		:	"fa fa-aparat",
								"rodzaj"	:	rodzaj } );
	
	link.appendChild		( tmp_styl );
	link.appendChild		( tmp );
	link.appendChild		( document.createTextNode ( opis ) );
	link.addEventListener	( "click", obsługa_naciśnięcia );
	przycisk.appendChild 	( link );
	//przycisk.addEventListener	( "click", obsługa_naciśnięcia );
	return przycisk;
}*/



/*
function szczegóły_zdjęcia ( element ) {
	for ( var e in element )
		console.log ( e, "\t", element[e] );
	var	rodzaj		= element.getAttribute ( "rodzaj" );
	var szukany;
	if 		( rodzaj === "wpis" )	szukany = "wblock lcontrast dC";
	else if	( rodzaj === "wątek" )	szukany = "entry iC";
	console.log ( szukany );
	//var szukany		= (rodzaj === "wpis") ? "wblock lcontrast dC" : "entry iC";
	//while ( ( element = element.parentElement ) && !element.classList.contains ( szukany ) );
	while ( element !== null ) {
		//let tmp	= element.getElementsByClassName ( szukany );
		let tmp		= element.getAttribute ( "class" );
		console.log ( tmp, "\t\t", szukany );
		if ( tmp !== null && tmp.indexOf ( szukany ) > -1 ) {
			console.log ( "znaleziono ", element.innerHTML );
			break;
		}
		element = element.parentElement;
	}
	var szczegóły	= {};
	if ( element === null )
		return szczegóły;

	var oblicz_xy	= function ( element ) {
		var wsp	= {};
		wsp.x	= (element.offsetLeft - element.scrollLeft + element.clientLeft);
		wsp.y	= (element.offsetTop - element.scrollTop + element.clientTop);
		return wsp;
	}

	let tmp							= oblicz_xy ( element );
	szczegóły.x						= tmp.x;
	szczegóły.y						= tmp.y;
	szczegóły.szerokość				= element.offsetWidth;
	szczegóły.wysokość				= element.offsetHeight;

	
	/*for ( var e in szczegóły )
		console.log ( e, "\t:\t", szczegóły[e] );*/
/*
	return szczegóły;
}
*/
 
 /*
 var usuń_elementy = function () {
	console.log		( "> usuwam elementy..." );
	var elementy	=	document.getElementsByClassName ( self.options.clsuuid );
	while ( elementy.length > 0 ) {
		var element = elementy[0];
		element.removeEventListener ( "click", obsługa_naciśnięcia );
		element.remove();
	}
	self.port.emit	( "usunięto", "usunięto" );
}
*/

//self.port.on ( "usuń_elementy", usuń_elementy );

//dodaj_przyciski();
  
/*
function obsługa_naciśnięcia ( event ) {
	self.port.emit ( "wykonaj_zdjęcie", szczegóły_zdjęcia ( event.target ) );//event.target.getAttribute("rodzaj") );
}
*/


/*
function dodaj_przyciski() {
	//let wątki		=	document.getElementsByClassName ( "entry iC" );
	let wpisy		=	document.getElementsByClassName ( "wblock lcontrast dC" );
	for ( var p = 0, k = wpisy.length; p < k; ++p ) {
		let miejsce	= wpisy[p].getElementsByClassName ( "responsive-menu" );
		if ( miejsce[0] === undefined ) continue;
		miejsce[0].appendChild ( utwórz_przycisk ( "Zrób zdjęcie wątku."	, "wątek" ) );
		miejsce[0].appendChild ( utwórz_przycisk ( "Zrób zdjęcie wpisowi."	, "wpis" ) );
	}
}
*/

//var wątki	= pobierz_wątki();
//var ewent_f	= null;

/*
for ( var wątek in wątki )
	wątki[wątek].dodaj_przyciski();
pobierz_wątki().dodaj_przyciski();*/
//dodaj_przyciski();

/*
for ( var p = 0, k = wątki.length; p < k; ++p ) {
	dodaj_przyciski_zadań_fotograficznych_do_wpisów (
		pobierz_wpisy_w_wątku ( 
			wątki[p]
		),
		p
	);
}



*/
/*


function pobierz_wątki () {
	//Funkcja zwraca wątki na stronie.
	let wątki				= {};
	wątki.wątki				= document.getElementsByClassName ( "entry iC" );
	wątki.dodaj_przyciski	= dodaj_przyciski;
	return wątki;
}

function dodaj_przyciski () {
	
}

function pobierz_pierwszy_wpis_w_wątku ( wątek ) {
	//Funkcja pobiera wątek i zwraca pierwszy wpis. (Wpis rozpoczynający wątek.)
	let wpis = wątek.getElementsByClassName ( "wblock lcontrast dC" );
	return wpis[0];
}
function pobierz_wpisy_w_wątku ( wątek ) {
	let wpisy = wątek.getElementsByClassName ( "wblock lcontrast dC" );
	return wpisy;
}
function dodaj_przyciski_zadań_fotograficznych_do_wpisu ( wpis, wątek ) {
	let miejsce = wpis.getElementsByClassName ( "responsive-menu" );
	if ( miejsce !== undefined && miejsce.length === 1) {
		miejsce[0].appendChild 	( utwórz_przycisk ( "Zrób zdjęcie wątku.", "wątek", wątek ) );
		miejsce[0].appendChild 	( utwórz_przycisk ( "Zrób zdjęcie wpisu.", "wpis", wpis ) );
	}
}
function dodaj_przyciski_zadań_fotograficznych_do_wpisów ( wpisy, wątek ) {
	for ( var p = 0, k = wpisy.length; p < k; ++p ) {
		dodaj_przyciski_zadań_fotograficznych_do_wpisu ( wpisy[p], wątek );
	}
}


function utwórz_przycisk ( opis, rodzaj, arg, element ) {
	let link				= nowy_element ( "a", {
								"class"		:	"affect hide",
								"href"		:	"javascript:void(0);" } );
	let przycisk			= nowy_element ( "li", {
								"class"		:	self.options.clsuuid } );
	let tmp_styl			= nowy_element ( "style", {
								"type"		:	"text/css" },
								".fa-aparat:before { content : \"\\f030\"; margin-right: 4px; }" );
	let tmp					= nowy_element ( "i", {
								"class"		:	"fa fa-aparat" } );
	
	link.appendChild		( tmp_styl );
	link.appendChild		( tmp );
	link.appendChild		( document.createTextNode ( opis ) );
	przycisk.appendChild 	( link );
	var foo					= function ( event ) {
		self.port.emit ( "zrób_zdjęcie_wątku", { "rodzaj" : rodzaj, "arg" : arg } );
		event.stopPropagation();
		event.preventDefault();
		//console.log ( "nadano" );
	}
	ewent_f					=	foo;
	przycisk.addEventListener	( "click", foo );
	return przycisk;
}*/
