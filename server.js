//const express = require('express');
import express from 'express'
import path from 'path'
import webpack from 'webpack'
const port = 3001;

const app = express();

const config = require('./config/webpack.dev.js')
const compiler = webpack(config)
const webpackDevMiddleware = require('webpack-dev-middleware')(
  compiler,
  config.devServer
)

app.use(webpackDevMiddleware)

const webpackHotMiddleware = require('webpack-hot-middleware')(
  compiler
)

// It must be before static middleware
app.use(webpackHotMiddleware)

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'))
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))