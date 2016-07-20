
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
