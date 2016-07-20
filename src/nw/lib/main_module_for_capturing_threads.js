var wczytane_ustawienia_dodatku;
var zarządzanie_stanem_modułu;
var wygląd_ikony_przycisku;
var przycisk_modułu;

function inicjalizacja () {
	console.log ( "> inicjalizacja rozpoczęta..." );
	var	{ ToggleButton }					=	require ( "sdk/ui/button/toggle" );
	zarządzanie_stanem_modułu				=	require ( "./workers_supervisor.js" );
	wczytane_ustawienia_modułu				=	require ( "sdk/simple-prefs" ).prefs;
	wygląd_ikony_przycisku					=	pobierz_wygląd_ikony_przycisku( wczytane_ustawienia_modułu.ustawienie_onoff );
	
	przycisk_modułu							=	ToggleButton ( {
																	id			:	wygląd_ikony_przycisku.id,
																	label		:	wygląd_ikony_przycisku.opis,
																	icon		:	wygląd_ikony_przycisku.ikony,
																	onChange	:	przełączenie_stanu_modułu,
																	checked		:	!wczytane_ustawienia_modułu.ustawienie_onoff
																} ) ;

	require ( "sdk/simple-prefs" ).on ( "ustawienie_onoff",  działanie_po_naciśnięciu_opcji_ustawienie_onoff );
	
	if ( !przycisk_modułu.checked )
		zarządzanie_stanem_modułu.włącz_moduł();
	console.log ( "> inicjalizacja zakończona" );
}
function pobierz_wygląd_ikony_przycisku ( stan_przycisku ) {
	console.log ( "> pobieranie wyglądu ikony przycisku rozpoczęte..." );
	// true - niewciśnięty (włączony), false - wciśnięty (wyłączony)
	var wygląd_przycisku				= {};
	wygląd_przycisku.włączony_ikony		=	{	"16"	:	"./wuon16.png",
												"32"	:	"./wuon32.png",
												"64"	:	"./wuon64.png"
											};
	wygląd_przycisku.wyłączony_ikony	=	{	"16"	:	"./wyuon16.png",
												"32"	:	"./wyuon32.png",
												"64"	:	"./wyuon64.png"
											};
	wygląd_przycisku.włączony_opis		= "Dodatek jest włączony.";	
	wygląd_przycisku.wyłączony_opis		= "Dodatek jest wyłączony.";
	
	if ( stan_przycisku ) {
		wygląd_przycisku.ikony		=	wygląd_przycisku.włączony_ikony;
		wygląd_przycisku.opis		=	wygląd_przycisku.włączony_opis;	
	}
	else {			
		wygląd_przycisku.ikony		=	wygląd_przycisku.wyłączony_ikony;
		wygląd_przycisku.opis		=	wygląd_przycisku.wyłączony_opis;
	}
	
	wygląd_przycisku.id				= "onoff";
	
	console.log ( "> pobieranie wyglądu ikony przycisku zakończone..." );
	return wygląd_przycisku;
}
function działanie_po_naciśnięciu_opcji_ustawienie_onoff () { 
	przycisk_modułu.click();
};
function przełączenie_stanu_modułu() {
	//Czyli włączenie jeżeli wyłączony i odwrotnie.
	
	//Globalnie, dla wszystkich okien.
	this.state		( "window", null );
	this.checked	= !this.checked;
	
	require ( "sdk/simple-prefs" ).removeListener ( "ustawienie_onoff", działanie_po_naciśnięciu_opcji_ustawienie_onoff ) ;
	wczytane_ustawienia_modułu.ustawienie_onoff	= !this.checked;
	require ( "sdk/simple-prefs" ).on ( "ustawienie_onoff",  działanie_po_naciśnięciu_opcji_ustawienie_onoff );
	
	if ( this.checked ) {
		zarządzanie_stanem_modułu.wyłącz_moduł();
		this.label	=	wygląd_ikony_przycisku.wyłączony_opis;
		this.icon	=	wygląd_ikony_przycisku.wyłączony_ikony;
	}
	else {
		zarządzanie_stanem_modułu.włącz_moduł();
		this.label	=	wygląd_ikony_przycisku.włączony_opis;
		this.icon	=	wygląd_ikony_przycisku.włączony_ikony;
	}
}

exports.inicjalizacja = inicjalizacja;
