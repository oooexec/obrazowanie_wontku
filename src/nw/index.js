/* Typ skryptu		:	moduł
 * 
 * Cele skryptu		:	1. Uruchomienie samodzielnych modułów, które tworzą 
 * 						dodatek.
 * 
 * Opis działania	:		Całość dodatku zawiera się obecnie w jednym 
 * 						module "./lib/zdjencia_mod.js". Jest to samo-
 * 						dzielny moduł, co oznacza, że jeżeli znajdzie 
 * 						wszystkie swoje zależności, to powinien działać 
 *						bez wpływu inne dodane tu moduły.
 * 							"./lib/zdjencia_mod.js" to moduł odpowie-
 * 						dzialny za tworzenie zrzutów ekranów wątków 
 * 						i wpisów na mikroblogu portalu wykop.pl
 * 							URUCHOMIENIE DODATKU. Wywołaj metodę "ini-
 * 						cjalizacja każdego z głównych modułów tworzą-
 * 						cych dodatek. Na przykład 
 * 						require ( "./lib/zdjencia_mod.js" ).inicjalizacja()
 * 
 * Moduły główne	:	"./lib/zdjencia_mod.js"
 * 							moduł odpowiedzialny za tworzenie zrzutów e-
 * 							kranów wątków i wpisów na mikroblogu porta-
 * 							lu wykop.pl
 * 							... dodać dalszy opis, jak korzystać, itp.
 */ 
 
require ( "./lib/main_module_for_capturing_threads.js" ).inicjalizacja();