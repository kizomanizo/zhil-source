function viewRender (req, res, page, title, rows) {
    res.render( page, { 'title': title, 'rows': rows } )
}

module.exports = {
    viewRender,
}