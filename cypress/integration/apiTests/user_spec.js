import ENDPOINTS from '../../fixtures/constants/EndPoints'
import { NEW_USER, UPDATED_USER } from '../../fixtures/constants/requestResponse'

describe('should add a new user', () => {
  let id;
  context('POST requests', () => {
    it('should create a new user and validate status code', () => {
      cy.request({
        method: 'POST',
        url: ENDPOINTS.users,
        body: NEW_USER,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      }).then((res) => {
        expect(res.status).to.eq(201);
      });
    });

    it('should create a new user and validate response', () => {
      cy.request({
        method: 'POST',
        url: ENDPOINTS.users,
        body: NEW_USER,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      }).then((res) => {

        expect(Object.keys(res.body)).to.have.length(4);
        expect(res.body.id).to.not.undefined;
        expect(res.body.name).to.eq(NEW_USER.name);
        expect(res.body.job).to.eq(NEW_USER.job);
        id = res.body.id
      });
    });

    it('should get a user and validate response', () => {
      cy.request({
        method: 'GET',
        url: ENDPOINTS.users + '/1',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      }).then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body.data.id).to.eq(1);
      });
    });

    it('should update the newly created user and validate response', () => {
      cy.request({
        method: 'PUT',
        url: ENDPOINTS.users + '/' + id,
        body: UPDATED_USER,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      }).then((res) => {
        expect(res.status).to.eq(200);
        expect(Object.keys(res.body)).to.have.length(3);
        expect(res.body.id).to.undefined;
        expect(res.body.name).to.eq(UPDATED_USER.name);
        expect(res.body.job).to.eq(UPDATED_USER.job);
      });
    });

    it('should update the job of newly created user and validate response', () => {
      cy.request({
        method: 'PATCH',
        url: ENDPOINTS.users + '/' + id,
        body: UPDATED_USER,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      }).then((res) => {
        expect(res.status).to.eq(200);
        expect(Object.keys(res.body)).to.have.length(3);
        expect(res.body.id).to.undefined;
        expect(res.body.name).to.eq(UPDATED_USER.name);
        expect(res.body.job).to.eq(UPDATED_USER.job);
      });
    });

    it('should delete the newly created user and validate response', () => {
      cy.request({
        method: 'DELETE',
        url: ENDPOINTS.users + '/' + id,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      }).then((res) => {
        expect(res.status).to.eq(204);
      });
    });

  });
});
