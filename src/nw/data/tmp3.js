/* Typ skryput		:	content-script
 * 
 * Cele skryput		:	1. Dodanie do każdego wpisu na stronie "przyci-
 * 						sków", do robienia zjęć wątkowi lub wpisowi.
 * 						2. Usunięcie wszystkich dodanych "przycisków".
 * 
 * Opis działania	:		Skrypt jest dołączany do strony np. poprzez 
 * 						"sdk/page-mod". Po dołączeniu, wykonuje się.
 * 						Takie wykonanie, spowoduje, dodanie na stronie, 
 * 						dla której jest uruchomiony, "przycisków" do ro-
 * 						bienia zdjęć wątkowi lub wpisowi. Dodawane są o-
 * 						ne w ukrywającym się pasku każdego wpisu.
 * 							Każdy dodany "przycisk" posiada atrybut 
 * 						class, którego wartość to "a{uuid}", gdzie
 * 						{uuid} to uuid bez nawiasów klamrowych i myślni-
 * 						ków. Wartość ta jest stała. Ustawiona jest ona
 * 						w kodzie dodatku. Celem tej wartości, jest łatwa
 * 						identyfikacja utworzonych elementów, do celów 
 * 						ich usuwania i identyfikowania.
 * 							USUWANIE ELEMENTÓW. Skrypt nasłuchuje wiado-
 * 						mości "usuń_elementy". Po jej otrzymaniu, usuwa 
 * 						wszystkie dodane wcześniej "przyciski". Po zako-
 * 						ńczeniu usuwania, emituje wiadomość "usunięto". 
 * 						WAŻNE: Na opisanym procesie usuwania, polega mo-
 * 						duł "zdjeuncie_wontku.js". Weź to pod uwagę pod-
 * 						czas modyfikacji, ponieważ np. zmiana nazw wia-
 * 						domości w jednym miejscu spowoduje błędne wyko-
 * 						nywanie się dodatku.
 */

var wątki	= pobierz_wątki();
var ewent_f	= null;

/*
for ( var wątek in wątki )
	wątki[wątek].dodaj_przyciski();
pobierz_wątki().dodaj_przyciski();*/


for ( var p = 0, k = wątki.length; p < k; ++p ) {
	dodaj_przyciski_zadań_fotograficznych_do_wpisów (
		pobierz_wpisy_w_wątku ( 
			wątki[p]
		),
		p
	);
}


var usuń_elementy = function () {
	//console.log		( "> usuwam elementy..." );
	var elementy	=	document.getElementsByClassName ( self.options.clsuuid );
	while ( elementy.length > 0 ) {
		var element = elementy[0];
		element.removeEventListener ( "click", ewent_f );
		element.remove();
	}
	self.port.emit	( "usunięto", "usunięto" );
}

self.port.on ( "usuń_elementy", usuń_elementy );

function pobierz_wątki () {
	//Funkcja zwraca wątki na stronie.
	let wątki = document.getElementsByClassName ( "entry iC" );
	return wątki;
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
function nowy_element ( nazwa, atrybuty, innerHTML ) {
	var element		=	document.createElement ( nazwa );
	if ( atrybuty !== undefined )
		for ( var a in atrybuty )
			element.setAttribute ( a, atrybuty[a] );
	if ( innerHTML !== undefined )
		element.innerHTML = innerHTML;
	return element;
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
}
