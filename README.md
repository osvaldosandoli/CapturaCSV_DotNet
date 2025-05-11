# CapturaCSV_DotNet

<h1> Aplicação desenvolvida em C# + .NET Framwork 4.8 </h1>

Funcionalidades da Aplicação:
- Cadastro de Cliente
- Cadastro de Beneficiarios
- Captura de Arquivo .CSV para realizar os cadastros

O sistema tem uma interação entre as seguintes ordens e camadas

1ª Requisição Web
2ª Tratamento via JS que ira passar um JSON para a Controller
3ª Consumo do JSON e BackEnd na Controller
4ª Na Controller são executados os Métodos da BLL e DAL, onde serão acionadas as Procedures para integração com o SQL

<h2> Arquivo CSV disponivel na raiz do projeto </h2>
all.csv
