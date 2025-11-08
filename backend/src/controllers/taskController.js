export const getAllTask = (req,res)=>{
    res.status(200).send("ban co 500 cong viec de lam");
}

export const createTask = (req,res)=>{
    res.status(200).json({message:"Da them 500 cong viec vao thanh cong"});
}

export const putTask = (req,res)=>{
    res.status(200).json({message:"nhiem vu moi da duoc update vao thanh cong"});
}
export const delTask = (req,res)=>{
    res.status(200).json({message:"nhiem vu da bi xoa thanh cong"});
}