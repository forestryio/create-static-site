#!/usr/bin/env node

// Here we set the NODE_ENV to whatever was passed in
// by the calling process, and default to production
process.env.NODE_ENV = process.env.NODE_ENV 
    ? process.env.NODE_ENV 
    : "production"

const imagemin = require("./runners/imagemin")
const log = require("./utils/log")
const postCss = require("./runners/postcss")
const purgeCss = require("./runners/purgecss")
const generator = require("./runners/generator")
const Orchestrator = require("orchestrator")
const svgSprite = require("./runners/svg-sprite")
const webpack = require("./runners/webpack")

// Here we define the tasks using orchestrator,
// an extremely lightweight and efficient task executor
const taskMgr = new Orchestrator();

taskMgr.add("postCss", (cb) => {
    postCss().on("close", () => cb())
})

taskMgr.add("webpack",  (cb) => {
    webpack().on("close", () => cb())
})

taskMgr.add("imagemin", (cb) => {
    imagemin().on("close", () => cb())
})

taskMgr.add("svgSprite", (cb) => {
    svgSprite().on("close", () => cb())
})

taskMgr.add("generator", ['postCss', 'webpack', 'imagemin', 'svgSprite'], (cb) => {
    generator().on("close", () => cb())
})

taskMgr.add("purgeCss", ['postCss'], (cb) => {
    purgeCss().on("close", () => cb())
})

taskMgr.start('purgeCss', (err) => {
    if (err) log(err, err.toString(), ["create-static-site"])
})

process.on('SIGINT', () => process.exit())
process.on('SIGTERM', () => process.exit())