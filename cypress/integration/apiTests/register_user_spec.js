import ENDPOINTS from '../../fixtures/constants/EndPoints'
import { REGISTER_USER, REGISTER_INVALID_USER, ERROR_MESSAGES } from '../../fixtures/constants/requestResponse'

describe('should register a new user', () => {
  context('POST requests', () => {
    it('should register user and validate status code', () => {
      cy.request({
        method: 'POST',
        url: ENDPOINTS.register,
        body: REGISTER_USER,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      }).then((res) => {
        expect(res.status).to.eq(200);
      });
    });

    it('should register user and validate response', () => {
      cy.request({
        method: 'POST',
        url: ENDPOINTS.register,
        body: REGISTER_USER,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      }).then((res) => {
        expect(Object.keys(res.body)).to.have.length(2);
        expect(res.body.id).to.not.undefined;
        expect(res.body.token).to.not.undefined;
      });
    });

    it('should not be able to register user with missing password', () => {
      cy.request({
        method: 'POST',
        url: ENDPOINTS.register,
        body: REGISTER_INVALID_USER,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        failOnStatusCode: false,
      }).then((res) => {
        expect(res.status).to.eq(400);
        expect(res.body).to.have.property(
          'error',
          ERROR_MESSAGES.MISSING_PASSWORD
        );
      });
    });
  });
});
