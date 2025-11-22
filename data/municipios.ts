
import { MunicipalityData } from '../types';

const rawCsvData = `Municípios;PIB per capita;População estimada;Área da unidade territorial;Região intermediária;Mesorregião
Aceguá;91994,39 R$;4251 pessoas;1551,339 km²;Pelotas;Sudoeste Rio-grandense
Água Santa;146445,07 R$;4003 pessoas;291,526 km²;Passo Fundo;Noroeste Rio-grandense
Agudo;40863,53 R$;16341 pessoas;534,624 km²;Santa Maria;Centro Ocidental Rio-grandense
Ajuricaba;74961,71 R$;6843 pessoas;322,674 km²;Ijuí;Noroeste Rio-grandense
Alecrim;28383,93 R$;6219 pessoas;316,394 km²;Ijuí;Noroeste Rio-grandense
Alegrete;42485,08 R$;74285 pessoas;7800,552 km²;Uruguaiana;Sudoeste Rio-grandense
Alegria;47648,88 R$;3705 pessoas;172,794 km²;Ijuí;Noroeste Rio-grandense
Almirante Tamandaré do Sul;142847,94 R$;2007 pessoas;265,042 km²;Passo Fundo;Noroeste Rio-grandense
Alpestre;33369,8 R$;7235 pessoas;325,979 km²;Passo Fundo;Noroeste Rio-grandense
Alto Alegre;66755,15 R$;1837 pessoas;115,335 km²;Passo Fundo;Noroeste Rio-grandense
Alto Feliz;53088,35 R$;3145 pessoas;78,170 km²;Caxias do Sul;Metropolitana de Porto Alegre
Alvorada;15550,82 R$;194062 pessoas;71,702 km²;Porto Alegre;Metropolitana de Porto Alegre
Amaral Ferrador;20688,31 R$;5384 pessoas;506,109 km²;Porto Alegre;Sudeste Rio-grandense
Ametista do Sul;24036,02 R$;7826 pessoas;93,605 km²;Passo Fundo;Noroeste Rio-grandense
André da Rocha;142922,95 R$;1156 pessoas;331,208 km²;Caxias do Sul;Nordeste Rio-grandense
Anta Gorda;54248,7 R$;6080 pessoas;242,100 km²;Santa Cruz do Sul - Lajeado;Nordeste Rio-grandense
Antônio Prado;61154,04 R$;13332 pessoas;347,541 km²;Caxias do Sul;Nordeste Rio-grandense
Arambaré;80442,31 R$;4215 pessoas;518,193 km²;Porto Alegre;Metropolitana de Porto Alegre
Araricá;40484,64 R$;8831 pessoas;35,195 km²;Porto Alegre;Metropolitana de Porto Alegre
Aratiba;154104,03 R$;6618 pessoas;342,279 km²;Passo Fundo;Noroeste Rio-grandense
Arroio do Meio;72750,17 R$;22523 pessoas;157,088 km²;Santa Cruz do Sul - Lajeado;Centro Oriental Rio-grandense
Arroio do Padre;25887,92 R$;2650 pessoas;124,693 km²;Pelotas;Sudeste Rio-grandense
Arroio do Sal;27241,9 R$;11418 pessoas;119,160 km²;Porto Alegre;Metropolitana de Porto Alegre
Arroio do Tigre;31911,3 R$;12291 pessoas;315,132 km²;Santa Cruz do Sul - Lajeado;Centro Oriental Rio-grandense
Arroio dos Ratos;25163,34 R$;14934 pessoas;425,791 km²;Porto Alegre;Metropolitana de Porto Alegre
Arroio Grande;62222,04 R$;17879 pessoas;2508,557 km²;Pelotas;Sudeste Rio-grandense
Arvorezinha;32263,13 R$;10547 pessoas;269,310 km²;Passo Fundo;Nordeste Rio-grandense
Augusto Pestana;77033,28 R$;7303 pessoas;348,219 km²;Ijuí;Noroeste Rio-grandense
Áurea;46470,87 R$;3458 pessoas;156,727 km²;Passo Fundo;Noroeste Rio-grandense
Bagé;30846,53 R$;121928 pessoas;4090,360 km²;Pelotas;Sudoeste Rio-grandense
Balneário Pinhal;21310,39 R$;15413 pessoas;102,387 km²;Porto Alegre;Metropolitana de Porto Alegre
Barão;49438,57 R$;6496 pessoas;122,567 km²;Caxias do Sul;Metropolitana de Porto Alegre
Barão de Cotegipe;51643,3 R$;7320 pessoas;260,505 km²;Passo Fundo;Noroeste Rio-grandense
Barão do Triunfo;18850,07 R$;5972 pessoas;436,101 km²;Porto Alegre;Metropolitana de Porto Alegre
Barra do Guarita;17394,57 R$;3231 pessoas;62,801 km²;Ijuí;Noroeste Rio-grandense
Barra do Quaraí;91123,36 R$;4340 pessoas;1055,937 km²;Uruguaiana;Sudoeste Rio-grandense
Barra do Ribeiro;37126,68 R$;12473 pessoas;729,316 km²;Porto Alegre;Metropolitana de Porto Alegre
Barra do Rio Azul;49813,05 R$;1721 pessoas;146,995 km²;Passo Fundo;Noroeste Rio-grandense
Barra Funda;64388,93 R$;2557 pessoas;60,437 km²;Passo Fundo;Noroeste Rio-grandense
Barracão;60546,74 R$;4915 pessoas;515,469 km²;Passo Fundo;Noroeste Rio-grandense
Barros Cassal;21895,98 R$;9425 pessoas;647,994 km²;Passo Fundo;Noroeste Rio-grandense
Benjamin Constant do Sul;25630,36 R$;2118 pessoas;132,351 km²;Passo Fundo;Noroeste Rio-grandense
Bento Gonçalves;60918,83 R$;127977 pessoas;272,287 km²;Caxias do Sul;Nordeste Rio-grandense
Boa Vista das Missões;114288,93 R$;1968 pessoas;196,064 km²;Passo Fundo;Noroeste Rio-grandense
Boa Vista do Buricá;48701,61 R$;7129 pessoas;109,541 km²;Ijuí;Noroeste Rio-grandense
Boa Vista do Cadeado;190085,27 R$;2269 pessoas;701,221 km²;Passo Fundo;Noroeste Rio-grandense
Boa Vista do Incra;146184,34 R$;2314 pessoas;504,114 km²;Passo Fundo;Noroeste Rio-grandense
Boa Vista do Sul;43320,08 R$;2815 pessoas;93,108 km²;Caxias do Sul;Nordeste Rio-grandense
Bom Jesus;54447,36 R$;11429 pessoas;2622,837 km²;Caxias do Sul;Nordeste Rio-grandense
Bom Princípio;62757,39 R$;13665 pessoas;90,023 km²;Porto Alegre;Metropolitana de Porto Alegre
Bom Progresso;46436,67 R$;2132 pessoas;89,206 km²;Ijuí;Noroeste Rio-grandense
Bom Retiro do Sul;32378,99 R$;12587 pessoas;102,540 km²;Santa Cruz do Sul - Lajeado;Centro Oriental Rio-grandense
Boqueirão do Leão;19554,48 R$;6202 pessoas;257,789 km²;Santa Cruz do Sul - Lajeado;Centro Oriental Rio-grandense
Bossoroca;79966,92 R$;5978 pessoas;1610,056 km²;Ijuí;Noroeste Rio-grandense
Bozano;108341,64 R$;2195 pessoas;200,497 km²;Ijuí;Noroeste Rio-grandense
Braga;40032,87 R$;3322 pessoas;132,044 km²;Ijuí;Noroeste Rio-grandense
Brochier;22934,5 R$;5083 pessoas;105,353 km²;Porto Alegre;Metropolitana de Porto Alegre
Butiá;25919,33 R$;19421 pessoas;752,187 km²;Porto Alegre;Metropolitana de Porto Alegre
Caçapava do Sul;33536,47 R$;33501 pessoas;3048,147 km²;Santa Maria;Sudeste Rio-grandense
Cacequi;50694,42 R$;11300 pessoas;2373,507 km²;Santa Maria;Centro Ocidental Rio-grandense
Cachoeira do Sul;43440,91 R$;82222 pessoas;3736,064 km²;Santa Maria;Centro Oriental Rio-grandense
Cachoeirinha;48874,53 R$;141503 pessoas;43,760 km²;Porto Alegre;Metropolitana de Porto Alegre
Cacique Doble;33294,25 R$;4692 pessoas;203,582 km²;Passo Fundo;Noroeste Rio-grandense
Caibaté;55167,67 R$;4795 pessoas;261,280 km²;Ijuí;Noroeste Rio-grandense
Caiçara;32805,41 R$;4931 pessoas;189,071 km²;Passo Fundo;Noroeste Rio-grandense
Camaquã;40843,08 R$;63961 pessoas;1679,242 km²;Porto Alegre;Metropolitana de Porto Alegre
Camargo;189265,97 R$;3060 pessoas;138,069 km²;Passo Fundo;Noroeste Rio-grandense
Cambará do Sul;38003,51 R$;6490 pessoas;1181,811 km²;Caxias do Sul;Nordeste Rio-grandense
Campestre da Serra;60171,09 R$;3311 pessoas;538,487 km²;Caxias do Sul;Nordeste Rio-grandense
Campina das Missões;44914,25 R$;5999 pessoas;224,792 km²;Ijuí;Noroeste Rio-grandense
Campinas do Sul;73663,3 R$;5388 pessoas;276,162 km²;Passo Fundo;Noroeste Rio-grandense
Campo Bom;51443,5 R$;64719 pessoas;60,562 km²;Porto Alegre;Metropolitana de Porto Alegre
Campo Novo;76231,72 R$;5063 pessoas;220,719 km²;Ijuí;Noroeste Rio-grandense
Campos Borges;45853,46 R$;3695 pessoas;226,202 km²;Passo Fundo;Noroeste Rio-grandense
Candelária;34255,3 R$;29775 pessoas;944,735 km²;Santa Cruz do Sul - Lajeado;Centro Oriental Rio-grandense
Cândido Godói;58702,31 R$;6419 pessoas;247,047 km²;Ijuí;Noroeste Rio-grandense
Candiota;282683,22 R$;11012 pessoas;933,628 km²;Pelotas;Sudeste Rio-grandense
Canela;34711,89 R$;50715 pessoas;253,002 km²;Caxias do Sul;Metropolitana de Porto Alegre
Canguçu;29448,32 R$;50968 pessoas;3526,316 km²;Pelotas;Sudeste Rio-grandense
Canoas;62892,77 R$;359840 pessoas;130,774 km²;Porto Alegre;Metropolitana de Porto Alegre
Canudos do Vale;40157,66 R$;1686 pessoas;82,943 km²;Santa Cruz do Sul - Lajeado;Centro Oriental Rio-grandense
Capão Bonito do Sul;210105,78 R$;1769 pessoas;526,850 km²;Passo Fundo;Nordeste Rio-grandense
Capão da Canoa;35739,83 R$;66234 pessoas;98,383 km²;Porto Alegre;Metropolitana de Porto Alegre
Capão do Cipó;172220,01 R$;3187 pessoas;1007,796 km²;Santa Maria;Centro Ocidental Rio-grandense
Capão do Leão;32600,83 R$;27416 pessoas;783,196 km²;Pelotas;Sudeste Rio-grandense
Capela de Santana;24508,37 R$;11424 pessoas;182,756 km²;Porto Alegre;Metropolitana de Porto Alegre
Capitão;34432,45 R$;2994 pessoas;73,967 km²;Santa Cruz do Sul - Lajeado;Centro Oriental Rio-grandense
Capivari do Sul;80707,69 R$;4080 pessoas;412,889 km²;Porto Alegre;Metropolitana de Porto Alegre
Caraá;19660,45 R$;7555 pessoas;294,606 km²;Porto Alegre;Metropolitana de Porto Alegre
Carazinho;61635,35 R$;63670 pessoas;666,694 km²;Passo Fundo;Noroeste Rio-grandense
Carlos Barbosa;115232,73 R$;31585 pessoas;230,061 km²;Caxias do Sul;Nordeste Rio-grandense
Carlos Gomes;53087,07 R$;1384 pessoas;83,196 km²;Passo Fundo;Noroeste Rio-grandense
Casca;79153,17 R$;9698 pessoas;272,041 km²;Passo Fundo;Noroeste Rio-grandense
Caseiros;61708,82 R$;3064 pessoas;235,649 km²;Passo Fundo;Noroeste Rio-grandense
Catuípe;73932,28 R$;8834 pessoas;583,180 km²;Ijuí;Noroeste Rio-grandense
Caxias do Sul;60506,95 R$;479599 pessoas;1652,320 km²;Caxias do Sul;Nordeste Rio-grandense
Centenário;42156,31 R$;2777 pessoas;134,780 km²;Passo Fundo;Noroeste Rio-grandense
Cerrito;26865,43 R$;5910 pessoas;451,699 km²;Pelotas;Sudeste Rio-grandense
Cerro Branco;19101,32 R$;3859 pessoas;158,025 km²;Santa Maria;Centro Oriental Rio-grandense
Cerro Grande;32687,84 R$;2428 pessoas;73,438 km²;Passo Fundo;Noroeste Rio-grandense
Cerro Grande do Sul;16152,52 R$;9333 pessoas;324,908 km²;Porto Alegre;Metropolitana de Porto Alegre
Cerro Largo;55941,51 R$;14014 pessoas;176,742 km²;Ijuí;Noroeste Rio-grandense
Chapada;80536,95 R$;9751 pessoas;684,247 km²;Passo Fundo;Noroeste Rio-grandense
Charqueadas;41649,07 R$;36110 pessoas;217,362 km²;Porto Alegre;Metropolitana de Porto Alegre
Charrua;46267,26 R$;2800 pessoas;198,748 km²;Passo Fundo;Noroeste Rio-grandense
Chiapetta;105546,96 R$;3991 pessoas;397,179 km²;Ijuí;Noroeste Rio-grandense
Chuí;54200,93 R$;6409 pessoas;202,387 km²;Pelotas;Sudeste Rio-grandense
Chuvisca;23511,99 R$;4682 pessoas;220,471 km²;Porto Alegre;Metropolitana de Porto Alegre
Cidreira;21427,39 R$;17583 pessoas;243,419 km²;Porto Alegre;Metropolitana de Porto Alegre
Ciríaco;56330,74 R$;4208 pessoas;274,350 km²;Passo Fundo;Noroeste Rio-grandense
Colinas;35364,42 R$;2474 pessoas;60,732 km²;Santa Cruz do Sul - Lajeado;Centro Oriental Rio-grandense
Colorado;109506,71 R$;3316 pessoas;286,295 km²;Passo Fundo;Noroeste Rio-grandense
Condor;92330,04 R$;6538 pessoas;463,568 km²;Ijuí;Noroeste Rio-grandense
Constantina;43658,25 R$;10631 pessoas;203,614 km²;Passo Fundo;Noroeste Rio-grandense
Coqueiro Baixo;35008,88 R$;1308 pessoas;112,638 km²;Santa Cruz do Sul - Lajeado;Centro Oriental Rio-grandense
Coqueiros do Sul;83874,61 R$;2248 pessoas;277,147 km²;Passo Fundo;Noroeste Rio-grandense
Coronel Barros;89696,56 R$;2896 pessoas;163,716 km²;Ijuí;Noroeste Rio-grandense
Coronel Bicaco;71419,97 R$;6214 pessoas;492,303 km²;Ijuí;Noroeste Rio-grandense
Coronel Pilar;30623,65 R$;1637 pessoas;105,668 km²;Caxias do Sul;Nordeste Rio-grandense
Cotiporã;43914,1 R$;3926 pessoas;173,207 km²;Caxias do Sul;Nordeste Rio-grandense
Coxilha;154691,89 R$;2718 pessoas;422,101 km²;Passo Fundo;Noroeste Rio-grandense
Crissiumal;38358,26 R$;13116 pessoas;362,194 km²;Ijuí;Noroeste Rio-grandense
Cristal;38037,96 R$;7455 pessoas;679,742 km²;Porto Alegre;Sudeste Rio-grandense
Cristal do Sul;33359,29 R$;2745 pessoas;97,073 km²;Passo Fundo;Noroeste Rio-grandense
Cruz Alta;77389,3 R$;60454 pessoas;1360,548 km²;Passo Fundo;Noroeste Rio-grandense
Cruzaltense;82018,89 R$;1650 pessoas;166,883 km²;Passo Fundo;Noroeste Rio-grandense
Cruzeiro do Sul;42787,38 R$;12574 pessoas;155,482 km²;Santa Cruz do Sul - Lajeado;Centro Oriental Rio-grandense
David Canabarro;48470,51 R$;4400 pessoas;174,172 km²;Passo Fundo;Noroeste Rio-grandense
Derrubadas;54601,48 R$;2793 pessoas;360,851 km²;Ijuí;Noroeste Rio-grandense
Dezesseis de Novembro;24527,63 R$;2540 pessoas;216,341 km²;Ijuí;Noroeste Rio-grandense
Dilermando de Aguiar;89569,01 R$;2856 pessoas;600,518 km²;Santa Maria;Centro Ocidental Rio-grandense
Dois Irmãos;65238,03 R$;31804 pessoas;67,509 km²;Porto Alegre;Metropolitana de Porto Alegre
Dois Irmãos das Missões;99996,91 R$;2132 pessoas;226,072 km²;Passo Fundo;Noroeste Rio-grandense
Dois Lajeados;50616,02 R$;3156 pessoas;133,535 km²;Caxias do Sul;Nordeste Rio-grandense
Dom Feliciano;22940,15 R$;13280 pessoas;1355,195 km²;Porto Alegre;Metropolitana de Porto Alegre
Dom Pedrito;57844,71 R$;38080 pessoas;5194,051 km²;Pelotas;Sudoeste Rio-grandense
Dom Pedro de Alcântara;26005,05 R$;2617 pessoas;78,216 km²;Porto Alegre;Metropolitana de Porto Alegre
Dona Francisca;36036,35 R$;3133 pessoas;114,149 km²;Santa Maria;Centro Ocidental Rio-grandense
Doutor Maurício Cardoso;59542,4 R$;4534 pessoas;255,731 km²;Ijuí;Noroeste Rio-grandense
Doutor Ricardo;40106,77 R$;1924 pessoas;107,960 km²;Santa Cruz do Sul - Lajeado;Centro Oriental Rio-grandense
Eldorado do Sul;49900,17 R$;41012 pessoas;509,632 km²;Porto Alegre;Metropolitana de Porto Alegre
Encantado;50694,44 R$;23520 pessoas;140,006 km²;Santa Cruz do Sul - Lajeado;Centro Oriental Rio-grandense
Encruzilhada do Sul;41512,46 R$;24275 pessoas;3347,861 km²;Santa Cruz do Sul - Lajeado;Sudeste Rio-grandense
Engenho Velho;78554,93 R$;1315 pessoas;71,191 km²;Passo Fundo;Noroeste Rio-grandense
Entre-Ijuís;82344,41 R$;9367 pessoas;553,915 km²;Ijuí;Noroeste Rio-grandense
Entre Rios do Sul;76180,58 R$;2727 pessoas;119,912 km²;Passo Fundo;Noroeste Rio-grandense
Erebango;60603,72 R$;3122 pessoas;152,793 km²;Passo Fundo;Noroeste Rio-grandense
Erechim;64103 R$;109609 pessoas;429,164 km²;Passo Fundo;Noroeste Rio-grandense
Ernestina;83742,62 R$;3097 pessoas;238,558 km²;Passo Fundo;Noroeste Rio-grandense
Erval Grande;31565,21 R$;5027 pessoas;285,677 km²;Passo Fundo;Noroeste Rio-grandense
Erval Seco;52854,5 R$;6892 pessoas;357,181 km²;Passo Fundo;Noroeste Rio-grandense
Esmeralda;119373,62 R$;3264 pessoas;829,587 km²;Caxias do Sul;Nordeste Rio-grandense
Esperança do Sul;41015,55 R$;3293 pessoas;148,909 km²;Ijuí;Noroeste Rio-grandense
Espumoso;71380,17 R$;15478 pessoas;783,642 km²;Passo Fundo;Noroeste Rio-grandense
Estação;59200,96 R$;5685 pessoas;99,757 km²;Passo Fundo;Noroeste Rio-grandense
Estância Velha;36564,93 R$;49499 pessoas;51,779 km²;Porto Alegre;Metropolitana de Porto Alegre
Esteio;44988,45 R$;78144 pessoas;27,676 km²;Porto Alegre;Metropolitana de Porto Alegre
Estrela;62633,5 R$;33263 pessoas;185,032 km²;Santa Cruz do Sul - Lajeado;Centro Oriental Rio-grandense
Estrela Velha;54145,31 R$;3115 pessoas;281,613 km²;Santa Cruz do Sul - Lajeado;Centro Oriental Rio-grandense
Eugênio de Castro;175516,28 R$;2683 pessoas;417,821 km²;Ijuí;Noroeste Rio-grandense
Fagundes Varela;71970,31 R$;2620 pessoas;134,295 km²;Caxias do Sul;Nordeste Rio-grandense
Farroupilha;59633,5 R$;72552 pessoas;361,341 km²;Caxias do Sul;Nordeste Rio-grandense
Faxinal do Soturno;40611,12 R$;6846 pessoas;169,514 km²;Santa Maria;Centro Ocidental Rio-grandense
Faxinalzinho;45729,43 R$;2572 pessoas;143,321 km²;Passo Fundo;Noroeste Rio-grandense
Fazenda Vilanova;30090,25 R$;4405 pessoas;84,794 km²;Santa Cruz do Sul - Lajeado;Centro Oriental Rio-grandense
Feliz;42930,67 R$;13994 pessoas;94,659 km²;Caxias do Sul;Metropolitana de Porto Alegre
Flores da Cunha;80956,1 R$;32015 pessoas;276,241 km²;Caxias do Sul;Nordeste Rio-grandense
Floriano Peixoto;60303,24 R$;1690 pessoas;168,521 km²;Passo Fundo;Noroeste Rio-grandense
Fontoura Xavier;22342,41 R$;9710 pessoas;583,239 km²;Passo Fundo;Noroeste Rio-grandense
Formigueiro;46095,12 R$;6527 pessoas;578,875 km²;Santa Maria;Centro Ocidental Rio-grandense
Forquetinha;24671,04 R$;2441 pessoas;93,278 km²;Santa Cruz do Sul - Lajeado;Centro Oriental Rio-grandense
Fortaleza dos Valos;132824,77 R$;4569 pessoas;650,512 km²;Passo Fundo;Noroeste Rio-grandense
Frederico Westphalen;45165,14 R$;33726 pessoas;264,876 km²;Passo Fundo;Noroeste Rio-grandense
Garibaldi;83756,02 R$;35563 pessoas;168,492 km²;Caxias do Sul;Nordeste Rio-grandense
Garruchos;70489,57 R$;2724 pessoas;803,970 km²;Ijuí;Sudoeste Rio-grandense
Gaurama;51913,23 R$;5779 pessoas;204,428 km²;Passo Fundo;Noroeste Rio-grandense
General Câmara;33142,16 R$;7743 pessoas;510,010 km²;Porto Alegre;Metropolitana de Porto Alegre
Gentil;117756,19 R$;1784 pessoas;184,715 km²;Passo Fundo;Noroeste Rio-grandense
Getúlio Vargas;49118,74 R$;16955 pessoas;287,466 km²;Passo Fundo;Noroeste Rio-grandense
Giruá;76479,16 R$;16273 pessoas;855,560 km²;Ijuí;Noroeste Rio-grandense
Glorinha;55622 R$;7851 pessoas;323,955 km²;Porto Alegre;Metropolitana de Porto Alegre
Gramado;72103,34 R$;41705 pessoas;239,341 km²;Caxias do Sul;Metropolitana de Porto Alegre
Gramado dos Loureiros;46453,26 R$;2047 pessoas;131,396 km²;Passo Fundo;Noroeste Rio-grandense
Gramado Xavier;25007,13 R$;3350 pessoas;216,790 km²;Santa Cruz do Sul - Lajeado;Centro Oriental Rio-grandense
Gravataí;35934,57 R$;275430 pessoas;468,288 km²;Porto Alegre;Metropolitana de Porto Alegre
Guabiju;89842,5 R$;1441 pessoas;146,925 km²;Caxias do Sul;Nordeste Rio-grandense
Guaíba;84254,24 R$;95946 pessoas;377,664 km²;Porto Alegre;Metropolitana de Porto Alegre
Guaporé;43858,55 R$;26168 pessoas;297,545 km²;Caxias do Sul;Nordeste Rio-grandense
Guarani das Missões;49049,53 R$;7547 pessoas;289,516 km²;Ijuí;Noroeste Rio-grandense
Harmonia;49425,43 R$;5535 pessoas;48,540 km²;Porto Alegre;Metropolitana de Porto Alegre
Herval;37256,6 R$;6302 pessoas;1759,717 km²;Pelotas;Sudeste Rio-grandense
Herveiras;23564,77 R$;2604 pessoas;117,981 km²;Santa Cruz do Sul - Lajeado;Centro Oriental Rio-grandense
Horizontina;134124,88 R$;19252 pessoas;229,694 km²;Ijuí;Noroeste Rio-grandense
Hulha Negra;45617,4 R$;6102 pessoas;822,608 km²;Pelotas;Sudoeste Rio-grandense
Humaitá;48651,94 R$;4772 pessoas;135,010 km²;Ijuí;Noroeste Rio-grandense
Ibarama;25546,56 R$;3787 pessoas;195,426 km²;Santa Cruz do Sul - Lajeado;Centro Oriental Rio-grandense
Ibiaçá;78314,21 R$;4617 pessoas;348,778 km²;Passo Fundo;Noroeste Rio-grandense
Ibiraiaras;55000,81 R$;6827 pessoas;280,816 km²;Passo Fundo;Noroeste Rio-grandense
Ibirapuitã;53540,94 R$;3789 pessoas;307,164 km²;Passo Fundo;Noroeste Rio-grandense
Ibirubá;84109,24 R$;22106 pessoas;607,185 km²;Passo Fundo;Noroeste Rio-grandense
Igrejinha;50031,27 R$;34776 pessoas;138,116 km²;Porto Alegre;Metropolitana de Porto Alegre
Ijuí;61760,07 R$;87848 pessoas;688,982 km²;Ijuí;Noroeste Rio-grandense
Ilópolis;34674,18 R$;4245 pessoas;123,602 km²;Santa Cruz do Sul - Lajeado;Nordeste Rio-grandense
Imbé;26424,42 R$;28027 pessoas;39,766 km²;Porto Alegre;Metropolitana de Porto Alegre
Imigrante;167318,28 R$;3149 pessoas;71,718 km²;Santa Cruz do Sul - Lajeado;Centro Oriental Rio-grandense
Independência;81626,01 R$;6557 pessoas;358,284 km²;Ijuí;Noroeste Rio-grandense
Inhacorá;50093,22 R$;2047 pessoas;113,749 km²;Ijuí;Noroeste Rio-grandense
Ipê;44326,21 R$;5490 pessoas;599,032 km²;Caxias do Sul;Nordeste Rio-grandense
Ipiranga do Sul;94937,47 R$;1748 pessoas;158,710 km²;Passo Fundo;Noroeste Rio-grandense
Iraí;36118,47 R$;7619 pessoas;181,850 km²;Passo Fundo;Noroeste Rio-grandense
Itaara;51436,88 R$;5712 pessoas;172,801 km²;Santa Maria;Centro Ocidental Rio-grandense
Itacurubi;71263,11 R$;3038 pessoas;1120,249 km²;Santa Maria;Centro Ocidental Rio-grandense
Itapuca;46261,07 R$;1963 pessoas;184,673 km²;Passo Fundo;Nordeste Rio-grandense
Itaqui;58531,72 R$;36811 pessoas;3405,999 km²;Uruguaiana;Sudoeste Rio-grandense
Itati;36490,36 R$;2696 pessoas;205,060 km²;Porto Alegre;Metropolitana de Porto Alegre
Itatiba do Sul;25996,27 R$;3240 pessoas;212,669 km²;Passo Fundo;Noroeste Rio-grandense
Ivorá;38786,64 R$;1962 pessoas;122,930 km²;Santa Maria;Centro Ocidental Rio-grandense
Ivoti;47087,23 R$;23566 pessoas;63,092 km²;Porto Alegre;Metropolitana de Porto Alegre
Jaboticaba;36578,03 R$;3847 pessoas;127,589 km²;Passo Fundo;Noroeste Rio-grandense
Jacuizinho;82423,05 R$;2066 pessoas;339,399 km²;Passo Fundo;Noroeste Rio-grandense
Jacutinga;65770,01 R$;3398 pessoas;178,009 km²;Passo Fundo;Noroeste Rio-grandense
Jaguarão;40239,75 R$;27396 pessoas;2051,845 km²;Pelotas;Sudeste Rio-grandense
Jaguari;35381,69 R$;10771 pessoas;675,108 km²;Santa Maria;Centro Ocidental Rio-grandense
Jaquirana;26042,85 R$;3751 pessoas;908,879 km²;Caxias do Sul;Nordeste Rio-grandense
Jari;135082,01 R$;3412 pessoas;853,080 km²;Santa Maria;Centro Ocidental Rio-grandense
Jóia;113803,19 R$;7294 pessoas;1238,709 km²;Ijuí;Noroeste Rio-grandense
Júlio de Castilhos;100483,88 R$;18545 pessoas;1929,544 km²;Santa Maria;Centro Ocidental Rio-grandense
Lagoa Bonita do Sul;23448,31 R$;2283 pessoas;109,758 km²;Santa Cruz do Sul - Lajeado;Centro Oriental Rio-grandense
Lagoa dos Três Cantos;97967,03 R$;1781 pessoas;138,602 km²;Passo Fundo;Noroeste Rio-grandense
Lagoa Vermelha;54534,96 R$;28622 pessoas;1272,725 km²;Passo Fundo;Nordeste Rio-grandense
Lagoão;23912,37 R$;5421 pessoas;387,454 km²;Santa Cruz do Sul - Lajeado;Noroeste Rio-grandense
Lajeado;65067,95 R$;96879 pessoas;90,801 km²;Santa Cruz do Sul - Lajeado;Centro Oriental Rio-grandense
Lajeado do Bugre;29145,22 R$;2661 pessoas;67,947 km²;Passo Fundo;Noroeste Rio-grandense
Lavras do Sul;67155,99 R$;7290 pessoas;2600,969 km²;Santa Maria;Sudoeste Rio-grandense
Liberato Salzano;33898,65 R$;4845 pessoas;245,627 km²;Passo Fundo;Noroeste Rio-grandense
Lindolfo Collor;59074,46 R$;6420 pessoas;33,351 km²;Porto Alegre;Metropolitana de Porto Alegre
Linha Nova;38038,69 R$;1721 pessoas;63,502 km²;Porto Alegre;Metropolitana de Porto Alegre
Maçambará;128231,01 R$;4485 pessoas;1682,676 km²;Uruguaiana;Sudoeste Rio-grandense
Machadinho;50419,98 R$;5867 pessoas;335,344 km²;Passo Fundo;Noroeste Rio-grandense
Mampituba;23680,66 R$;3203 pessoas;156,653 km²;Porto Alegre;Metropolitana de Porto Alegre
Manoel Viana;74773,78 R$;6915 pessoas;1365,086 km²;Uruguaiana;Sudoeste Rio-grandense
Maquiné;28232,21 R$;7593 pessoas;613,580 km²;Porto Alegre;Metropolitana de Porto Alegre
Maratá;29788,54 R$;2521 pessoas;82,063 km²;Porto Alegre;Metropolitana de Porto Alegre
Marau;67219,06 R$;46748 pessoas;649,770 km²;Passo Fundo;Noroeste Rio-grandense
Marcelino Ramos;39590,38 R$;4382 pessoas;229,551 km²;Passo Fundo;Noroeste Rio-grandense
Mariana Pimentel;26848,63 R$;4005 pessoas;338,450 km²;Porto Alegre;Metropolitana de Porto Alegre
Mariano Moro;36681,94 R$;1884 pessoas;98,727 km²;Passo Fundo;Noroeste Rio-grandense
Marques de Souza;31181,68 R$;4050 pessoas;125,714 km²;Santa Cruz do Sul - Lajeado;Centro Oriental Rio-grandense
Mata;35505,31 R$;4782 pessoas;316,121 km²;Santa Maria;Centro Ocidental Rio-grandense
Mato Castelhano;66163,47 R$;2611 pessoas;238,268 km²;Passo Fundo;Noroeste Rio-grandense
Mato Leitão;39017,82 R$;5001 pessoas;46,799 km²;Santa Cruz do Sul - Lajeado;Centro Oriental Rio-grandense
Mato Queimado;54901,02 R$;1833 pessoas;114,653 km²;Ijuí;Noroeste Rio-grandense
Maximiliano de Almeida;37875,46 R$;4251 pessoas;208,955 km²;Passo Fundo;Noroeste Rio-grandense
Minas do Leão;34338,93 R$;7661 pessoas;424,339 km²;Porto Alegre;Metropolitana de Porto Alegre
Miraguaí;38862,02 R$;4501 pessoas;131,236 km²;Ijuí;Noroeste Rio-grandense
Montauri;68627,31 R$;1530 pessoas;82,230 km²;Caxias do Sul;Nordeste Rio-grandense
Monte Alegre dos Campos;33898,25 R$;3251 pessoas;549,455 km²;Caxias do Sul;Nordeste Rio-grandense
Monte Belo do Sul;37563,3 R$;2608 pessoas;69,726 km²;Caxias do Sul;Nordeste Rio-grandense
Montenegro;86949,68 R$;66352 pessoas;425,023 km²;Porto Alegre;Metropolitana de Porto Alegre
Mormaço;48847,68 R$;2815 pessoas;146,191 km²;Passo Fundo;Noroeste Rio-grandense
Morrinhos do Sul;28178,72 R$;3133 pessoas;166,224 km²;Porto Alegre;Metropolitana de Porto Alegre
Morro Redondo;20039,8 R$;6168 pessoas;244,645 km²;Pelotas;Sudeste Rio-grandense
Morro Reuter;41729,98 R$;6167 pessoas;87,037 km²;Porto Alegre;Metropolitana de Porto Alegre
Mostardas;49916,42 R$;12347 pessoas;1977,442 km²;Porto Alegre;Metropolitana de Porto Alegre
Muçum;60771,23 R$;4692 pessoas;111,247 km²;Santa Cruz do Sul - Lajeado;Centro Oriental Rio-grandense
Muitos Capões;352413,31 R$;2937 pessoas;1193,230 km²;Caxias do Sul;Nordeste Rio-grandense
Muliterno;48389,03 R$;1754 pessoas;110,969 km²;Passo Fundo;Noroeste Rio-grandense
Não-Me-Toque;123422,26 R$;18335 pessoas;361,689 km²;Passo Fundo;Noroeste Rio-grandense
Nicolau Vergueiro;87733,01 R$;1982 pessoas;154,995 km²;Passo Fundo;Noroeste Rio-grandense
Nonoai;45403,84 R$;14074 pessoas;468,962 km²;Passo Fundo;Noroeste Rio-grandense
Nova Alvorada;63973,55 R$;3229 pessoas;148,861 km²;Passo Fundo;Nordeste Rio-grandense
Nova Araçá;66917,24 R$;5098 pessoas;75,514 km²;Caxias do Sul;Nordeste Rio-grandense
Nova Bassano;79512,9 R$;9867 pessoas;211,611 km²;Caxias do Sul;Nordeste Rio-grandense
Nova Boa Vista;83964,24 R$;2089 pessoas;93,733 km²;Passo Fundo;Noroeste Rio-grandense
Nova Bréscia;42195,23 R$;3104 pessoas;102,994 km²;Santa Cruz do Sul - Lajeado;Centro Oriental Rio-grandense
Nova Candelária;85704,31 R$;3138 pessoas;97,579 km²;Ijuí;Noroeste Rio-grandense
Nova Esperança do Sul;31539,73 R$;4976 pessoas;191,772 km²;Santa Maria;Centro Ocidental Rio-grandense
Nova Hartz;36379,38 R$;20558 pessoas;62,088 km²;Porto Alegre;Metropolitana de Porto Alegre
Nova Pádua;39098,98 R$;2389 pessoas;102,643 km²;Caxias do Sul;Nordeste Rio-grandense
Nova Palma;58703,35 R$;5676 pessoas;314,613 km²;Santa Maria;Centro Ocidental Rio-grandense
Nova Petrópolis;44789,05 R$;23934 pessoas;290,164 km²;Caxias do Sul;Metropolitana de Porto Alegre
Nova Prata;61740,72 R$;26637 pessoas;259,941 km²;Caxias do Sul;Nordeste Rio-grandense
Nova Ramada;138805,04 R$;2198 pessoas;255,264 km²;Ijuí;Noroeste Rio-grandense
Nova Roma do Sul;45232,13 R$;3545 pessoas;149,767 km²;Caxias do Sul;Nordeste Rio-grandense
Nova Santa Rita;81606,01 R$;30189 pessoas;218,094 km²;Porto Alegre;Metropolitana de Porto Alegre
Novo Barreiro;32305,57 R$;4375 pessoas;123,344 km²;Passo Fundo;Noroeste Rio-grandense
Novo Cabrais;31363,74 R$;3633 pessoas;192,998 km²;Santa Maria;Centro Oriental Rio-grandense
Novo Hamburgo;40589,43 R$;235802 pessoas;222,548 km²;Porto Alegre;Metropolitana de Porto Alegre
Novo Machado;58399,67 R$;3239 pessoas;218,836 km²;Ijuí;Noroeste Rio-grandense
Novo Tiradentes;34137,89 R$;2187 pessoas;75,428 km²;Passo Fundo;Noroeste Rio-grandense
Novo Xingu;44007,49 R$;1677 pessoas;79,851 km²;Passo Fundo;Noroeste Rio-grandense
Osório;38855,58 R$;48999 pessoas;663,878 km²;Porto Alegre;Metropolitana de Porto Alegre
Paim Filho;44932,84 R$;3685 pessoas;181,998 km²;Passo Fundo;Noroeste Rio-grandense
Palmares do Sul;64856,58 R$;13189 pessoas;949,201 km²;Porto Alegre;Metropolitana de Porto Alegre
Palmeira das Missões;67189,91 R$;34227 pessoas;1421,101 km²;Passo Fundo;Noroeste Rio-grandense
Palmitinho;38497,82 R$;8042 pessoas;144,181 km²;Passo Fundo;Noroeste Rio-grandense
Panambi;71052,72 R$;45102 pessoas;491,570 km²;Ijuí;Noroeste Rio-grandense
Pantano Grande;59331,51 R$;10443 pessoas;841,225 km²;Santa Cruz do Sul - Lajeado;Centro Oriental Rio-grandense
Paraí;54464,94 R$;7362 pessoas;121,745 km²;Caxias do Sul;Nordeste Rio-grandense
Paraíso do Sul;27162,33 R$;6627 pessoas;337,534 km²;Santa Maria;Centro Oriental Rio-grandense
Pareci Novo;35118,04 R$;4441 pessoas;57,485 km²;Porto Alegre;Metropolitana de Porto Alegre
Parobé;23398,44 R$;53569 pessoas;108,560 km²;Porto Alegre;Metropolitana de Porto Alegre
Passa Sete;22967,57 R$;4024 pessoas;304,299 km²;Santa Cruz do Sul - Lajeado;Centro Oriental Rio-grandense
Passo do Sobrado;34730,74 R$;6155 pessoas;265,133 km²;Santa Cruz do Sul - Lajeado;Centro Oriental Rio-grandense
Passo Fundo;60905,63 R$;214811 pessoas;784,406 km²;Passo Fundo;Noroeste Rio-grandense
Paulo Bento;85049,56 R$;2188 pessoas;149,669 km²;Passo Fundo;Noroeste Rio-grandense
Paverama;28387,36 R$;8146 pessoas;171,863 km²;Santa Cruz do Sul - Lajeado;Centro Oriental Rio-grandense
Pedras Altas;200305,43 R$;2099 pessoas;1373,985 km²;Pelotas;Sudeste Rio-grandense
Pedro Osório;35227,12 R$;7631 pessoas;603,757 km²;Pelotas;Sudeste Rio-grandense
Pejuçara;120888,24 R$;3817 pessoas;414,106 km²;Ijuí;Noroeste Rio-grandense
Pelotas;31347,6 R$;336150 pessoas;1608,780 km²;Pelotas;Sudeste Rio-grandense
Picada Café;66860,05 R$;5473 pessoas;84,280 km²;Caxias do Sul;Metropolitana de Porto Alegre
Pinhal;47787,94 R$;3039 pessoas;68,222 km²;Passo Fundo;Noroeste Rio-grandense
Pinhal da Serra;160718,98 R$;2300 pessoas;438,110 km²;Caxias do Sul;Nordeste Rio-grandense
Pinhal Grande;216252,56 R$;3861 pessoas;478,110 km²;Santa Maria;Centro Ocidental Rio-grandense
Pinheirinho do Vale;26704,69 R$;4638 pessoas;105,385 km²;Passo Fundo;Noroeste Rio-grandense
Pinheiro Machado;32810,02 R$;11395 pessoas;2249,176 km²;Pelotas;Sudeste Rio-grandense
Pinto Bandeira;24212,76 R$;2785 pessoas;104,801 km²;Caxias do Sul;Nordeste Rio-grandense
Pirapó;42934,46 R$;2255 pessoas;281,794 km²;Ijuí;Noroeste Rio-grandense
Piratini;42437,1 R$;17770 pessoas;3538,300 km²;Pelotas;Sudeste Rio-grandense
Planalto;25359,66 R$;10624 pessoas;228,552 km²;Passo Fundo;Noroeste Rio-grandense
Poço das Antas;62592,03 R$;2224 pessoas;67,618 km²;Santa Cruz do Sul - Lajeado;Metropolitana de Porto Alegre
Pontão;103467,34 R$;3345 pessoas;502,709 km²;Passo Fundo;Noroeste Rio-grandense
Ponte Preta;63989,35 R$;1602 pessoas;99,504 km²;Passo Fundo;Noroeste Rio-grandense
Portão;43654,26 R$;35273 pessoas;159,298 km²;Porto Alegre;Metropolitana de Porto Alegre
Porto Alegre;54647,38 R$;1388794 pessoas;495,977 km²;Porto Alegre;Metropolitana de Porto Alegre
Porto Lucena;30053,37 R$;4414 pessoas;250,876 km²;Ijuí;Noroeste Rio-grandense
Porto Mauá;38314,42 R$;2173 pessoas;105,811 km²;Ijuí;Noroeste Rio-grandense
Porto Vera Cruz;35939,08 R$;1582 pessoas;114,284 km²;Ijuí;Noroeste Rio-grandense
Porto Xavier;20793,08 R$;10127 pessoas;281,497 km²;Ijuí;Noroeste Rio-grandense
Pouso Novo;38725,99 R$;1771 pessoas;105,338 km²;Santa Cruz do Sul - Lajeado;Centro Oriental Rio-grandense
Presidente Lucena;71942,18 R$;3166 pessoas;49,628 km²;Porto Alegre;Metropolitana de Porto Alegre
Progresso;26706,68 R$;5423 pessoas;256,039 km²;Santa Cruz do Sul - Lajeado;Centro Oriental Rio-grandense
Protásio Alves;48347,62 R$;2070 pessoas;171,994 km²;Caxias do Sul;Nordeste Rio-grandense
Putinga;34561,44 R$;3809 pessoas;216,159 km²;Santa Cruz do Sul - Lajeado;Nordeste Rio-grandense
Quaraí;27772,79 R$;23995 pessoas;3139,995 km²;Uruguaiana;Sudoeste Rio-grandense
Quatro Irmãos;99979,63 R$;1577 pessoas;268,971 km²;Passo Fundo;Noroeste Rio-grandense
Quevedos;107161,62 R$;2553 pessoas;543,359 km²;Santa Maria;Centro Ocidental Rio-grandense
Quinze de Novembro;66960,55 R$;4003 pessoas;223,072 km²;Passo Fundo;Noroeste Rio-grandense
Redentora;19767,66 R$;9931 pessoas;303,705 km²;Ijuí;Noroeste Rio-grandense
Relvado;39983,85 R$;1826 pessoas;108,188 km²;Santa Cruz do Sul - Lajeado;Centro Oriental Rio-grandense
Restinga Sêca;42887,51 R$;15205 pessoas;968,620 km²;Santa Maria;Centro Ocidental Rio-grandense
Rio dos Índios;53086,08 R$;2866 pessoas;235,854 km²;Passo Fundo;Noroeste Rio-grandense
Rio Grande;62392,39 R$;198935 pessoas;2682,867 km²;Pelotas;Sudeste Rio-grandense
Rio Pardo;36346,75 R$;35641 pessoas;2051,112 km²;Santa Cruz do Sul - Lajeado;Centro Oriental Rio-grandense
Riozinho;33173,28 R$;4574 pessoas;239,090 km²;Porto Alegre;Metropolitana de Porto Alegre
Roca Sales;49851,25 R$;10646 pessoas;208,108 km²;Santa Cruz do Sul - Lajeado;Centro Oriental Rio-grandense
Rodeio Bonito;47593,36 R$;6831 pessoas;83,278 km²;Passo Fundo;Noroeste Rio-grandense
Rolador;71327,05 R$;2330 pessoas;295,201 km²;Ijuí;Noroeste Rio-grandense
Rolante;33884,81 R$;21752 pessoas;296,090 km²;Porto Alegre;Metropolitana de Porto Alegre
Ronda Alta;44347,96 R$;9969 pessoas;418,675 km²;Passo Fundo;Noroeste Rio-grandense
Rondinha;53421,99 R$;5078 pessoas;252,454 km²;Passo Fundo;Noroeste Rio-grandense
Roque Gonzales;64744,41 R$;6693 pessoas;349,084 km²;Ijuí;Noroeste Rio-grandense
Rosário do Sul;35245,33 R$;37674 pessoas;4343,656 km²;Uruguaiana;Sudoeste Rio-grandense
Sagrada Família;31762,83 R$;2528 pessoas;77,889 km²;Passo Fundo;Noroeste Rio-grandense
Saldanha Marinho;97938,15 R$;2619 pessoas;221,554 km²;Passo Fundo;Noroeste Rio-grandense
Salto do Jacuí;96983,27 R$;10357 pessoas;507,698 km²;Passo Fundo;Noroeste Rio-grandense
Salvador das Missões;65277,41 R$;2955 pessoas;95,952 km²;Ijuí;Noroeste Rio-grandense
Salvador do Sul;42339,98 R$;7184 pessoas;99,026 km²;Porto Alegre;Metropolitana de Porto Alegre
Sananduva;51509,18 R$;16770 pessoas;504,499 km²;Passo Fundo;Noroeste Rio-grandense
Santa Bárbara do Sul;171000,57 R$;8269 pessoas;975,799 km²;Passo Fundo;Noroeste Rio-grandense
Santa Cecília do Sul;88269,41 R$;1710 pessoas;200,056 km²;Passo Fundo;Noroeste Rio-grandense
Santa Clara do Sul;50200,65 R$;7079 pessoas;86,491 km²;Santa Cruz do Sul - Lajeado;Centro Oriental Rio-grandense
Santa Cruz do Sul;74205 R$;138270 pessoas;734,516 km²;Santa Cruz do Sul - Lajeado;Centro Oriental Rio-grandense
Santa Margarida do Sul;139226,56 R$;2661 pessoas;955,299 km²;Santa Maria;Sudoeste Rio-grandense
Santa Maria;33532,26 R$;282395 pessoas;1780,194 km²;Santa Maria;Centro Ocidental Rio-grandense
Santa Maria do Herval;43780,58 R$;6486 pessoas;140,437 km²;Porto Alegre;Metropolitana de Porto Alegre
Santa Rosa;50513,48 R$;79488 pessoas;489,380 km²;Ijuí;Noroeste Rio-grandense
Santa Tereza;28949,13 R$;1529 pessoas;73,669 km²;Caxias do Sul;Nordeste Rio-grandense
Santa Vitória do Palmar;59922,92 R$;31965 pessoas;5206,977 km²;Pelotas;Sudeste Rio-grandense
Santana da Boa Vista;45402,39 R$;7128 pessoas;1418,805 km²;Santa Maria;Sudeste Rio-grandense
Sant'ana do Livramento;37330,14 R$;87329 pessoas;6946,407 km²;Uruguaiana;Sudoeste Rio-grandense
Santiago;41004,58 R$;50336 pessoas;2413,419 km²;Santa Maria;Centro Ocidental Rio-grandense
Santo Ângelo;41012,36 R$;79146 pessoas;678,502 km²;Ijuí;Noroeste Rio-grandense
Santo Antônio da Patrulha;38723,81 R$;44431 pessoas;1049,583 km²;Porto Alegre;Metropolitana de Porto Alegre
Santo Antônio das Missões;67869,46 R$;10485 pessoas;1710,466 km²;Ijuí;Noroeste Rio-grandense
Santo Antônio do Palma;56561,14 R$;2134 pessoas;126,094 km²;Passo Fundo;Noroeste Rio-grandense
Santo Antônio do Planalto;93889,23 R$;2138 pessoas;203,440 km²;Passo Fundo;Noroeste Rio-grandense
Santo Augusto;61423,02 R$;14196 pessoas;467,775 km²;Ijuí;Noroeste Rio-grandense
Santo Cristo;55305,62 R$;15667 pessoas;367,202 km²;Ijuí;Noroeste Rio-grandense
Santo Expedito do Sul;56384,95 R$;2395 pessoas;125,334 km²;Passo Fundo;Noroeste Rio-grandense
São Borja;43012,23 R$;61311 pessoas;3616,674 km²;Uruguaiana;Sudoeste Rio-grandense
São Domingos do Sul;39933,74 R$;2806 pessoas;78,670 km²;Passo Fundo;Noroeste Rio-grandense
São Francisco de Assis;44473,17 R$;17934 pessoas;2534,789 km²;Santa Maria;Sudoeste Rio-grandense
São Francisco de Paula;46934,89 R$;22388 pessoas;3317,794 km²;Caxias do Sul;Nordeste Rio-grandense
São Gabriel;43790,22 R$;60090 pessoas;5053,460 km²;Santa Maria;Sudoeste Rio-grandense
São Jerônimo;27148,45 R$;21412 pessoas;935,596 km²;Porto Alegre;Metropolitana de Porto Alegre
São João da Urtiga;39815,86 R$;4547 pessoas;171,504 km²;Passo Fundo;Noroeste Rio-grandense
São João do Polêsine;41347,83 R$;2708 pessoas;78,320 km²;Santa Maria;Centro Ocidental Rio-grandense
São Jorge;47482,38 R$;2976 pessoas;125,731 km²;Caxias do Sul;Nordeste Rio-grandense
São José das Missões;37475 R$;2399 pessoas;98,125 km²;Passo Fundo;Noroeste Rio-grandense
São José do Herval;30835,69 R$;1931 pessoas;102,912 km²;Passo Fundo;Noroeste Rio-grandense
São José do Hortêncio;23936,9 R$;4555 pessoas;63,709 km²;Porto Alegre;Metropolitana de Porto Alegre
São José do Inhacorá;90094,6 R$;2466 pessoas;77,732 km²;Ijuí;Noroeste Rio-grandense
São José do Norte;28446,79 R$;26248 pessoas;1072,338 km²;Pelotas;Sudeste Rio-grandense
São José do Ouro;66997,04 R$;6978 pessoas;335,215 km²;Passo Fundo;Noroeste Rio-grandense
São José do Sul;38156,8 R$;2443 pessoas;54,764 km²;Porto Alegre;Metropolitana de Porto Alegre
São José dos Ausentes;43728,9 R$;4295 pessoas;1173,907 km²;Caxias do Sul;Nordeste Rio-grandense
São Leopoldo;45159,57 R$;225737 pessoas;103,009 km²;Porto Alegre;Metropolitana de Porto Alegre
São Lourenço do Sul;39103,99 R$;43278 pessoas;2039,257 km²;Pelotas;Sudeste Rio-grandense
São Luiz Gonzaga;57474,25 R$;35865 pessoas;1296,773 km²;Ijuí;Noroeste Rio-grandense
São Marcos;52647,06 R$;21549 pessoas;256,159 km²;Caxias do Sul;Nordeste Rio-grandense
São Martinho;66347,14 R$;5587 pessoas;171,245 km²;Ijuí;Noroeste Rio-grandense
São Martinho da Serra;104119,72 R$;2908 pessoas;669,547 km²;Santa Maria;Centro Ocidental Rio-grandense
São Miguel das Missões;112835,1 R$;7193 pessoas;1228,910 km²;Ijuí;Noroeste Rio-grandense
São Nicolau;44254,79 R$;5243 pessoas;497,446 km²;Ijuí;Noroeste Rio-grandense
São Paulo das Missões;35470 R$;5943 pessoas;222,504 km²;Ijuí;Noroeste Rio-grandense
São Pedro da Serra;29174,82 R$;3618 pessoas;37,631 km²;Porto Alegre;Metropolitana de Porto Alegre
São Pedro das Missões;56383,85 R$;1790 pessoas;79,894 km²;Passo Fundo;Noroeste Rio-grandense
São Pedro do Butiá;54801,17 R$;3142 pessoas;107,394 km²;Ijuí;Noroeste Rio-grandense
São Pedro do Sul;33059,31 R$;15863 pessoas;873,394 km²;Santa Maria;Centro Ocidental Rio-grandense
São Sebastião do Caí;34381,59 R$;24898 pessoas;113,097 km²;Porto Alegre;Metropolitana de Porto Alegre
São Sepé;56671,05 R$;21551 pessoas;2204,779 km²;Santa Maria;Centro Ocidental Rio-grandense
São Valentim;42093,07 R$;3320 pessoas;154,450 km²;Passo Fundo;Noroeste Rio-grandense
São Valentim do Sul;42515,69 R$;2255 pessoas;91,898 km²;Caxias do Sul;Nordeste Rio-grandense
São Valério do Sul;33099,83 R$;2593 pessoas;107,402 km²;Ijuí;Noroeste Rio-grandense
São Vendelino;41847,5 R$;2309 pessoas;31,899 km²;Porto Alegre;Metropolitana de Porto Alegre
São Vicente do Sul;83568,15 R$;8257 pessoas;1174,225 km²;Santa Maria;Centro Ocidental Rio-grandense
Sapiranga;44906,27 R$;77935 pessoas;137,759 km²;Porto Alegre;Metropolitana de Porto Alegre
Sapucaia do Sul;29500,52 R$;136572 pessoas;58,247 km²;Porto Alegre;Metropolitana de Porto Alegre
Sarandi;51915,53 R$;23374 pessoas;351,718 km²;Passo Fundo;Noroeste Rio-grandense
Seberi;57805,09 R$;12325 pessoas;301,032 km²;Passo Fundo;Noroeste Rio-grandense
Sede Nova;54794,43 R$;2750 pessoas;119,312 km²;Ijuí;Noroeste Rio-grandense
Segredo;21846,87 R$;6098 pessoas;245,170 km²;Santa Cruz do Sul - Lajeado;Centro Oriental Rio-grandense
Selbach;73361,94 R$;5222 pessoas;176,470 km²;Passo Fundo;Noroeste Rio-grandense
Senador Salgado Filho;53987,11 R$;2725 pessoas;147,097 km²;Ijuí;Noroeste Rio-grandense
Sentinela do Sul;24182,11 R$;5424 pessoas;282,130 km²;Porto Alegre;Metropolitana de Porto Alegre
Serafina Corrêa;43283,1 R$;17407 pessoas;163,310 km²;Caxias do Sul;Nordeste Rio-grandense
Sério;31535,66 R$;2089 pessoas;105,428 km²;Santa Cruz do Sul - Lajeado;Centro Oriental Rio-grandense
Sertão;102394,85 R$;5630 pessoas;440,631 km²;Passo Fundo;Noroeste Rio-grandense
Sertão Santana;47793,25 R$;5989 pessoas;252,013 km²;Porto Alegre;Metropolitana de Porto Alegre
Sete de Setembro;54712,96 R$;1881 pessoas;131,660 km²;Ijuí;Noroeste Rio-grandense
Severiano de Almeida;41422,91 R$;3463 pessoas;167,598 km²;Passo Fundo;Noroeste Rio-grandense
Silveira Martins;36630 R$;2056 pessoas;119,285 km²;Santa Maria;Centro Ocidental Rio-grandense
Sinimbu;21028,34 R$;8685 pessoas;509,778 km²;Santa Cruz do Sul - Lajeado;Centro Oriental Rio-grandense
Sobradinho;29163,04 R$;14512 pessoas;128,823 km²;Santa Cruz do Sul - Lajeado;Centro Oriental Rio-grandense
Soledade;45230,98 R$;30939 pessoas;1215,056 km²;Passo Fundo;Noroeste Rio-grandense
Tabaí;29502,75 R$;4569 pessoas;94,754 km²;Santa Cruz do Sul - Lajeado;Centro Oriental Rio-grandense
Tapejara;65852,84 R$;25256 pessoas;238,082 km²;Passo Fundo;Noroeste Rio-grandense
Tapera;60580,29 R$;10824 pessoas;179,935 km²;Passo Fundo;Noroeste Rio-grandense
Tapes;34781,51 R$;14920 pessoas;805,452 km²;Porto Alegre;Metropolitana de Porto Alegre
Taquara;27171,31 R$;54353 pessoas;450,195 km²;Porto Alegre;Metropolitana de Porto Alegre
Taquari;40661,52 R$;25963 pessoas;349,967 km²;Santa Cruz do Sul - Lajeado;Centro Oriental Rio-grandense
Taquaruçu do Sul;61297,18 R$;3192 pessoas;76,917 km²;Passo Fundo;Noroeste Rio-grandense
Tavares;22657,34 R$;5319 pessoas;610,107 km²;Porto Alegre;Metropolitana de Porto Alegre
Tenente Portela;43273,27 R$;14820 pessoas;337,495 km²;Ijuí;Noroeste Rio-grandense
Terra de Areia;25729,73 R$;10575 pessoas;142,304 km²;Porto Alegre;Metropolitana de Porto Alegre
Teutônia;45981,15 R$;34023 pessoas;175,874 km²;Santa Cruz do Sul - Lajeado;Centro Oriental Rio-grandense
Tio Hugo;56784,45 R$;3358 pessoas;113,944 km²;Passo Fundo;Noroeste Rio-grandense
Tiradentes do Sul;35473,86 R$;5188 pessoas;236,653 km²;Ijuí;Noroeste Rio-grandense
Toropi;36808,11 R$;2594 pessoas;198,316 km²;Santa Maria;Centro Ocidental Rio-grandense
Torres;35095,54 R$;43344 pessoas;161,630 km²;Porto Alegre;Metropolitana de Porto Alegre
Tramandaí;23072,56 R$;56430 pessoas;142,878 km²;Porto Alegre;Metropolitana de Porto Alegre
Travesseiro;33499,3 R$;2192 pessoas;80,681 km²;Santa Cruz do Sul - Lajeado;Centro Oriental Rio-grandense
Três Arroios;53891,49 R$;2636 pessoas;148,601 km²;Passo Fundo;Noroeste Rio-grandense
Três Cachoeiras;27614,79 R$;11224 pessoas;251,483 km²;Porto Alegre;Metropolitana de Porto Alegre
Três Coroas;27813,49 R$;24428 pessoas;168,124 km²;Porto Alegre;Metropolitana de Porto Alegre
Três de Maio;56767,21 R$;25466 pessoas;421,461 km²;Ijuí;Noroeste Rio-grandense
Três Forquilhas;24297,46 R$;2813 pessoas;217,386 km²;Porto Alegre;Metropolitana de Porto Alegre
Três Palmeiras;42185,43 R$;4829 pessoas;180,599 km²;Passo Fundo;Noroeste Rio-grandense
Três Passos;43406,37 R$;26304 pessoas;268,902 km²;Ijuí;Noroeste Rio-grandense
Trindade do Sul;60779,96 R$;7785 pessoas;268,417 km²;Passo Fundo;Noroeste Rio-grandense
Triunfo;430464,73 R$;28435 pessoas;817,807 km²;Porto Alegre;Metropolitana de Porto Alegre
Tucunduva;46209,93 R$;5646 pessoas;181,198 km²;Ijuí;Noroeste Rio-grandense
Tunas;26356,28 R$;3732 pessoas;217,302 km²;Santa Cruz do Sul - Lajeado;Noroeste Rio-grandense
Tupanci do Sul;65464,21 R$;1396 pessoas;135,664 km²;Passo Fundo;Noroeste Rio-grandense
Tupanciretã;84856,89 R$;20324 pessoas;2253,234 km²;Passo Fundo;Centro Ocidental Rio-grandense
Tupandi;106314,39 R$;5172 pessoas;59,406 km²;Porto Alegre;Metropolitana de Porto Alegre
Tuparendi;49616,17 R$;8535 pessoas;307,710 km²;Ijuí;Noroeste Rio-grandense
Turuçu;48041,68 R$;3488 pessoas;253,635 km²;Pelotas;Sudeste Rio-grandense
Ubiretama;56727,23 R$;2025 pessoas;125,876 km²;Ijuí;Noroeste Rio-grandense
União da Serra;84108 R$;1183 pessoas;131,154 km²;Caxias do Sul;Nordeste Rio-grandense
Unistalda;64642,76 R$;2047 pessoas;602,260 km²;Santa Maria;Centro Ocidental Rio-grandense
Uruguaiana;29322,46 R$;120819 pessoas;5702,098 km²;Uruguaiana;Sudoeste Rio-grandense
Vacaria;48503,58 R$;66146 pessoas;2124,492 km²;Caxias do Sul;Nordeste Rio-grandense
Vale do Sol;22969,08 R$;10069 pessoas;329,389 km²;Santa Cruz do Sul - Lajeado;Centro Oriental Rio-grandense
Vale Real;32797,33 R$;6223 pessoas;45,085 km²;Caxias do Sul;Metropolitana de Porto Alegre
Vale Verde;36944,67 R$;3213 pessoas;329,727 km²;Santa Cruz do Sul - Lajeado;Metropolitana de Porto Alegre
Vanini;44495,54 R$;2047 pessoas;64,905 km²;Passo Fundo;Noroeste Rio-grandense
Venâncio Aires;51566,6 R$;70842 pessoas;772,701 km²;Santa Cruz do Sul - Lajeado;Centro Oriental Rio-grandense
Vera Cruz;30254,93 R$;27670 pessoas;309,994 km²;Santa Cruz do Sul - Lajeado;Centro Oriental Rio-grandense
Veranópolis;64845,47 R$;24554 pessoas;289,397 km²;Caxias do Sul;Nordeste Rio-grandense
Vespasiano Corrêa;67251,6 R$;1851 pessoas;113,622 km²;Santa Cruz do Sul - Lajeado;Centro Oriental Rio-grandense
Viadutos;44204,95 R$;4847 pessoas;266,670 km²;Passo Fundo;Noroeste Rio-grandense
Viamão;16846,27 R$;231996 pessoas;1496,019 km²;Porto Alegre;Metropolitana de Porto Alegre
Vicente Dutra;27927,91 R$;4741 pessoas;193,023 km²;Passo Fundo;Noroeste Rio-grandense
Victor Graeff;104179,68 R$;2829 pessoas;238,133 km²;Passo Fundo;Noroeste Rio-grandense
Vila Flores;87335,42 R$;3741 pessoas;107,703 km²;Caxias do Sul;Nordeste Rio-grandense
Vila Lângaro;81609,37 R$;2121 pessoas;151,673 km²;Passo Fundo;Noroeste Rio-grandense
Vila Maria;89149,59 R$;4515 pessoas;181,061 km²;Passo Fundo;Noroeste Rio-grandense
Vila Nova do Sul;45844,94 R$;3932 pessoas;508,278 km²;Santa Maria;Centro Ocidental Rio-grandense
Vista Alegre;50279,94 R$;2710 pessoas;77,656 km²;Passo Fundo;Noroeste Rio-grandense
Vista Alegre do Prata;54879,53 R$;1624 pessoas;119,327 km²;Caxias do Sul;Nordeste Rio-grandense
Vista Gaúcha;36218,23 R$;2843 pessoas;90,022 km²;Ijuí;Noroeste Rio-grandense
Vitória das Missões;52269,64 R$;3316 pessoas;258,454 km²;Ijuí;Noroeste Rio-grandense
Westfália;86946,36 R$;3223 pessoas;66,875 km²;Santa Cruz do Sul - Lajeado;Centro Oriental Rio-grandense
Xangri-lá;42809,21 R$;16949 pessoas;60,756 km²;Porto Alegre;Metropolitana de Porto Alegre`;

