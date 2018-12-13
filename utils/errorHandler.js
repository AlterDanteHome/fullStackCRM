module.exports = (res,error)=>{
    res.status(500).json({
        messadge:error.messadge ? error.messadge : 'Произошла ошибка сервера'
    })
}