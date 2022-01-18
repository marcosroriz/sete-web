import React from "react";
import { Button } from "react-bootstrap";
import { FaDownload } from "react-icons/fa";

import { useReactHookNavCard } from "contexts/ReactHookNavCard";

import BlockTitle from "components/micro/BlockTitle";
import ButtonsContainer from "components/micro/Buttons/ButtonsContainer";

import ExemploObrigatorioImg from "assets/icons/alunos/alunos-exemplo-obrigatorio.png";
import ExemploOpcionalImg from "assets/icons/alunos/alunos-exemplo-opcional.png";

import { Container } from "./styles";

const Planilha: React.FC = () => {
    const { nextStep } = useReactHookNavCard();
    return (
        <Container>
            <BlockTitle message="ESSA FERRAMENTA POSSIBILITA IMPORTAR VÁRIOS ALUNOS PARA O SISTEMA DE UMA VEZ A PARTIR DE DADOS EXISTENTES. PARA TAL, POR FAVOR BAIXE A PLANILHA EXEMPLO QUE DEVERÁ SER PREENCHIDA COM AS SEGUINTES COLUNAS:" />
            <figure className="planilha-exemplo">
                <figcaption>CAMPOS OBRIGATÓRIOS:</figcaption>
                <img src={ExemploObrigatorioImg} alt="Exemplo dos campos obrigatórios" />
            </figure>
            <figure className="planilha-exemplo">
                <figcaption>CAMPOS OPCIONAIS:</figcaption>
                <img src={ExemploOpcionalImg} alt="Exemplo dos campos opcionais" />
            </figure>
            <div className="btn-container">
                <span>PLANILHA DE EXEMPLO</span>
                <Button variant="none" className="btn-fill">
                    <FaDownload className="btn-icon" />
                    Baixar Planilha
                </Button>
            </div>
            <ButtonsContainer>
                <Button variant="info" type="button" className="btn-fill" onClick={nextStep}>
                    Próximo
                </Button>
            </ButtonsContainer>
        </Container>
    );
};

export default Planilha;