// Updated Colors for the 11 Macro-Regions (Matches the map provided)
export const REGION_COLORS: Record<string, string> = {
  "Porto Alegre": "#00aeef", // 1 - Cyan/Blue
  "Serra Gaúcha": "#a9d18e", // 2 - Pale Green
  "Hidrominerais": "#ed5b62", // 3 - Red/Pinkish
  "Litoral Norte": "#fdb913", // 4 - Orange/Gold
  "Rota do Yucumã": "#f49e4e", // 5 - Peach/Orange
  "Missões": "#7f4f2f", // 6 - Brown
  "Central": "#f09cb6", // 7 - Pink
  "Vales": "#d9e021", // 8 - Lime Green
  "Pampa Gaúcho": "#a6ce39", // 9 - Green
  "Costa Doce": "#fbd55a", // 10 - Yellow
  "Rota das Terras Encantadas": "#8ec6eb", // 11 - Light Blue
};

// Explicit Overrides for known Tourism Municipalities
const MACRO_REGION_MAP: Record<string, string> = {
  // 1. Porto Alegre (Strict Metro Core)
  "Porto Alegre": "Porto Alegre",
  "Canoas": "Porto Alegre",
  "Viamão": "Porto Alegre",
  "Alvorada": "Porto Alegre",
  "Cachoeirinha": "Porto Alegre",
  "Gravataí": "Porto Alegre",
  "Guaíba": "Porto Alegre",
  "Eldorado do Sul": "Porto Alegre",
  "Esteio": "Porto Alegre",
  "Sapucaia do Sul": "Porto Alegre",

  // 4. Litoral Norte (Explicit Coast)
  "Torres": "Litoral Norte",
  "Arroio do Sal": "Litoral Norte",
  "Três Cachoeiras": "Litoral Norte",
  "Três Forquilhas": "Litoral Norte",
  "Terra de Areia": "Litoral Norte",
  "Itati": "Litoral Norte",
  "Maquiné": "Litoral Norte",
  "Osório": "Litoral Norte",
  "Capão da Canoa": "Litoral Norte",
  "Xangri-lá": "Litoral Norte",
  "Imbé": "Litoral Norte",
  "Tramandaí": "Litoral Norte",
  "Cidreira": "Litoral Norte",
  "Balneário Pinhal": "Litoral Norte",
  "Palmares do Sul": "Litoral Norte",
  "Mostardas": "Litoral Norte",
  "Tavares": "Litoral Norte",
  "Mampituba": "Litoral Norte",
  "Dom Pedro de Alcântara": "Litoral Norte",
  "Morrinhos do Sul": "Litoral Norte",
  "Caraá": "Litoral Norte",
  "Santo Antônio da Patrulha": "Litoral Norte", // Often associated

  // 5. Rota do Yucumã (Specific Northwest)
  "Tenente Portela": "Rota do Yucumã",
  "Derrubadas": "Rota do Yucumã",
  "Barra do Guarita": "Rota do Yucumã",
  "Vista Gaúcha": "Rota do Yucumã",
  "Esperança do Sul": "Rota do Yucumã",
  "Tiradentes do Sul": "Rota do Yucumã",
  "Crissiumal": "Rota do Yucumã",
  "Humaitá": "Rota do Yucumã",
  "Sede Nova": "Rota do Yucumã",
  "São Martinho": "Rota do Yucumã",
  "Campo Novo": "Rota do Yucumã",
  "Braga": "Rota do Yucumã",
  "Redentora": "Rota do Yucumã",
  "Miraguaí": "Rota do Yucumã",
  "Bom Progresso": "Rota do Yucumã",
  "Três Passos": "Rota do Yucumã",
  "Chiapetta": "Rota do Yucumã",

  // 6. Missões (Specific West)
  "Santo Ângelo": "Missões",
  "São Miguel das Missões": "Missões",
  "Entre-Ijuís": "Missões",
  "Vitória das Missões": "Missões",
  "Eugênio de Castro": "Missões",
  "São Luiz Gonzaga": "Missões",
  "Roque Gonzales": "Missões",
  "Rolador": "Missões",
  "Caibaté": "Missões",
  "Mato Queimado": "Missões",
  "São Nicolau": "Missões",
  "Pirapó": "Missões",
  "Dezesseis de Novembro": "Missões",
  "Porto Xavier": "Missões",
  "Porto Lucena": "Missões",
  "Porto Vera Cruz": "Missões",
  "Alecrim": "Missões",
  "Santo Cristo": "Missões",
  "Tucunduva": "Missões",
  "Tuparendi": "Missões",
  "Santa Rosa": "Missões",
  "Giruá": "Missões",
  "Senador Salgado Filho": "Missões",
  "Ubiretama": "Missões",
  "Guarani das Missões": "Missões",
  "Sete de Setembro": "Missões",
  "Cerro Largo": "Missões",
  "Salvador das Missões": "Missões",
  "São Pedro do Butiá": "Missões",
  "Campina das Missões": "Missões",
  "Cândido Godói": "Missões",
  "Porto Mauá": "Missões",
  "Novo Machado": "Missões",
  "Doutor Maurício Cardoso": "Missões",
  "Horizontina": "Missões",
  "Três de Maio": "Missões",
  "São José do Inhacorá": "Missões",
  "Boa Vista do Buricá": "Missões",
  "Nova Candelária": "Missões",
  "Independência": "Missões",
  "Inhacorá": "Missões",
  "Alegria": "Missões",
  "São Valério do Sul": "Missões",
  "Santo Antônio das Missões": "Missões",
  "Garruchos": "Missões",
  "São Borja": "Missões", // Border Missões/Pampa, map shows 6 extends to São Borja usually.
  "Bossoroca": "Missões",
  
  // 3. Hidrominerais (North Strip)
  "Erechim": "Hidrominerais",
  "Getúlio Vargas": "Hidrominerais",
  "Estação": "Hidrominerais",
  "Ipiranga do Sul": "Hidrominerais",
  "Erebango": "Hidrominerais",
  "Quatro Irmãos": "Hidrominerais",
  "Jacutinga": "Hidrominerais",
  "Campinas do Sul": "Hidrominerais",
  "Ponte Preta": "Hidrominerais",
  "Paulo Bento": "Hidrominerais",
  "Barão de Cotegipe": "Hidrominerais",
  "São Valentim": "Hidrominerais",
  "Entre Rios do Sul": "Hidrominerais",
  "Benjamin Constant do Sul": "Hidrominerais",
  "Faxinalzinho": "Hidrominerais",
  "Nonoai": "Hidrominerais",
  "Rio dos Índios": "Hidrominerais",
  "Alpestre": "Hidrominerais",
  "Planalto": "Hidrominerais",
  "Ametista do Sul": "Hidrominerais",
  "Rodeio Bonito": "Hidrominerais",
  "Pinhal": "Hidrominerais",
  "Novo Tiradentes": "Hidrominerais",
  "Cerro Grande": "Hidrominerais",
  "Iraí": "Hidrominerais",
  "Vicente Dutra": "Hidrominerais",
  "Caiçara": "Hidrominerais",
  "Frederico Westphalen": "Hidrominerais",
  "Palmitinho": "Hidrominerais",
  "Pinheirinho do Vale": "Hidrominerais",
  "Vista Alegre": "Hidrominerais",
  "Taquaruçu do Sul": "Hidrominerais",
  "Seberi": "Hidrominerais",
  "Erval Seco": "Hidrominerais",
  "Dois Irmãos das Missões": "Hidrominerais",
  "Marcelino Ramos": "Hidrominerais",
  "Viadutos": "Hidrominerais",
  "Gaurama": "Hidrominerais",
  "Áurea": "Hidrominerais",
  "Centenário": "Hidrominerais",
  "Carlos Gomes": "Hidrominerais",
  "Maximiliano de Almeida": "Hidrominerais",
  "Machadinho": "Hidrominerais",
  "Barracão": "Hidrominerais",
  "São José do Ouro": "Hidrominerais",
  "Tupanci do Sul": "Hidrominerais",
  "Paim Filho": "Hidrominerais",
  "Sananduva": "Hidrominerais",
  "Santo Expedito do Sul": "Hidrominerais",
  "São João da Urtiga": "Hidrominerais",

  // 11. Rota das Terras Encantadas (North Central)
  "Passo Fundo": "Rota das Terras Encantadas",
  "Marau": "Rota das Terras Encantadas",
  "Carazinho": "Rota das Terras Encantadas",
  "Não-Me-Toque": "Rota das Terras Encantadas",
  "Espumoso": "Rota das Terras Encantadas",
  "Tapera": "Rota das Terras Encantadas",
  "Ibirubá": "Rota das Terras Encantadas",
  "Cruz Alta": "Rota das Terras Encantadas",
  "Panambi": "Rota das Terras Encantadas",
  "Ijuí": "Rota das Terras Encantadas", // Usually Region 11 extends west to Ijuí
  "Lagoa Vermelha": "Rota das Terras Encantadas", // Sometimes Region 2 or 11. Map shows 11 going east.
  "Soledade": "Rota das Terras Encantadas",
  "Mato Castelhano": "Rota das Terras Encantadas",
  "Coxilha": "Rota das Terras Encantadas",
  "Pontão": "Rota das Terras Encantadas",
  "Sertão": "Rota das Terras Encantadas",
  "Vila Lângaro": "Rota das Terras Encantadas",
  "Água Santa": "Rota das Terras Encantadas",
  "Tapejara": "Rota das Terras Encantadas",
  "Vila Maria": "Rota das Terras Encantadas",
  "Camargo": "Rota das Terras Encantadas",
  "Nova Alvorada": "Rota das Terras Encantadas",
  "Itapuca": "Rota das Terras Encantadas",
  "Nicolau Vergueiro": "Rota das Terras Encantadas",
  "Ernestina": "Rota das Terras Encantadas",
  "Tio Hugo": "Rota das Terras Encantadas",
  "Victor Graeff": "Rota das Terras Encantadas",
  "Santo Antônio do Planalto": "Rota das Terras Encantadas",
  "Coqueiros do Sul": "Rota das Terras Encantadas",
  "Almirante Tamandaré do Sul": "Rota das Terras Encantadas",
  "Chapada": "Rota das Terras Encantadas",
  "Sarandi": "Rota das Terras Encantadas",
  "Ronda Alta": "Rota das Terras Encantadas",
  "Três Palmeiras": "Rota das Terras Encantadas",
  "Engenho Velho": "Rota das Terras Encantadas",
  "Novo Xingu": "Rota das Terras Encantadas",
  "Constantina": "Rota das Terras Encantadas",
  "Liberato Salzano": "Rota das Terras Encantadas",
  "Novo Barreiro": "Rota das Terras Encantadas",
  "Barra Funda": "Rota das Terras Encantadas",
  "Nova Boa Vista": "Rota das Terras Encantadas",
  "Lajeado do Bugre": "Rota das Terras Encantadas",
  "Sagrada Família": "Rota das Terras Encantadas",
  "São Pedro das Missões": "Rota das Terras Encantadas",
  "São José das Missões": "Rota das Terras Encantadas",
  "Jaboticaba": "Rota das Terras Encantadas",
  "Boa Vista das Missões": "Rota das Terras Encantadas",
  "Palmeira das Missões": "Rota das Terras Encantadas",
  "Coronel Bicaco": "Rota das Terras Encantadas",
  "Santo Augusto": "Rota das Terras Encantadas",
  "Nova Ramada": "Rota das Terras Encantadas",
  "Ajuricaba": "Rota das Terras Encantadas",
  "Bozano": "Rota das Terras Encantadas",
  "Pejuçara": "Rota das Terras Encantadas",
  "Santa Bárbara do Sul": "Rota das Terras Encantadas",
  "Saldanha Marinho": "Rota das Terras Encantadas",
  "Colorado": "Rota das Terras Encantadas",
  "Lagoa dos Três Cantos": "Rota das Terras Encantadas",
  "Selbach": "Rota das Terras Encantadas",
  "Quinze de Novembro": "Rota das Terras Encantadas",
  "Fortaleza dos Valos": "Rota das Terras Encantadas",
  "Boa Vista do Incra": "Rota das Terras Encantadas",
  "Jacuizinho": "Rota das Terras Encantadas",
  "Salto do Jacuí": "Rota das Terras Encantadas",
  "Alto Alegre": "Rota das Terras Encantadas",
  "Campos Borges": "Rota das Terras Encantadas",
  "Ibirapuitã": "Rota das Terras Encantadas",
  "Mormaço": "Rota das Terras Encantadas",
  "Barros Cassal": "Rota das Terras Encantadas",
  "Fontoura Xavier": "Rota das Terras Encantadas",
  "São José do Herval": "Rota das Terras Encantadas",
  "Pouso Novo": "Rota das Terras Encantadas", // Border Vales/Terras

  // 7. Central (Santa Maria & surroundings)
  "Santa Maria": "Central",
  "Itaara": "Central",
  "São Martinho da Serra": "Central",
  "Silveira Martins": "Central",
  "São João do Polêsine": "Central",
  "Dona Francisca": "Central",
  "Faxinal do Soturno": "Central",
  "Ivorá": "Central",
  "Nova Palma": "Central",
  "Pinhal Grande": "Central",
  "São Pedro do Sul": "Central",
  "Dilermando de Aguiar": "Central",
  "Quevedos": "Central",
  "Toropi": "Central",
  "Jari": "Central",
  "Mata": "Central",
  "São Vicente do Sul": "Central",
  "Jaguari": "Central",
  "Nova Esperança do Sul": "Central",
  "Santiago": "Central",
  "Unistalda": "Central",
  "Capão do Cipó": "Central",
  "Tupanciretã": "Central",
  "Júlio de Castilhos": "Central",
  "Agudo": "Central",
  "Paraíso do Sul": "Central",
  "Novo Cabrais": "Central",
  "Cerro Branco": "Central",
  "Cachoeira do Sul": "Central",
  "Restinga Sêca": "Central",
  "Formigueiro": "Central",
  "São Sepé": "Central",
  "Vila Nova do Sul": "Central",
  "Caçapava do Sul": "Central", // Often Central or Pampa. Map shows Central (Pink) going south a bit.
  "Santana da Boa Vista": "Central",

  // 2. Serra Gaúcha (Northeast)
  "Caxias do Sul": "Serra Gaúcha",
  "Bento Gonçalves": "Serra Gaúcha",
  "Farroupilha": "Serra Gaúcha",
  "Flores da Cunha": "Serra Gaúcha",
  "Garibaldi": "Serra Gaúcha",
  "Carlos Barbosa": "Serra Gaúcha",
  "Nova Prata": "Serra Gaúcha",
  "Veranópolis": "Serra Gaúcha",
  "Guaporé": "Serra Gaúcha",
  "Gramado": "Serra Gaúcha",
  "Canela": "Serra Gaúcha",
  "Nova Petrópolis": "Serra Gaúcha",
  "São Francisco de Paula": "Serra Gaúcha",
  "Cambará do Sul": "Serra Gaúcha",
  "Jaquirana": "Serra Gaúcha",
  "Bom Jesus": "Serra Gaúcha",
  "São José dos Ausentes": "Serra Gaúcha",
  "Vacaria": "Serra Gaúcha",
  "Muitos Capões": "Serra Gaúcha",
  "Esmeralda": "Serra Gaúcha",
  "Pinhal da Serra": "Serra Gaúcha",
  "Campestre da Serra": "Serra Gaúcha",
  "Ipê": "Serra Gaúcha",
  "Antônio Prado": "Serra Gaúcha",
  "Nova Roma do Sul": "Serra Gaúcha",
  "São Marcos": "Serra Gaúcha",
  "Picada Café": "Serra Gaúcha",
  "Santa Maria do Herval": "Serra Gaúcha",
  "Morro Reuter": "Serra Gaúcha",
  "Linha Nova": "Serra Gaúcha",
  "Presidente Lucena": "Serra Gaúcha",
  "Ivoti": "Serra Gaúcha",
  "Dois Irmãos": "Serra Gaúcha",
  "Bom Princípio": "Serra Gaúcha",
  "São Vendelino": "Serra Gaúcha",
  "Alto Feliz": "Serra Gaúcha",
  "Vale Real": "Serra Gaúcha",
  "Feliz": "Serra Gaúcha",
  "Monte Belo do Sul": "Serra Gaúcha",
  "Santa Tereza": "Serra Gaúcha",
  "Pinto Bandeira": "Serra Gaúcha",
  "Cotiporã": "Serra Gaúcha",
  "Fagundes Varela": "Serra Gaúcha",
  "Vila Flores": "Serra Gaúcha",
  "Protásio Alves": "Serra Gaúcha",
  "Nova Araçá": "Serra Gaúcha",
  "Nova Bassano": "Serra Gaúcha",
  "Paraí": "Serra Gaúcha",
  "São Jorge": "Serra Gaúcha",
  "Guabiju": "Serra Gaúcha",
  "São Domingos do Sul": "Serra Gaúcha",
  "Casca": "Serra Gaúcha",
  "Santo Antônio do Palma": "Serra Gaúcha",
  "Gentil": "Serra Gaúcha",
  "Montauri": "Serra Gaúcha",
  "União da Serra": "Serra Gaúcha",
  "Serafina Corrêa": "Serra Gaúcha",
  "Dois Lajeados": "Serra Gaúcha",
  "São Valentim do Sul": "Serra Gaúcha",
  "Monte Alegre dos Campos": "Serra Gaúcha",
  "Capão Bonito do Sul": "Serra Gaúcha",
  "Caseiros": "Serra Gaúcha",
  "Ibiraiaras": "Serra Gaúcha",
  "Muliterno": "Serra Gaúcha",
  "David Canabarro": "Serra Gaúcha",
  "Ciríaco": "Serra Gaúcha",
  "Vanini": "Serra Gaúcha",
  "André da Rocha": "Serra Gaúcha",
  "Vista Alegre do Prata": "Serra Gaúcha",
  "Coronel Pilar": "Serra Gaúcha",
  "Nova Pádua": "Serra Gaúcha",

  // 8. Vales (Central East - Taquari, Rio Pardo, Sinos, Caí)
  "Santa Cruz do Sul": "Vales",
  "Venâncio Aires": "Vales",
  "Lajeado": "Vales",
  "Estrela": "Vales",
  "Teutônia": "Vales",
  "Encantado": "Vales",
  "Arroio do Meio": "Vales",
  "Taquari": "Vales",
  "Montenegro": "Vales",
  "São Sebastião do Caí": "Vales",
  "Portão": "Vales",
  "São Leopoldo": "Vales",
  "Novo Hamburgo": "Vales",
  "Campo Bom": "Vales",
  "Sapiranga": "Vales",
  "Parobé": "Vales",
  "Taquara": "Vales",
  "Igrejinha": "Vales",
  "Três Coroas": "Vales",
  "Rolante": "Vales",
  "Riozinho": "Vales",
  "Araricá": "Vales",
  "Nova Hartz": "Vales",
  "Estância Velha": "Vales",
  "Lindolfo Collor": "Vales",
  "São José do Hortêncio": "Vales",
  "Tupandi": "Vales",
  "Salvador do Sul": "Vales",
  "Barão": "Vales",
  "São Pedro da Serra": "Vales",
  "Harmonia": "Vales",
  "Pareci Novo": "Vales",
  "Capela de Santana": "Vales",
  "Triunfo": "Vales", // Sometimes Carbonífera, but geographically fits Vales/Poa border.
  "Tabaí": "Vales",
  "Paverama": "Vales",
  "Fazenda Vilanova": "Vales",
  "Bom Retiro do Sul": "Vales",
  "Cruzeiro do Sul": "Vales",
  "Mato Leitão": "Vales",
  "Santa Clara do Sul": "Vales",
  "Westfália": "Vales",
  "Imigrante": "Vales",
  "Colinas": "Vales",
  "Roca Sales": "Vales",
  "Muçum": "Vales",
  "Vespasiano Corrêa": "Vales",
  "Relvado": "Vales",
  "Doutor Ricardo": "Vales",
  "Anta Gorda": "Vales",
  "Arvorezinha": "Vales",
  "Ilópolis": "Vales",
  "Putinga": "Vales",
  "Coqueiro Baixo": "Vales",
  "Nova Bréscia": "Vales",
  "Capitão": "Vales",
  "Travesseiro": "Vales",
  "Marques de Souza": "Vales",
  "Forquetinha": "Vales",
  "Canudos do Vale": "Vales",
  "Sério": "Vales",
  "Boqueirão do Leão": "Vales",
  "Progresso": "Vales",
  "Gramado Xavier": "Vales",
  "Sinimbu": "Vales",
  "Vera Cruz": "Vales",
  "Vale do Sol": "Vales",
  "Herveiras": "Vales",
  "Passo do Sobrado": "Vales",
  "Vale Verde": "Vales",
  "Rio Pardo": "Vales",
  "Pantano Grande": "Vales",
  "Candelária": "Vales",
  "Passa Sete": "Vales",
  "Lagoão": "Vales",
  "Segredo": "Vales",
  "Sobradinho": "Vales",
  "Ibarama": "Vales",
  "Arroio do Tigre": "Vales",
  "Tunas": "Vales",
  "Estrela Velha": "Vales",
  "Lagoa Bonita do Sul": "Vales",
  "Maratá": "Vales",
  "Brochier": "Vales",
  "São José do Sul": "Vales",
  "Poço das Antas": "Vales",

  // 9. Pampa Gaúcho (Southwest)
  "Uruguaiana": "Pampa Gaúcho",
  "Sant'ana do Livramento": "Pampa Gaúcho",
  "Bagé": "Pampa Gaúcho",
  "Dom Pedrito": "Pampa Gaúcho",
  "São Gabriel": "Pampa Gaúcho",
  "Rosário do Sul": "Pampa Gaúcho",
  "Alegrete": "Pampa Gaúcho",
  "Quaraí": "Pampa Gaúcho",
  "Barra do Quaraí": "Pampa Gaúcho",
  "Itaqui": "Pampa Gaúcho",
  "Maçambará": "Pampa Gaúcho",
  "Manoel Viana": "Pampa Gaúcho",
  "São Francisco de Assis": "Pampa Gaúcho",
  "Cacequi": "Pampa Gaúcho",
  "Santa Margarida do Sul": "Pampa Gaúcho",
  "Lavras do Sul": "Pampa Gaúcho",
  "Hulha Negra": "Pampa Gaúcho",
  "Candiota": "Pampa Gaúcho",
  "Aceguá": "Pampa Gaúcho",
  "Pedras Altas": "Pampa Gaúcho",
  "Pinheiro Machado": "Pampa Gaúcho",
  
  // 10. Costa Doce (Southeast & Lagoon)
  "Pelotas": "Costa Doce",
  "Rio Grande": "Costa Doce",
  "São José do Norte": "Costa Doce",
  "Santa Vitória do Palmar": "Costa Doce",
  "Chuí": "Costa Doce",
  "Capão do Leão": "Costa Doce",
  "Arroio do Padre": "Costa Doce",
  "Morro Redondo": "Costa Doce",
  "Canguçu": "Costa Doce",
  "Piratini": "Costa Doce",
  "Cerrito": "Costa Doce",
  "Pedro Osório": "Costa Doce",
  "Herval": "Costa Doce",
  "Arroio Grande": "Costa Doce",
  "Jaguarão": "Costa Doce",
  "Turuçu": "Costa Doce",
  "São Lourenço do Sul": "Costa Doce",
  "Cristal": "Costa Doce",
  "Amaral Ferrador": "Costa Doce",
  "Camaquã": "Costa Doce",
  "Arambaré": "Costa Doce",
  "Tapes": "Costa Doce",
  "Sentinela do Sul": "Costa Doce",
  "Cerro Grande do Sul": "Costa Doce",
  "Sertão Santana": "Costa Doce",
  "Barão do Triunfo": "Costa Doce",
  "Mariana Pimentel": "Costa Doce",
  "Barra do Ribeiro": "Costa Doce",
  "Dom Feliciano": "Costa Doce",
  "Chuvisca": "Costa Doce",
  "Encruzilhada do Sul": "Costa Doce", // Border
  "São Jerônimo": "Costa Doce", // Carbonífera
  "Charqueadas": "Costa Doce", // Carbonífera
  "Butiá": "Costa Doce", // Carbonífera
  "Minas do Leão": "Costa Doce", // Carbonífera
  "Arroio dos Ratos": "Costa Doce", // Carbonífera
  "General Câmara": "Costa Doce", // Border Vales
  "Nova Santa Rita": "Costa Doce", // Sometimes Vales/Metro. Let's put in Costa Doce/Metro border or Vales. Map 10 goes high up.
  "Capivari do Sul": "Costa Doce", // Or Litoral? Map 10 or 4. Usually 4.
};

