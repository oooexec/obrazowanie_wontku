/*
var page_mod	= require ( "/sdk/page-mod" );
var to_ja		= require ( "/sdk/self" );

var mod_mirko	= page_mod ( {
	include				:	[	"http://www.wykop.pl/mikroblog/*",
								"http://www.wykop.pl/tag/*" ,
								"http://www.wykop.pl/wpis/*" ],
	contentScriptFile	:	to_ja.data.url ( "oznacz_wpisy.js" ),
	onAttach			:	słuchaj_mirko
} );

function słuchaj_mirko ( kontekst ) {
	kontekst.port.on ( "zrób_zdjęcie_wątku", require ( "mirko_zdjecie_wątku" ).zdjęcie );
}
*/
//var buttons		= require ( "sdk/ui/button/action" );
//var selw		= require ( "sdk/self" );
//var tabs		= require ( "sdk/tabs" );

var button		= buttons.ActionButton ( {
	id		:	"ab",
	label	:	"label",
	icon	:	{
		"16"	:	"./i16.png",
		"32"	:	"./i32.png",
		"64"	:	"./i64.png"
	},
	onClick	:	foo//function () {
			//require ( "sdk/tabs" ).activeTab.attach ( {
		//		contentScriptFile: selw.data.url ( "test.js" )
			//} );
			//aą();
			/*require ( "sdk/tabs" ).activeTab.attach ( {
				contentScriptFile: self.data.url ( "rozwiń_wątek.js" )
			} )*/
	//}
} ) ;

var bar = function ( odp ) {
	let okno	= require ( "sdk/window/utils" ).getMostRecentBrowserWindow ();
	let tab		= require ( "sdk/tabs/utils" ).getActiveTab ( okno );
	okno		= tab.linkedBrowser.contentWindow;
	console.log ( "> ", odp );
	odp.innerHTML = "asdf";
	//for (  var n in odp )
		//console.log ( " > ", n );
	//console.log ( odp.offsetWidth );
	let tmp		= okno.document.getElementsByName ( odp );
	//tmp			= okno.document.getElementsByTagName ( "table" );
	//console.log ( "sprawdzam: ", tmp );
	//tmp		= okno.document.getElementById ( "identyfikator" );
	
	if ( tmp.length ) {
		for ( var p = 0, k = tmp.length; p < k; ++p ) {
			console.log ( "> ", tmp[p].getAttribute ( "name" ) );
			//console.log ( tmp[p].offsetWidth );
			tmp[p].removeAttribute ( "name" );
			//console.log ( "> ", tmp[p].getAttribute ( "name" ) );
			//console.log ( tmp[ odp ] );
			console.log ( "koniec" );
		}
	}
}

function foo () {
	var w = tabs.activeTab.attach ( {
			contentScriptFile	:	selw.data.url ( "test.js" )
		} ) ;
	w.port.on ( "test", bar );
}

var page_mod	= require ( "sdk/page-mod" );
/*
var tmp_słuszec = page_mod.PageMod ( {
	include				:	[	"http://www.wykop.pl/mikroblog/*",
								"http://www.wykop.pl/tag/*" ,
								"http://www.wykop.pl/wpis/*" ],
	contentScriptFile	:	selff.data.url ( "oznacz_wpisy.js" ),
	onAttach			:	słuchaj
} ) ;*/
/*
function słuchaj ( sygnał ) {
	console.log ( "odbiór" );
	sygnał.port.on ( "test", function ( arg ) { console.log ( "dzieńdobry" ); console.log ( arg ); aą( arg ); } ) ;
	sygnał.port.on ( "wpis", function ( arg ) { console.log ( "odbiór" ); console.log ( arg ); aą( arg ); } ) ;
	sygnał.port.on ( "wątek", function ( arg ) { console.log ( "odbiór" ); console.log ( arg ); aą( arg ); } ) ;
	//sygnał.port.on ( "test", aą( arg ) ) ;
}*/

//self.port.on ( "test", function ( arg ) { console.log ( "odbiór" ); } ) ;
/*
function aą( arg ) {
	console.log ( "klik" );
	var okno = require('sdk/window/utils').getMostRecentBrowserWindow();
	var tab = require('sdk/tabs/utils').getActiveTab(okno);
	var obraz = okno.document.createElementNS("http://www.w3.org/1999/xhtml", "canvas");

	okno = tab.linkedBrowser.contentWindow;
	var wpis = (okno.document.getElementsByClassName ( "entry iC" ))[arg];
	console.log ( typeof arg );
	console.log ( arg );
	console.log ( arg.offsetWidth );
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
}*/