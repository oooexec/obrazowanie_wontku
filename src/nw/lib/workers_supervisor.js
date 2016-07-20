var pejdż_mod				=	null;
var page_workers_list		=	[];

var worker_attached_to_page_action	=	function ( worker ) {
	worker.on		(	"detach", function () { remove_worker_from_workers_list ( worker, page_workers_list ) } );
	worker.port.on	(	"zrób_zrzut_ekranu_w_przekazanym_obszarze", 
						function ( obszar_zrzutu_ekranu )	{
													console.log ( "> wykonywanie zrzutu ekranu" ) ;
													require ( "./image_capturing_module.js" ).wykonaj_zrzut_ekranu ( obszar_zrzutu_ekranu );
												} );
	page_workers_list.push ( worker );
}
function remove_worker_from_workers_list ( worker, page_workers_list ) {
	var worker_index = page_workers_list.indexOf ( worker );
	if ( worker_index != -1)
		page_workers_list.splice ( worker_index, 1 );
}
function włącz_moduł () {
	console.log ( "> włączanie modułu rozpoczęte..." );
	//Identyfikator dla atrybutu class, dla tworzonych elementów w celu łatwego usuwania i wyszukiwania.
	var class_uuid	=	"a44878333439149524124026";
	var adresy_na_których_moduł_pracuje	=	[	"http://www.wykop.pl/mikroblog/*",
												"http://www.wykop.pl/tag/*",
												"http://www.wykop.pl/wpis/*"
											];
	pejdż_mod = require ( "sdk/page-mod" ).PageMod ( {
		include					:	adresy_na_których_moduł_pracuje,
		contentScriptFile		:	require ( "sdk/self" ).data.url ( "page_worker.js" ),
		attachTo				:	[ "existing", "top" ],
		contentScriptOptions	:	{ clsuuid : class_uuid },
		onAttach				:	worker_attached_to_page_action
	} );
	console.log ( "> włączanie modułu zakończone..." );
}
function wyłącz_moduł () {
	console.log ( "> wyłączanie modułu rozpoczęte..." );
	var licznik = page_workers_list.length;
	if ( licznik > 0 ) {
		var f_koniec = function () {
			pejdż_mod.destroy();
			console.log ( "> wyłączanie modułu zakończone..." );
		}
		pejdż_mod.port.on ( "usunięto", f_koniec );
		
		for ( worker in page_workers_list ) {
			console.log ( "> wysyłam wiadomość: \"usuń_elementy\"" );
			page_workers_list[worker].port.emit ( "usuń_przyciski", "usuń" );
		}
	}
	else {
		pejdż_mod.destroy();
	}
	console.log ( "> ilość łorkerów: ", licznik );
	if ( licznik > 0 )
		console.log ( "> wyłączanie modułu zakończone (funkcja główna, kiedy są łorkery to nie jest prawdziwe zakończenie)... są łorkery, czekaj na prawdziwe zakończenie" );
	else
		console.log ( "> wyłączanie modułu zakończone (funkcja główna, kiedy są łorkery to nie jest prawdziwe zakończenie)... brak łorkerów, to jest już koniec" );
}

exports.włącz_moduł		= włącz_moduł;
exports.wyłącz_moduł	= wyłącz_moduł;