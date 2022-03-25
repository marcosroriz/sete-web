import React from "react";
import { Button } from "react-bootstrap";

import { useReactHookNavCard } from "contexts/ReactHookNavCard";

import BlockTitle from "components/micro/BlockTitle";
import OrderedList from "components/micro/Lists/OrderedList";
import OrderedListItem from "components/micro/Lists/OrderedListItem";
import ButtonsContainer from "components/micro/Buttons/ButtonsContainer";

import CensoExportar from "assets/icons/censo/censo-menu-exportar.png";
import CensoDependencia from "assets/icons/censo/censo-menu-dependencia.png";
import CensoVisualizar from "assets/icons/censo/censo-menu-visualizar.png";
import CensoBaixar from "assets/icons/censo/censo-menu-baixar.png";

import { Container } from "./styles";

const EducaCenso: React.FC = () => {
    const { nextStep } = useReactHookNavCard();

    return (
        <Container>
            <div className="info-title">
                <BlockTitle message="PARA IMPORTAR A BASE DE DADOS PARA O SETE É NECESSÁRIO PRIMEIRAMENTE EXPORTÁ-LA DO SISTEMA EDUCACENSO DO INEP. PARA ISSO, SIGA AS SEGUINTES INSTRUÇÕES:" />
            </div>
            <OrderedList>
                <OrderedListItem listPosition="1" title="Entre no sistema Educacenso" description="Entre no sistema através do seguinte site:">
                    <a href="http://censobasico.inep.gov.br/censobasico/">http://censobasico.inep.gov.br/censobasico/</a>
                </OrderedListItem>
                <OrderedListItem
                    listPosition="2"
                    title="Navegue até a opção de exportação"
                    description={
                        'Após a autenticação do usuário no sistema Educacenso, selecione no menu a opção "Migração", "Exportação" e "Solicitar Arquivo".'
                    }
                >
                    <img src={CensoExportar} alt="Exportar do Censo" />
                </OrderedListItem>
                <OrderedListItem
                    listPosition="3"
                    title="Selecione os dados"
                    description={"Em Dependência administrativa, selecione a opção Municipal e clique no botão Exportar."}
                >
                    <img src={CensoDependencia} alt="Dependência" />
                </OrderedListItem>
                <OrderedListItem
                    listPosition="4"
                    title="Termo de compromisso"
                    description={
                        "Aparecerá o termo de compromisso e, depois de selecionado o de acordo, será apresentado no canto superior direito uma mensagem informando que o arquivo de exportação será processado. Clique em Continuar e novamente no botão Exportar."
                    }
                ></OrderedListItem>
                <OrderedListItem
                    listPosition="5"
                    title="Verificar exportação"
                    description={
                        "Aguarde alguns minutinhos, para baixar o arquivo de exportação clique no botão “Visualizar arquivos” que exibirá a exportação solicitada."
                    }
                >
                    <img src={CensoVisualizar} alt="Visualizar Arquivos" />
                </OrderedListItem>
                <OrderedListItem
                    listPosition="6"
                    title="Baixar base de dados"
                    description={
                        "Se o arquivo já tiver sido gerado o status ficará como “Concluído” e, na coluna “Ação”, aparecerá a opção de baixar o arquivo. Clique no ícone em formato de folha para baixar o arquivo exportado ou clique no botão “Baixar todos”."
                    }
                >
                    <img src={CensoBaixar} alt="Baixar Todos" />
                </OrderedListItem>
                <OrderedListItem
                    listPosition="6"
                    title="Descompactar a base de dados"
                    description={
                        "O arquivo de exportação baixado estará compactado no formato .zip. Descompacte-o com o programa WinRAR ou 7-Zip. O arquivo descompactado será um arquivo de texto simples (.txt)."
                    }
                ></OrderedListItem>
            </OrderedList>
            <ButtonsContainer>
                <Button variant="info" type="button" className="btn-fill" onClick={nextStep}>
                    Próximo
                </Button>
            </ButtonsContainer>
        </Container>
    );
};

export default EducaCenso;
