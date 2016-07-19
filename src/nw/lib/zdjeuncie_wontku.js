//Moduł robiący zdjęcia wątków lub wpisów na mikroblogu wykop.pl.
var modyfikacja	=	null;
var strony		=	[];

var dołączanie	=	function ( strona ) {
	strona.on ( "detach", function () { usuń_z_tablicy ( strona, strony ) } );
	strona.port.on ( "wykonaj_zdjęcie", function ( szczegóły )	{ 
																	//console.log ( "pstryk" );
																	require ( "./rysuj_element" ).zrób_zdjęcie ( szczegóły );
																} );
	strony.push ( strona );
}

function usuń_z_tablicy(strona, strony) {
  var i = strony.indexOf(strona);
  if(i != -1) {
    strony.splice(i, 1);
  }
}

function włącz () {
	//Identyfikator dla atrybutu class, dla tworzonych elementów w celu łatwego usuwania i wyszukiwania.
	var class_uuid	=	"a44878333439149524124026";//String(require ( "sdk/util/uuid" ).uuid()).replace ( /[^0-9]/g,"" );
	//console.log ( "> rozpoczęto włączanie..." );
	var strony	=	[	"http://www.wykop.pl/mikroblog/*",
						"http://www.wykop.pl/tag/*",
						"http://www.wykop.pl/wpis/*"
					];
	page_mod	= require ( "sdk/page-mod" );
	modyfikacja = page_mod.PageMod ( {
		include					:	strony,
		contentScriptFile		:	require ( "sdk/self" ).data.url ( "oznacz_wpisy.js" ),
		attachTo				:	[ "existing", "top" ],
		contentScriptOptions	:	{ clsuuid : class_uuid },
		//onError					:	obsługa_błędów,
		onAttach				:	dołączanie
	} );
	//console.log ( "> włączanie zakończone" );
}

function obsługa_błędów () {
	console.log ( "> BŁĄD!" );
}

function wyłącz () {
	console.log ( "> rozpoczęto wyłączanie..." );
	var licznik = strony.length;
	var tmp_licznik = 0;
	if ( licznik > 0 ) {
		var f_koniec = function () {
			console.log ( "odbiór" );
			modyfikacja.destroy()
			console.log ( "> wyłączanie zakończone (odbyło się usuwanie)" );
		}
		modyfikacja.port.on ( "usunięto", f_koniec );
		for ( e in strony ) {
			console.log ( typeof strony[e] );
			console.log ( "wiadomość: usuń" );
			strony[e].port.emit ( "usuń_elementy", "usuń" );
		}
	}
	else {
		modyfikacja.destroy();
		console.log ( "> wyłączanie zakończone" );
	}
}

exports.włącz	= włącz;
exports.wyłącz	= wyłącz;