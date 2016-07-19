function inicjalizacja () {
	
	// Załadowanie modułu obsługującego przycisk typu toggle
	var	{ ToggleButton }		=	require ( "sdk/ui/button/toggle" );
	
	var zdjęcie_wątku			=	require ( "./zdjeuncie_wontku" );
	var ustawienie_dodatku		=	require ( "sdk/simple-prefs" ).prefs;
	var parametry_ikony			=	pobierz_parametry_ikony( ustawienie_dodatku.ustawienie_onoff );
	var zdjęcie_wątku			=	require ( "./zdjeuncie_wontku" );
	
	var przełącz_z_opcji		=	function () { wł_wyłącz_dodatek.click(); };
	
	var przełącz = function ( ) {
		this.state ( "window", null );
		this.checked								= !this.checked;
		require ( "sdk/simple-prefs" ).removeListener ( "ustawienie_onoff", przełącz_z_opcji ) ;
		ustawienie_dodatku.ustawienie_onoff			= !this.checked;
		require ( "sdk/simple-prefs" ).on ( "ustawienie_onoff",  przełącz_z_opcji );
		if ( this.checked ) {
			zdjęcie_wątku.wyłącz();
			this.label	=	parametry_ikony.wyłączony_opis;
			this.icon	=	parametry_ikony.wyłączony_ikony;
		}
		else {
			zdjęcie_wątku.włącz();
			this.label	=	parametry_ikony.włączony_opis;
			this.icon	=	parametry_ikony.włączony_ikony;
		}
	}
	
	require ( "sdk/simple-prefs" ).on ( "ustawienie_onoff",  przełącz_z_opcji );
	var wł_wyłącz_dodatek		=	ToggleButton ( {
									id			:	parametry_ikony.id,
									label		:	parametry_ikony.opis,
									icon		:	parametry_ikony.ikony,
									onChange	:	przełącz,
									checked		:	!ustawienie_dodatku.ustawienie_onoff
								} ) ;
	//
	if ( !wł_wyłącz_dodatek.checked )
		zdjęcie_wątku.włącz();
}

function pobierz_parametry_ikony ( włwył ) {
	// true - włączony, false - wyłączony
	var parametry				= {};
	parametry.włączony_ikony	=	{
									"16"	:	"./wuon16.png",
									"32"	:	"./wuon32.png",
									"64"	:	"./wuon64.png"
									};
	parametry.wyłączony_ikony	=	{
									"16"	:	"./wyuon16.png",
									"32"	:	"./wyuon32.png",
									"64"	:	"./wyuon64.png"
									};
	parametry.włączony_opis		= "Dodatek jest włączony.";	
	parametry.wyłączony_opis	= "Dodatek jest wyłączony.";
	if ( włwył ) {
		parametry.ikony		=	parametry.włączony_ikony;
		parametry.opis		=	parametry.włączony_opis;	
	}
	else {			
		parametry.ikony		=	parametry.wyłączony_ikony;
		parametry.opis		=	parametry.wyłączony_opis;
	}
	parametry.id				= "onoff";
	return parametry;
}

function test_oznacz_wpisy_js () {
	var { ActionButton }	= require ( "sdk/ui/button/action" );
	var przycisk			= ActionButton ( {
									id		:	"przycisk_akcji",
									label	:	"test skryput zdjeuncie_wontku.js",
									icon	:	{ "32" : "./i32.png" },
									onClick	:	require ( "./zdjeuncie_wontku" ).włącz
								} );
}

exports.inicjalizacja = inicjalizacja;
exports.test_oznacz_wpisy_js = test_oznacz_wpisy_js