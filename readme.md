# Webpack Notes and Config for React Setup

## Libraries
### react Libraries
```
npm install --save react react-dom prop-types
```

## Resolving
```
// Tells imports where to look for files
resolve: {
  extensions: ['*', '.js', '.jsx'],
  alias: {
    '@': resolve('src'),
  }
},
```

## Loaders and their Respective file extensions

```
npm install --save-dev webpack webpack-cli // install webpack and cli
npm install --save-dev style-loader // inject css in html
npm install --save-dev css-loader //css
npm install --save-dev babel-loader @babel/core @babel/preset-env // es6
npm install --save-dev babel-loader @babel/core @babel/preset-env @babel/preset-react // react jsx
npm install --save-dev babel-loader @babel/core @babel/preset-env @babel/plugin-proposal-class-properties @babel/preset-react // react jsx with class properties
npm install --save-dev sass-loader node-sass // sass
npm install --save-dev ts-loader //type script
npm install --save-dev file-loader // files, e.g. images, fonts
npm install --save-dev papaparse csv-loader xml-loader // xml, csv and tsvs
npm install --save-dev html-webpack-plugin // dynamically adds script filename to html
npm install --save-dev clean-webpack-plugin // to cleanup teh dist folder
npm install --save-dev source-map // sourcemap with production support
npm install --save-dev inline-source-map // sourcemap with no production support
npm install --save-dev webpack-dev-server // webpack devserver
npm install --save-dev react-hot-loader // react hot module
npm install --save-dev mini-css-extract-plugin // splits css into seperate file
```

### Configure Babel for react
```
// Create .babelrc file and put in
{
  "presets": ["@babel/preset-env", "@babel/preset-react", "@babel/plugin-proposal-class-properties"]
}
```

### Dev server
```
devServer: {
  contentBase: './dist'
},
```

### Hot modyle replacement (used by webpack dev server)
```
new webpack.HotModuleReplacementPlugin()
```

### Sourcemap
```
devtool: 'inline-source-map',
// devtool: 'source-map',
```

### Images
```
import MyImage from './my-image.png'
// will be replaced by file-loader

url('./my-image.png')
// will be replaced by css-loader in css or scss files

<img src="./my-image.png" />
// will be replaced by html-loader
```

### fonts
```
@font-face {
  font-family: "Advent Pro";
  font-style: normal;
  font-weight: 400;
  src: url("./MyFont.woff2") format("woff2"),
    url("./MyFont.woff") format("woff");
} // MyFont.woff2 and MyFont.woff will be copied to src by default
```

### CSV, TSV Loader config
```
{
  test: /\.(csv|tsv)$/,
  use: ["csv-loader"]
}
```

### XML Loader config
```
{
  test: /\.xml$/,
  use: ["xml-loader"]
}
```

### Webpack config example
```
const webpack = require('webpack'); //to access built-in plugins
const path = require('path');

module.exports = {
  entry: './path/to/my/entry/file.js',
  /* entry: {
    app: "path/to/entry1.js",
    vendor: "path/to/entry2.js",
  }, */ // multiple entry points
  output: {
    filename: 'my-first-webpack.bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  /* output: {
    filename: '[name].js', // for name
    filename: '[hash].js', // for hash
    path: __dirname + '/dist'
  }, */ // For multi outputf iles
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' }
        ]
      },
      {
        test: /\.scss$/,
        use: [
            "style-loader", // creates style nodes from JS strings
            {
              loader: "css-loader",
              options: {
                modules: true
              }
            }, // translates CSS into CommonJS
            {
              loader: "sass-loader",
              options: {
                includePaths: ["absolute/path/a", "absolute/path/b"]
              }
            } // compiles Sass to CSS, using Node Sass by default
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          loader:"file-loader",
          options: {
            name: '[path][name].[ext]', // Defaults to [hash].[ext]
          },
          /* name(file) {
            if (process.env.NODE_ENV === 'development') {
              return '[path][name].[ext]';
            }

            return '[hash].[ext]';
          } //Using function */
        ]
      }
      { test: /\.ts$/, use: 'ts-loader' }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
      title: "Learning Webpack"
    })
  ]
};
```

## Plugins
```
plugins: [
  new webpack.HotModuleReplacementPlugin(), // for hot module replacement
  new CleanWebpackPlugin(), // During build cleans the dist folder befor compiling assets
  new HtmlWebpackPlugin({ //Controls how to create the index.html file in dist folder
    template: "./src/index.html",
    filename: "index.html",
    title: "Learning Webpack"
  })
]
```

