import { db } from "../db.js";

//EXIBIR DADOS DO CLIENTE
export const getUsers = (_, res) => {
    const q = "SELECT * FROM cliente";

    db.query(q, (err, data) => {
        if (err) return res.json(err);
        
        return res.status(200).json(data);
    });
};

//ADD CLIENTE
export const addUser = (req, res) => {
    const q = "INSERT INTO cliente(`CNPJ`, `xNome`, `vNF`, `dVenc`, `xLgr`, `nro`, `xBairro`, `xMun`, `UF`, `CEP`) VALUES(?)";

        const values = [
            req.body.CNPJ,
            req.body.xNome,
            req.body.vNF,
            req.body.dVenc,
            req.body.xLgr,
            req.body.nro,
            req.body.xBairro,
            req.body.xMun,
            req.body.UF,
            req.body.CEP,
        ];
//FUNCÃO QUE RECEBE POSSVIEL ERRO OU SUCESSO
        db.query(q, [values], (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json("Erro ao criar usuário");
            }
        
            return res.status(200).json("Usuário criado com sucesso");
        });
};

//ATUALIZAR CLIENTE
export const updateUser = (req, res) => {
    const q=
        "UPDATE cliente SET `xNome` = ?, `vNF` = ?, `dVenc` = ?, `xLgr` = ?, `nro` = ?, `xBairro` = ?, `xMun` = ?, `UF` = ?, `CEP` = ? WHERE `CNPJ` =?";
   
    const values = [
        req.body.xNome,
        req.body.vNF,
        req.body.dVenc,
        req.body.xLgr,
        req.body.nro,
        req.body.xBairro,
        req.body.xMun,
        req.body.UF,
        req.body.CEP,
    ];
//FUNCÃO QUE RECEBE POSSVIEL ERRO OU SUCESSO
const { xNome, vNF, dVenc, xLgr, nro, xBairro, xMun, UF, CEP } = req.body;
if (!xNome || !vNF || !dVenc || !xLgr || !nro || !xBairro || !xMun || !UF || !CEP) {
    return res.status(400).json("Preencha todos os campos necessários.");
}

db.query(q, [...values, req.params.CNPJ], (err) => {
    if (err) {
        console.error(err);
        return res.status(500).json("Erro ao atualizar usuário");
    }

    return res.status(200).json("Usuário atualizado com sucesso");
});
};
//DELETAR USUARIO
export const deleteUser = (req, res) => {
    const q= "DELETE FROM cliente WHERE `CNPJ` = ?";

    db.query(q, [req.params.CNPJ], (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json("Erro ao excluir usuário");
        }

        return res.status(200).json("Usuário excluído com sucesso");
    });
};