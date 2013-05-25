var vows = require('vows'),
    assert = require('assert');

d3 = require('d3');

var grid = require("../d3.layout.grid.js");

vows.describe('d3.layout.grid').addBatch({
  'Grid layout' : {
    topic: function() { return d3.layout.grid; },
    'equally distributes 4 nodes within a 1x1 space, left to right, top to bottom': function(grid) {
      var l = grid();
      var nodes = [{}, {}, {}, {}];

      assert.deepEqual(l(nodes).map(layout), [
        {x: 0, y: 0},
        {x: 1, y: 0},
        {x: 0, y: 1},
        {x: 1, y: 1}
      ]);
    },
    '1 data point is in the center (is this good or should it be at [0,0]?)': function(grid) {
      var l = grid();
      var nodes = [{}];

      assert.deepEqual(l(nodes).map(layout), [
        {x: 0.5, y: 0.5}
      ]);
    },
    'equally distributes 5 nodes within a 1x1 space': function(grid) {
      var l = grid();
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
      var l = grid()
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
      var l = grid().cols(2);
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
      var l = grid().rows(3);
      var nodes = [{}, {}, {}, {}, {}];

      assert.deepEqual(l(nodes).map(layout), [
        {x: 0, y: 0},
        {x: 1, y: 0},
        {x: 0, y: 0.5},
        {x: 1, y: 0.5},
        {x: 0, y: 1}
      ]);
    },
    '1 row': function(grid) {
      var l = grid().rows(1);
      var nodes = [{}, {}, {}, {}, {}];

      assert.deepEqual(l(nodes).map(layout), [
        {x: 0, y: 0.5},
        {x: 0.25, y: 0.5},
        {x: 0.5, y: 0.5},
        {x: 0.75, y: 0.5},
        {x: 1, y: 0.5}
      ]);
    },
    'fixed node sizes': function(grid) {
      var l = grid().nodeSize([1, 1]);
      var nodes = [{}, {}, {}, {}, {}];

      assert.equal(l.size(), null);
      assert.deepEqual(l(nodes).map(layout), [
        {x: 0, y: 0},
        {x: 1, y: 0},
        {x: 2, y: 0},
        {x: 0, y: 1},
        {x: 1, y: 1}
      ]);
    },
    'reset rows/cols after each call': function(grid) {
      var l = grid();
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
      var l = grid().cols(2);
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
  }
}).export(module);

function layout(node) {
  return {
    x: node.x,
    y: node.y
  };
}