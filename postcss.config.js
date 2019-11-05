const autoprefixer = require('autoprefixer');
module.exports = {  
	syntax: 'postcss-scss',
  plugins: [
  	require('cssnano'),
    require('autoprefixer'),
  	// autoprefixer({
   //  	add: true,
   //  	grid: "autoplace",
   //    browsers: ['> 1%', 'ie 11', 'last 5 versions'],
   //    flexbox: 'no-2009',
   //  }),
  ],
};