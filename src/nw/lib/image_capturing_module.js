function wykonaj_zrzut_ekranu ( obszar_zrzutu_ekranu ) {
	var bierzące_okno_przeglądarki				=	require ( "sdk/window/utils" ).getMostRecentBrowserWindow ();
	var bierząca_karta_w_bierzącym_oknie		=	require ( "sdk/tabs/utils" ).getActiveTab ( bierzące_okno_przeglądarki );
	var miejsce_na_zrzut_ekranu					=	bierzące_okno_przeglądarki.document.createElementNS ( "http://www.w3.org/1999/xhtml", "canvas" );
	var strona_w_bierzącej_karcie				=	bierząca_karta_w_bierzącym_oknie.linkedBrowser.contentWindow;
	
	miejsce_na_zrzut_ekranu.width				=	obszar_zrzutu_ekranu.szerokość;
	miejsce_na_zrzut_ekranu.height				=	obszar_zrzutu_ekranu.wysokość;
	
	var renderer_strony							=	miejsce_na_zrzut_ekranu.getContext ( "2d" );
	
	przygotowanie_strony_do_zrzutu_ekranu		(	"ukryj_paski", strona_w_bierzącej_karcie );
	console.log (	typeof strona_w_bierzącej_karcie, "\n",
					typeof obszar_zrzutu_ekranu, "\n",
					obszar_zrzutu_ekranu.współrzędne.x, "\n",
					miejsce_na_zrzut_ekranu.width, "\n" );
	renderer_strony.drawWindow					(	strona_w_bierzącej_karcie,
													obszar_zrzutu_ekranu.współrzędne.x,
													obszar_zrzutu_ekranu.współrzędne.y,
													miejsce_na_zrzut_ekranu.width,
													miejsce_na_zrzut_ekranu.height,
													"rgb(255,255,255)"
												);
	przygotowanie_strony_do_zrzutu_ekranu		(	"odkryj_paski", strona_w_bierzącej_karcie );
	
	pobierz_wykonany_zrzut_ekranu ( miejsce_na_zrzut_ekranu, strona_w_bierzącej_karcie );
}
function przygotowanie_strony_do_zrzutu_ekranu ( co_zrobić, strona_na_której_zrobić ) {
	console.log ( "rozpoczęto przygotowanie strony do zrzutu ekranu..." );
	let elementy_do_ukrycia		= zwróć_elementy_do_ukrycia ( strona_na_której_zrobić );
	console.log ( "> ilość elementów do ukrycia: ", elementy_do_ukrycia.length );
	if ( co_zrobić === "ukryj_paski" ) {
		for ( let element in elementy_do_ukrycia ) {
			let tmp = elementy_do_ukrycia[element];
			if ( tmp.akcja === "display" ) {
				tmp.element.style.display		= "none";
			}
			else if ( tmp.akcja === "visibility" ) {
				tmp.element.style.visibility	= "hidden";
			}
		}
	}
	else if ( co_zrobić === "odkryj_paski" ) {
		for ( let e in elementy_do_ukrycia ) {
			elementy_do_ukrycia[e].element.removeAttribute ( "style" );
		}
	}
	console.log ( "zakończono przygotowanie strony do zrzutu ekranu..." );
}
function zwróć_elementy_do_ukrycia ( strona_na_której_szukać ) {
	var elementy_do_ukrycia	= [];
	
	if ( strona_na_której_szukać === undefined )
		return elementy_do_ukrycia;
	
	function dodaj_grupę_elementów ( grupa_elementów, co_z_nimi_zrobić ) {
		for ( let p = 0, k = grupa_elementów.length; p < k; ++p ) {
			elementy_do_ukrycia.push ( {	element	:	grupa_elementów[p],
											akcja	:	co_z_nimi_zrobić
										} ) ;
		}
	}
	
	dodaj_grupę_elementów ( strona_na_której_szukać.document.getElementsByClassName ( "responsive-menu" ),
							"visibility" );
	dodaj_grupę_elementów ( strona_na_której_szukać.document.getElementsByClassName ( "embed-button" ),
							"display" );
	elementy_do_ukrycia.push (	{	element	: strona_na_której_szukać.document.getElementsByClassName ( "annotation type-alert type-permanent lspace m-reset-position closableContainer cookie" )[0],
									akcja	: "display"
								} );
	elementy_do_ukrycia.push (	{	element	: strona_na_której_szukać.document.getElementById ( "nav" ),
									akcja	: "display"
								} );
	return elementy_do_ukrycia;
}
function pobierz_wykonany_zrzut_ekranu ( miejsce_na_zrzut_ekranu, strona_na_której_został_wykonany ) {
	var element_do_przechowania_zrobionego_obrazu		=	strona_na_której_został_wykonany.document.createElement ( "a" );
	element_do_przechowania_zrobionego_obrazu.href		=	miejsce_na_zrzut_ekranu.toDataURL();
	element_do_przechowania_zrobionego_obrazu.download	=	"test.png";
	element_do_przechowania_zrobionego_obrazu.target	=	"_blank";
	
	var element_tymczasowy	=	strona_na_której_został_wykonany.document.getElementsByClassName ( "entry iC" )[0];
	element_tymczasowy		=	element_tymczasowy.appendChild ( element_do_przechowania_zrobionego_obrazu );
	element_tymczasowy.click();
	element_tymczasowy.remove();
}

exports.wykonaj_zrzut_ekranu	= wykonaj_zrzut_ekranu;