// Override specific edge cases based on visual map intuition
MACRO_REGION_MAP["Capivari do Sul"] = "Litoral Norte";
MACRO_REGION_MAP["Palmares do Sul"] = "Litoral Norte";
MACRO_REGION_MAP["Nova Santa Rita"] = "Porto Alegre"; // Metro

const getTourismRegion = (name: string, regiaoIntermediaria: string, mesorregiao: string): string => {
  // 1. Check Explicit List
  if (MACRO_REGION_MAP[name]) {
    return MACRO_REGION_MAP[name];
  }

  // 2. Fallback Heuristics (For any city not in the list above)
  
  // Pampa
  if (mesorregiao === "Sudoeste Rio-grandense" || regiaoIntermediaria === "Uruguaiana") {
      return "Pampa Gaúcho";
  }

  // Costa Doce
  if (mesorregiao === "Sudeste Rio-grandense" || regiaoIntermediaria === "Pelotas") {
      return "Costa Doce";
  }

  // Central
  if (regiaoIntermediaria === "Santa Maria" || mesorregiao === "Centro Ocidental Rio-grandense") {
      return "Central";
  }

  // Serra
  if (regiaoIntermediaria === "Caxias do Sul") {
      // Check if Coast (should be caught by explicit list, but safety check)
      if (name.includes("Praia") || name.includes("Balneário") || name === "Mampituba") return "Litoral Norte";
      return "Serra Gaúcha";
  }

  // Vales
  if (regiaoIntermediaria === "Santa Cruz do Sul - Lajeado") {
      return "Vales";
  }

  // Missões & Yucumã & Terras & Hidro (Complex North/West)
  if (regiaoIntermediaria === "Ijuí") {
     // West -> Missões, North -> Yucumã.
     // Heuristic: Default to Missões if not explicitly mapped to Yucumã above.
     return "Missões";
  }

  if (regiaoIntermediaria === "Passo Fundo") {
      // North -> Hidrominerais, South -> Terras.
      // Without lat/long, hard to split perfectly.
      // Default to Terras Encantadas (Region 11) as it is large and central to this int-region.
      return "Rota das Terras Encantadas";
  }

  // Porto Alegre Metro Area Remnants
  if (regiaoIntermediaria === "Porto Alegre") {
      // If not in the explicit "Porto Alegre" list (Region 1) or "Litoral" list,
      // it likely belongs to Vales (Region 8) or Costa Doce (Region 10).
      
      // Northern Metro -> Vales
      // Southern Metro -> Costa Doce
      // We handled most explicitly. Default to Vales for safety as it wraps around.
      return "Vales";
  }

  // Final Fallback (Should not happen given RS geography coverage above)
  return "Rota das Terras Encantadas"; 
};

