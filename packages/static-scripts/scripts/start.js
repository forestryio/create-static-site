#!/usr/bin/env node

// Here we set the NODE_ENV to whatever was passed in
// by the calling process, and default to development
process.env.NODE_ENV = process.env.NODE_ENV 
    ? process.env.NODE_ENV 
    : "development"

const browsersync = require("./runners/browsersync")
const imagemin = require("./runners/imagemin")
const log = require("./utils/log")
const Orchestrator = require("orchestrator")
const postcss = require("./runners/postcss")
const generator = require("./runners/generator")
const svgSprite = require("./runners/svg-sprite")
const webpack = require("./runners/webpack")

// Here we define the tasks using orchestrator,
// an extremely lightweight and efficient task executor
const taskMgr = new Orchestrator();

taskMgr.add("postcss", postcss.watch)

taskMgr.add("webpack", webpack.watch)

taskMgr.add("imagemin", imagemin.watch)

taskMgr.add("svgSprite", svgSprite.watch)

taskMgr.add("browsersync", browsersync)

taskMgr.add("generator", ['postcss', 'webpack', 'imagemin', 'svgSprite', 'browsersync'], generator)

taskMgr.start('generator', (err) => {
    if (err) log(err, err.toString(), ["create-static-site"])
})