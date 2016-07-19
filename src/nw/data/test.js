var elem	= document.getElementById ( "hnmain" );
elem.addEventListener	( "click", function (e) {
		//console.log ( "klik" );
		elem.setAttribute ( "name", "pamparapam" );
		console.log ( elem.offsetWidth );
		console.log ( "atrybut: ", elem.getAttribute ( "name" ) );
		self.port.emit ( "test", "pamparapam" );
		e.stopPropagation();
		e.preventDefault();
	}
);