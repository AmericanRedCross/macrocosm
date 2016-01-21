'use strict';

var knex = require('../../connection.js');
var server = require('../bootstrap.test');

describe('changeset create endpoint', () => {
  var changesets = [];

  after(done => {
    // Delete newly created changesets.
    return knex.transaction(transaction => {
      console.log(changesets);
      return transaction('changesets')
        .whereIn('id', changesets)
        .del()
        .returning('*')
        .then(deleted => {
          console.log(deleted.length, 'changesets deleted');

          return transaction('users')
            .whereIn('id', [99])
            .del()
            .returning('*');
        })
        .then(deleted => console.log(deleted.length, 'users deleted'));
    })
    .then(() => done())
    .catch(done);
  });

  it('returns a numerical changeset id.', done => {
    server.injectThen({
      method: 'PUT',
      url: '/changeset/create',
      payload: {
        uid: 99,
        user: 'openroads',
        comment: 'test comment',
        osm: {changeset: {}}
      }
    })
    .then(res => {
      res.statusCode.should.eql(200);

      var id = +res.payload;
      (id).should.be.within(0, Number.MAX_VALUE);
      changesets.push(id);

      done();
    })
    .catch(err => done(err));
  });

  describe('create', () => {
    describe('node', () => {
      it('appends to "current_nodes"');

      it('appends to "nodes"');
    });

    describe('way', () => {
      it('appends to "current_ways"');

      it('appends to "ways"');
    });

    describe('relation', () => {
      it('appends to "current_relations"');

      it('appends to "relations"');
    });
  });

  describe('modify', () => {
    describe('node', () => {
      it('updates "current_nodes"');

      it('appends to "nodes"');

      it('associates new entries with their corresponding changeset in "nodes"');

      it('increments the version of new entries in "nodes"');

      it('marks old entries in "nodes" as invisible');
    });

    describe('way', () => {
      it('updates "current_ways"');

      it('appends to "ways"');

      it('associates new entries with their corresponding changeset in "ways"');

      it('increments the version of new entries in "ways"');

      it('marks old entries in "ways" as invisible');
    });

    describe('relation', () => {
      it('updates "current_relations"');

      it('appends to "relations"');

      it('associates new entries with their corresponding changeset in "relations"');

      it('increments the version of new entries in "relations"');

      it('marks old entries in "relations" as invisible');
    });
  });

  describe('delete', () => {
    describe('node', () => {
      it('deletes from "current_nodes"');

      it('marks nodes as invisible in "nodes"');
    });

    describe('way', () => {
      it('deletes from "current_ways"');

      it('marks ways as invisible in "ways"');
    });

    describe('relation', () => {
      it('deletes from "current_relations"');

      it('marks relations as invisible in "relations"');
    });
  });
});
