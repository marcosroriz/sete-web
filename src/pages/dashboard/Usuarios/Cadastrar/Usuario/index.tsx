import React from "react";
import { Container, mediaQuery } from "./styles";
import { formatHelper } from "helpers/FormatHelper";
import { useFormContext } from "react-hook-form";
import { Link } from "react-router-dom";
import { useReactHookNavCard } from "contexts/ReactHookNavCard";

import BlockTitle from "components/micro/BlockTitle";
import ReactHookFormItemCard from "components/micro/Cards/ReactHookFormItemCard";
import ReactHookInputRadio from "components/micro/Inputs/ReactHookInputRadio";
import ReactHookInputSelect from "components/micro/Inputs/ReactHookInputSelect";
import ReactHookInputText from "components/micro/Inputs/ReactHookInputText";
import ReactHookInputNumberFormat from "components/micro/Inputs/ReactHookInputNumberFormat";
import ButtonsContainer from "components/micro/Buttons/ButtonsContainer";
import { Button } from "react-bootstrap";
import { Admin } from "entities/Admins";
import { PapeisUsuariosEnum, PapeisUsuariosLabel } from "entities/Admins";

const papeisOptions = formatHelper.getNumbersEnumValues(PapeisUsuariosEnum).map((value) => ({
    label: PapeisUsuariosLabel.get(value as PapeisUsuariosEnum) || "",
    value: value.toString(),
}));

const Usuario: React.FC = () => {
    return (
        <Container>
            <ReactHookFormItemCard required>
                <ReactHookInputText label="NOME COMPLETO: *" name="nome" placeholder="Digite seu nome:" isHorizontal={mediaQuery.desktop} />
            </ReactHookFormItemCard>

            <ReactHookFormItemCard required>
                <ReactHookInputNumberFormat label="CPF: *" name="cpf" format="###.###.###-##" placeholder="Digite seu CPF:" isHorizontal={mediaQuery.desktop} />
            </ReactHookFormItemCard>

            <ReactHookFormItemCard required>
                <ReactHookInputNumberFormat
                    label="TELEFONE:"
                    name="telefone"
                    format={["(##) ####-#####", "(##) #####-####"]}
                    placeholder="Digite seu telefone:"
                    isHorizontal={mediaQuery.desktop}
                />
            </ReactHookFormItemCard>

            <ReactHookFormItemCard required>
                <ReactHookInputText label="E-MAIL: *" name="email" placeholder="Digite seu e-mail:" isHorizontal={mediaQuery.desktop} />
            </ReactHookFormItemCard>

            <ReactHookFormItemCard>
                <ReactHookInputSelect label="PAPEL DO USUÁRIO: " name="papel_usuario" options={papeisOptions} isHorizontal={mediaQuery.desktop} />
            </ReactHookFormItemCard>

            <ReactHookFormItemCard required>
                <ReactHookInputText label="SENHA: *" name="senha" placeholder="Senha:" isHorizontal={mediaQuery.desktop} />
            </ReactHookFormItemCard>

            <ReactHookFormItemCard required>
                <ReactHookInputText label="REPETIR SENHA: *" name="senha" placeholder="Senha:" isHorizontal={mediaQuery.desktop} />
            </ReactHookFormItemCard>

            <ButtonsContainer>
                <Link to={"/usuarios"}>
                    <Button variant="danger" className="btn-fill">
                        Cancelar
                    </Button>
                </Link>
                <Button variant="info" type="submit" className="btn-fill">
                    Registrar
                </Button>
            </ButtonsContainer>
        </Container>
    );
};

export default Usuario;
