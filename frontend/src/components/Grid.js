import React from "react";
import axios from "axios";
import styled from "styled-components";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

const Table = styled.table`
    width: 100%;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 5px;
    max-width: 800px;
    margin: 20px auto;
    word-break: break-all;
`;

export const Thead = styled.thead``;

export const Tbody = styled.tbody``;

export const Tr = styled.tr``;

//CRIAÇÃO DO th PARA WEB E MOBILE(dipositivo com menos de 500pixels)
export const Th = styled.th`
    text-align: start;
    border-bottom: inset;
    padding-bottom: 5px;


    @media (max-width: 500px){
        ${(props) => props.onlyWeb && "display: none"}
    }
`;

export const Td = styled.td`
    padding-top: 20px;
    text-align: ${(props) => (props.alignCenter ? "center" : "start" )};
    width: ${(props) => (props.width ? props.width : "auto" )};

    @media (max-width: 500px){
        ${(props) => props.onlyWeb && "display: none"}
    }
`;

const Grid = ({users, setUsers, setOnEdit}) => {
// CONST DO EDIT DO FaEdit LOGO ABAIXO
    const handleEdit = (item) => {
        setOnEdit(item);
    };

//DELETAR NA TABELA
    const handleDelete = async (CNPJ) => {
        await axios
            .delete("http://localhost:8800/" + CNPJ)
            .then(({ data }) => {
                const newArray = users.filter((user) => user.CNPJ !== CNPJ);
                
                setUsers(newArray);
                toast.success(data);
            })
            .catch(({data}) => toast.error(data));

        setOnEdit(null);
    };
//DADOS ARMAZENADOS
    return(
        <Table>
            <Thead>
                <Tr>
                    <Th>CNPJ / CPF</Th>
                    <Th>nome PJ/PF</Th>
                    <Th>valor</Th>
                    <Th>vencimento do boleto</Th>
                </Tr>
            </Thead>
            <Tr></Tr>
            <Tr></Tr>
            <Tr></Tr>
            <Thead>
                <Tr>
                    <Th>endereço</Th>
                    <Th>Número</Th>
                    <Th>bairro</Th>
                    <Th>municipio</Th>
                    <Th>UF</Th>
                    <Th>CEP</Th>
                    <Th></Th>
                    <Th></Th>
                    <Th></Th>
                    <Th></Th>
                </Tr>
            </Thead>
            <Tbody>
                {users.map((item, i) => (
                    <Tr key={i}>
                        <Td width="15%"> {item.CNPJ} </Td>
                        <Td width="20%"> {item.xNome} </Td>
                        <Td width="10%"> {item.vNF} </Td>
                        <Td width="15%"> {item.dVenc} </Td>
                        <Td width="30%"> {item.xLgr} </Td>
                        <Td width="5%"> {item.nro} </Td>
                        <Td width="10%"> {item.xBairro} </Td>
                        <Td width="10%"> {item.xMun} </Td>
                        <Td width="5%"> {item.UF} </Td>
                        <Td width="20%"> {item.CEP} </Td>

                        <Td width="5%">
                            <FaEdit onClick={() => handleEdit(item)} />
                        </Td>
                        <Td  width="5%">
                            <FaTrash onClick={() => handleDelete(item.CNPJ)} />
                        </Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );
};

export default Grid;