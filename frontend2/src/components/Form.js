import axios from "axios";
import React, {useEffect, useRef} from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

//ESTILIZAÇÃO COMPLETA DO FRONTEND
const FormContainer = styled.form`
    display: flex;
    align-items: flex-end;
    gap: 10px;
    flex-wrap: wrap;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 5px;
`;

const InputArea = styled.div`
    display: flex;
    flex-direction: column;
`;

const Input = styled.input`
    width: 120px;
    padding: 0 10px;
    border: 1px solid #bbb;
    border-radius: 5px;
    height: 40px;
`;

const Label = styled.label``;

//BOTÃO SALVAR
const Button = styled.button`
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
    border: none;
    background-color: #2c73d2;
    color: white;
    height: 42px;
`;

//INTEFACE DO USUARIO CONECTADA AO BANCO
const Form = ({ getUsers, onEdit, setOnEdit }) => {
    const ref = useRef();

    useEffect(() => {
        const user = ref.current;

        // Limpar os campos quando não estiver editando
        if (!onEdit) {
            user.CNPJ.value = "";
            user.xNome.value = "";
            user.vNF.value = "";
            user.dVenc.value = "";
            user.xLgr.value = "";
            user.nro.value = "";
        } else {
            // Preencher os campos ao editar
            user.CNPJ.value = onEdit.CNPJ;
            user.xNome.value = onEdit.xNome;
            user.vNF.value = onEdit.vNF;
            user.dVenc.value = onEdit.dVenc;
            user.xLgr.value = onEdit.xLgr;
            user.nro.value = onEdit.nro;
        }
    }, [onEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = ref.current;

        if (
            !user.CNPJ.value ||
            !user.xNome.value ||
            !user.vNF.value ||
            !user.dVenc.value ||
            !user.xLgr.value ||
            !user.nro.value
        ) {
            return toast.warn("Preencha todos os campos.");
        }

        // Enviar dados para a API
        try {
            if (onEdit) {
                await axios.put(`http://localhost:8800/${onEdit.CNPJ}`, {
                    CNPJ: user.CNPJ.value,
                    xNome: user.xNome.value,
                    vNF: user.vNF.value,
                    dVenc: user.dVenc.value,
                    xLgr: user.xLgr.value,
                    nro: user.nro.value,
                });
                toast.success("Usuário atualizado com sucesso.");
            } else {
                await axios.post("http://localhost:8800/", {
                    CNPJ: user.CNPJ.value,
                    xNome: user.xNome.value,
                    vNF: user.vNF.value,
                    dVenc: user.dVenc.value,
                    xLgr: user.xLgr.value,
                    nro: user.nro.value,
                });
                toast.success("Usuário criado com sucesso.");
            }

            // Limpar formulário
            user.CNPJ.value = "";
            user.xNome.value = "";
            user.vNF.value = "";
            user.dVenc.value = "";
            user.xLgr.value = "";
            user.nro.value = "";

            // Resetar o modo de edição
            setOnEdit(null);

            // Atualizar lista de usuários
            getUsers();
        } catch (error) {
            console.error("Erro ao enviar dados para a API:", error);
            toast.error("Erro ao processar a requisição.");
        }
    };

    return (
        <FormContainer ref={ref} onSubmit={handleSubmit}>
            <InputArea>
                <Label> CNPJ / CPF </Label>
                <Input name="CNPJ" />
            </InputArea>
            <InputArea>
                <Label>Nome PJ/PF</Label>
                <Input name="xNome"/>
            </InputArea>
            <InputArea>
                <Label>Valor total</Label>
                <Input name="vNF"/>
            </InputArea>
            <InputArea>
                <Label>Vencimento do boleto</Label>
                <Input name="dVenc" type="date" />
            </InputArea>
            <InputArea>
                <Label>Endereço</Label>
                <Input name="xLgr"/>
            </InputArea>
            <InputArea>
                <Label>número(dessa exata forma)</Label>
                <Input name="nro"/>
            </InputArea>


            <Button type="submit"> SALVAR </Button>
        </FormContainer>
    );

};

export default Form;
