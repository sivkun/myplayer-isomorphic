module.exports = {
    plugins: [
         require('precss'),
        require('autoprefixer')({ browsers: ['> 5%'] })
    ]
}
