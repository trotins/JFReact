create database if not exists JFAuto;
use JFAuto;

create table if not exists vendedores(
Id_Vendedor int auto_increment primary key,
Nome varchar(50) not null,
Email varchar(50) not null,
Telefone int
);

create table if not exists clientes(
Id_Cliente int auto_increment primary key,
Nome varchar(50) not null,
iban varchar(50) not null,
email varchar(50)not null,
Telefone int,
VendedoresFK int,
password varchar(100),
Foreign key (VendedoresFK) references vendedores(Id_Vendedor)
);


create table if not exists carros(
Id_Carro int auto_increment primary key,
Combustivel varchar(50) not null,
Cilindrada int,
Potencia int,
Matricula varchar(50) not null,
Cor varchar(50) not null,
Tipo varchar(50) not null,
Ano int,
Marca varchar(50) not null,
Descricao varchar(50) not null,
Foto varchar(50) not null,
VendedoresFK int,
Foreign key (VendedoresFK) references vendedores(Id_Vendedor)
);

CREATE TABLE Imagens_Carros(
    Id_Imagem int not null PRIMARY key auto_increment,
    Id_Carro int,
    caminho varchar(255),
    FOREIGN key(Id_Carro) REFERENCES carros(Id_Carro)
);

insert into vendedores(Nome,Email,Telefone)
values("Francisco",  "francisco.pereira.8796@gmail.com", "961665532"),
("Pedro",  "joaopfbatista@gmail.com",  "934955350"),
("Ana",  "anacatariana1202@gmail.com",  "961663333" );

insert into carros(Combustivel, Cilindrada, Potencia, Matricula,Cor,Tipo, Ano, Marca, Descricao,Foto,VendedoresFK) 
values("Gasoleo", 1200, 90, "54-TP-42","Preto", "sedan", 2018, "Peugeut",  "Carro op",  "meter",  1 ),
("Gasoleo", 2000, 164, "23-TF-42","Azul", "sedan", 2017, "BMW",  "Carro op",  "meter",  2 ),
("Gasoleo", 1400, 100, "33-FG-42","Branco", "sedan", 2019, "Mercedes",  "Carro op",  "meter",  3 ),
("Gasoleo", 1600, 115, "44-ED-42","Azul", "carrinha", 2020, "Peugeut",  "Carro op",  "meter",  1 ),
("Gasoleo", 1200, 90, "52-WD-42","Preto", "carrinha", 2021, "Volvo",  "Carro op",  "meter",  2 ),
("Gasolina", 1400, 80, "26-WR-42","Branco", "carrinha", 2015, "volvo",  "Carro op",  "meter",  1 ),
("Gasoleo", 1600, 130, "16-TV-42","Vermelho", "sedan", 2014, "Peugeut",  "Carro op",  "meter",  2 ),
("Gasoleo", 1600, 120, "76-QS-42","Preto", "carrinha", 2012, "BMW",  "Carro op",  "meter" ,  3),
("Gasoleo", 1900, 150, "96-ZX-42","Preto", "coupe", 2013, "hyundai",  "Carro op",  "meter",  1 ),
("Gasolina", 1800, 190, "36-FF-42","Preto", "coupe", 2014, "kia",  "Carro op",  "meter" ,  2),
("Gasoleo", 1700, 130, "53-JP-42","Preto", "comercial", 2015, "porche",  "Carro op",  "meter",  3 ),
("Gasolina", 1300, 70, "54-FB-42","Preto", "comercial", 2016, "Peugeut",  "Carro op",  "meter",  1 ),
("Gasoleo", 5000, 400, "87-DE-42","Preto", "4x4", 2017, "BMW",  "Carro op",  "meter" ,  2),
("Gasoleo", 2300, 250, "84-TL-42","Preto", "4x4", 2018, "Mercedes",  "Carro op",  "meter",  3 ),
("Gasolina", 2200, 300, "26-TS-42","Preto", "carrinha", 2019, "Peugeut",  "Carro op",  "meter",  1 ),
("Gasoleo", 5100, 700, "94-TP-42","Preto", "4x4", 2020, "Peugeut",  "Carro op",  "meter",  2 ),
("Gasoleo", 3000, 420, "99-XC-42","Preto", "caixa aberta", 2021, "Peugeut",  "Carro op",  "meter",  1 ),
("Gasolina", 3200, 400, "46-ZP-42","Preto", "sedan", 2017, "Mercedes",  "Carro op",  "meter",  2), 
("Gasoleo", 6400, 700, "82-ZS-42","Preto", "camião", 2015, "BMW",  "Carro op",  "meter",  3 ),
("Gasoleo", 1000, 50, "47-GA-42","Preto", "citadino", 2016, "kia",  "Carro op",  "meter" ,  1),
("Gasolina", 900,45, "96-XI-42","Preto", "citadino", 2018, "ford",  "Carro op",  "meter",  3 );

insert into clientes(Nome, iban, Email, Telefone,VendedoresFK) 
values ("Francisco","PT50000712518751036555949","mariasol3528@uorak.com",21215345,1), 
("Francisca","PT50000745777556620206650","8796francisco@gmail.com",212848436,1), 
("Joana","PT50000711077447468221308","rofoy16266@labebx.com",212531936,2), 
("Daniela","PT50000759769181336236150","sonel57566@dvdoto.com",212917068,3), 
("Rodrigo","PT50000799638882820756025","hiyej46467@labebx.com",212329749,3), 
("João","PT50000769515899025185728","motaka9763@labebx.com",212912284,1), 
("Paulo","PT50000742351131930074309","kasomi8552@mxcdd.com",212146756,2), 
("Helena","PT50000741876936389895634","mokinam819@firmjam.com",212459221,3), 
("Carolina","PT50000756194270244784898","vifay40824@mxcdd.com",212327593,2), 
("Clara","PT50000779471306795750711","kogihas546@firmjam.com",212164172,1);