const parseData = (): Record<string, MunicipalityData> => {
  const lines = rawCsvData.split('\n');
  const map: Record<string, MunicipalityData> = {};

  lines.forEach(line => {
    if (!line.trim()) return;
    const [name, pib, pop, area, regiao, meso] = line.split(';');
    
    if (name === 'Municípios') return; 

    const cleanName = name.trim();
    const regiaoIntermediaria = regiao.trim();
    const mesorregiao = meso.trim();

    map[cleanName] = {
      name: cleanName,
      pibPerCapita: pib.trim(),
      populacao: pop.trim(),
      area: area.trim(),
      regiaoIntermediaria: regiaoIntermediaria,
      mesorregiao: mesorregiao,
      regiaoTuristica: getTourismRegion(cleanName, regiaoIntermediaria, mesorregiao)
    };
  });

  return map;
};

export const MUNICIPIOS_DATA = parseData();

export const REGIOES_TURISTICAS = [
  "Porto Alegre",
  "Serra Gaúcha",
  "Hidrominerais",
  "Litoral Norte",
  "Rota do Yucumã",
  "Missões",
  "Central",
  "Vales",
  "Pampa Gaúcho",
  "Costa Doce",
  "Rota das Terras Encantadas"
];

// Helper function to parse formatted strings to numbers
const parseValue = (str: string): number => {
  const clean = str.replace(/[^\d,]/g, '').replace(',', '.');
  return parseFloat(clean) || 0;
};

export const getCityRankings = (cityName: string) => {
  const allCities = Object.values(MUNICIPIOS_DATA);
  const totalCities = allCities.length;

  // Sort by Population Descending
  const sortedByPop = [...allCities].sort((a, b) => parseValue(b.populacao) - parseValue(a.populacao));
  const popRank = sortedByPop.findIndex(c => c.name === cityName) + 1;

  // Sort by PIB Descending
  const sortedByPib = [...allCities].sort((a, b) => parseValue(b.pibPerCapita) - parseValue(a.pibPerCapita));
  const pibRank = sortedByPib.findIndex(c => c.name === cityName) + 1;

  // Sort by Area Descending
  const sortedByArea = [...allCities].sort((a, b) => parseValue(b.area) - parseValue(a.area));
  const areaRank = sortedByArea.findIndex(c => c.name === cityName) + 1;

  return {
    popRank,
    pibRank,
    areaRank,
    totalCities
  };
};
