var vows = require('vows'),
    assert = require('assert');

d3 = require('d3');

var grid = require("../d3-grid.js");

vows.describe('d3.layout.grid').addBatch({
  'Grid layout' : {
    topic: function() { return d3.layout.grid; },
    'equally distributes 4 nodes within a 1x1 space, left to right, top to bottom': function(grid) {
      var l = grid().points();
      var nodes = [{}, {}, {}, {}];

      assert.deepEqual(l(nodes).map(layout), [
        {x: 0, y: 0},
        {x: 1, y: 0},
        {x: 0, y: 1},
        {x: 1, y: 1}
      ]);
    },
    '1 data point is in the center (is this good or should it be at [0,0]?)': function(grid) {
      var l = grid().points();
      var nodes = [{}];

      assert.deepEqual(l(nodes).map(layout), [
        {x: 0.5, y: 0.5}
      ]);
    },
    'equally distributes 5 nodes within a 1x1 space': function(grid) {
      var l = grid().points();
      var nodes = [{}, {}, {}, {}, {}];

      assert.deepEqual(l(nodes).map(layout), [
        {x: 0, y: 0},
        {x: 0.5, y: 0},
        {x: 1, y: 0},
        {x: 0, y: 1},
        {x: 0.5, y: 1}
      ]);
    },
    'equally distributes 5 nodes within a 300x500 space': function(grid) {
      var l = grid().points()
        .size([300, 500]);
      var nodes = [{}, {}, {}, {}, {}];

      assert.deepEqual(l(nodes).map(layout), [
        {x: 0, y: 0},
        {x: 150, y: 0},
        {x: 300, y: 0},
        {x: 0, y: 500},
        {x: 150, y: 500}
      ]);
    },
    'fixed amount of cols': function(grid) {
      var l = grid().points().cols(2);
      var nodes = [{}, {}, {}, {}, {}];

      assert.deepEqual(l(nodes).map(layout), [
        {x: 0, y: 0},
        {x: 1, y: 0},
        {x: 0, y: 0.5},
        {x: 1, y: 0.5},
        {x: 0, y: 1}
      ]);
    },
    'fixed amount of rows': function(grid) {
      var l = grid().points().rows(3);
      var nodes = [{}, {}, {}, {}, {}];

      assert.deepEqual(l(nodes).map(layout), [
        {x: 0, y: 0},
        {x: 1, y: 0},
        {x: 0, y: 0.5},
        {x: 1, y: 0.5},
        {x: 0, y: 1}
      ]);
    },
    'fixed amount of cols and rows': function(grid) {
      var l = grid().points().cols(2).rows(5);
      var nodes = [{}, {}, {}, {}, {}];

      assert.deepEqual(l(nodes).map(layout), [
        {x: 0, y: 0},
        {x: 1, y: 0},
        {x: 0, y: 0.25},
        {x: 1, y: 0.25},
        {x: 0, y: 0.5}
      ]);
    },
    '1 row': function(grid) {
      var l = grid().points().rows(1);
      var nodes = [{}, {}, {}, {}, {}];

      assert.deepEqual(l(nodes).map(layout), [
        {x: 0, y: 0.5},
        {x: 0.25, y: 0.5},
        {x: 0.5, y: 0.5},
        {x: 0.75, y: 0.5},
        {x: 1, y: 0.5}
      ]);
    },
    // TODO: This needs some more thought ...
    // '4 rows, 5 data points': function(grid) {
    //   var l = grid().points().rows(4);
    //   var nodes = [{}, {}, {}, {}, {}];

    //   assert.deepEqual(l(nodes).map(layout), [
    //     {x: 0, y: 0},
    //     {x: 0, y: 1/3},
    //     {x: 0, y: 2/3},
    //     {x: 0, y: 1},
    //     {x: 1, y: 0}
    //   ]);
    // },
    'fixed node sizes': function(grid) {
      var l = grid().points().nodeSize([1, 1]);
      var nodes = [{}, {}, {}, {}, {}];

      assert.deepEqual(l(nodes).map(layout), [
        {x: 0, y: 0},
        {x: 1, y: 0},
        {x: 2, y: 0},
        {x: 0, y: 1},
        {x: 1, y: 1}
      ]);
    },
    'reset rows/cols after each call': function(grid) {
      var l = grid().points();
      var nodes = [{}, {}, {}, {}, {}];

      assert.deepEqual(l(nodes).map(layout), [
        {x: 0, y: 0},
        {x: 0.5, y: 0},
        {x: 1, y: 0},
        {x: 0, y: 1},
        {x: 0.5, y: 1}
      ]);

      nodes = [{}, {}, {}, {}];

      assert.deepEqual(l(nodes).map(layout), [
        {x: 0, y: 0},
        {x: 1, y: 0},
        {x: 0, y: 1},
        {x: 1, y: 1}
      ]);
    },
    'fixed amount of cols stays the same': function(grid) {
      var l = grid().points().cols(2);
      var nodes = [{}, {}, {}, {}, {}];

      assert.deepEqual(l(nodes).map(layout), [
        {x: 0, y: 0},
        {x: 1, y: 0},
        {x: 0, y: 0.5},
        {x: 1, y: 0.5},
        {x: 0, y: 1}
      ]);

      nodes = [{}, {}, {}, {}, {}, {}, {}];

      assert.deepEqual(l(nodes).map(layout), [
        {x: 0, y: 0},
        {x: 1, y: 0},
        {x: 0, y: 1/3},
        {x: 1, y: 1/3},
        {x: 0, y: 2/3},
        {x: 1, y: 2/3},
        {x: 0, y: 1},

      ]);
    },
    'bands': function(grid) {
      var l = grid().bands();
      var nodes = [{}, {}, {}, {}, {}];

      assert.deepEqual(l(nodes).map(layout), [
        {x: 0, y: 0},
        {x: 1/3, y: 0},
        {x: 2/3, y: 0},
        {x: 0, y: 0.5},
        {x: 1/3, y: 0.5}
      ]);

      l.cols(2);

      assert.deepEqual(l(nodes).map(layout), [
        {x: 0, y: 0},
        {x: 0.5, y: 0},
        {x: 0, y: 1/3},
        {x: 0.5, y: 1/3},
        {x: 0, y: 2/3}
      ]);
    },
    'bands with padding': function(grid) {
      var l = grid().bands().padding([0.5, 0.5]);
      var nodes = [{}, {}, {}, {}, {}];

      assert.deepEqual(l(nodes).map(layout), [
        {x: 0, y: 0},
        {x: 0.4, y: 0},
        {x: 0.8, y: 0},
        {x: 0, y: 2/3},
        {x: 0.4, y: 2/3}
      ]);

      l.cols(2);

      assert.deepEqual(l(nodes).map(layout), [
        {x: 0, y: 0},
        {x: 2/3, y: 0},
        {x: 0, y: 0.4},
        {x: 2/3, y: 0.4},
        {x: 0, y: 0.8}
      ]);
    },
    'initial sizes': function(grid) {
      var l = grid();
      assert.deepEqual(l.size(), [1, 1]);
      assert.deepEqual(l.nodeSize(), [0, 0]);
      assert.deepEqual(l.nodeSize([1, 1]).size(), [0, 0]);
    },
    '.size() reports actual size when .points().nodeSize() is set': function(grid) {
      var l = grid().points().nodeSize([1, 1]);
      var nodes = [{}, {}, {}, {}, {}];

      l(nodes);
      assert.deepEqual(l.size(), [2, 1]);
    },
    '.size() reports actual size when .points().nodeSize() is set': function(grid) {
      var l = grid().points().nodeSize([1, 1]);
      var nodes = [{}, {}, {}, {}, {}];

      l(nodes);
      assert.deepEqual(l.size(), [2, 1]);
    },
    '.size() reports actual size when .bands().nodeSize() is set': function(grid) {
      var l = grid().bands().nodeSize([1, 1]);
      var nodes = [{}, {}, {}, {}, {}];

      l(nodes);
      assert.deepEqual(l.size(), [3, 2]);
    },
    '.nodeSize() reports actual spacing between points when .points().size() is set': function(grid) {
      var l = grid().points().size([1, 1]);
      var nodes = [{}, {}, {}, {}, {}];

      l(nodes);
      assert.deepEqual(l.nodeSize(), [0.5, 1]);
    },
    '.nodeSize() reports actual size when .bands().size() is set': function(grid) {
      var l = grid().bands().size([1, 1]);
      var nodes = [{}, {}, {}, {}, {}];

      l(nodes);
      assert.deepEqual(l.nodeSize(), [1/3, 0.5]);
    },
    '.nodeSize() reports actual size when .bands().size().padding() is set': function(grid) {
      var l = grid().bands().padding([0.5, 0.5]).size([1, 1]);
      var nodes = [{}, {}, {}, {}, {}];

      l(nodes);
      assert.deepEqual(l.nodeSize(), [1/5, 1/3]);
    },
  }
}).export(module);

function layout(node) {
  return {
    x: node.x,
    y: node.y
  };
}