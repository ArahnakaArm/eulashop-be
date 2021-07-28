const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');

chai.should();

chai.use(chaiHttp);

describe('/GET book', () => {
    it('it should GET all the books', (done) => {
        chai.request('http://localhost:3000')
            .get('/api/categories')
            // eslint-disable-next-line node/handle-callback-err
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
});
