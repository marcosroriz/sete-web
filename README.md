# sete-web

Repositório contendo o código front-end para o usuário final do SETE

## Layouts

São grandes componentes que são persistidos em várias páginas (Header, Footer, Background);

-   LogLayout: background-image, logo, descrição, footer;
-   SidebarLayout: nav-menu, background-image, footer;

### Cards

-   (Home) InfoCard: title, icon, number;
-   (Home) SearchCard: icon, title;
-   FormCard: required, error, content;
-   BasicNavCard: headers, ...;
-   FormNavCard: ;

### Components

-   (Censo) IndicatorTextComponent: title, subtitle, content\*\*, number;
-   (Relatorios) ReportsList: options, onClick;
-   Input(Biblioteca)Text: label, name, labelOnTop;
-   Input(Biblioteca)TextWithUM: label, name, unitOfMeasure;
-   Input(Biblioteca)Checkbox: label, name, options;
-   Input(Biblioteca)Radio: label, name, options;
-   Input(Biblioteca)Number: label, name, mask;
-   Input(Biblioteca)Select: label, name, options;
-   Table(Biblioteca)General: ;
-   Table(Biblioteca)Basic: ;
-   Table(Biblioteca)Reports: ;
-   Table(Biblioteca)Profile: ;
-   ImportFileComponent: title;
-   MapComponent: title\*\* (implementação da biblioteca de mapas);

## Hooks

-   Alert;
-   AuthContext;
-   Tables;
