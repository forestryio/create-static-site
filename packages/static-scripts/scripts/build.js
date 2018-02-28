#!/usr/bin/env node

// Here we set the NODE_ENV to whatever was passed in
// by the calling process, and default to production
process.env.NODE_ENV = process.env.NODE_ENV 
    ? process.env.NODE_ENV 
    : "production"

const imagemin = require("./runners/imagemin")
const log = require("./utils/log")
const postcss = require("./runners/postcss")
const generator = require("./runners/generator")
const Orchestrator = require("orchestrator")
const svgSprite = require("./runners/svg-sprite")
const webpack = require("./runners/webpack")

// Here we define the tasks using orchestrator,
// an extremely lightweight and efficient task executor
const taskMgr = new Orchestrator();

taskMgr.add("postcss", postcss)

taskMgr.add("webpack", webpack)

taskMgr.add("imagemin", imagemin)

taskMgr.add("svgSprite", svgSprite)

taskMgr.add("generator", ['postcss', 'webpack', 'imagemin', 'svgSprite'], generator)

taskMgr.start('generator', (err) => {
    if (err) log(err, err.toString(), ["create-static-site"])
})