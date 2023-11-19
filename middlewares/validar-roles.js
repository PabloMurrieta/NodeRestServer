

const esAdminRole = (req, res = Response, next) =>{


    if(!req.usuario){
        return res.status(500).json({
            msg:'Se quiere verificar el rol sin validar el token primero'
        });

    }

        const {rol, name} = req.usuario;

        if( rol != 'ADMIN_ROLE'){
            return res.status(401).json({
                msg:`${name} no es administrador -No puede ejercer la funcion solicitada`
            });
    }


    next();
}

const tieneRol = (...roles) =>{

    

    return (req, res = Response, next) =>{

    if(!req.usuario){
        return res.status(500).json({
            msg:'Se quiere verificar el rol sin validar el token primero'
        });

    }
    if(!roles.includes(req.usuario.rol)){
        return res.status(401).json({
           msg:`El usuario no se encuentra dentro de los roles autorizados para realizar esta funcion`
        })
    }

        next();
    }
}


export{
    esAdminRole,
    tieneRol
}