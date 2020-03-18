const expect = require('chai').expect;
const supertest = require('supertest');
const app = require('../app');

describe('GET /apps', () => {
    
    it('should return 200 from GET /apps when given two valid queries', () => {
        return supertest(app)
            .get('/apps')
            .query({ sort: 'Rating', genres: 'Action'})
            .expect(200)
    
    });

    it('should return 400 when given an invalid query', () => {
        return supertest(app)
            .get('/apps')
            .query({ sort: 'Favorite', genres: 'Action'})
            .expect(400, 'Sort must be equal to Rating or App')
     
    });

    it('should return an array of an array of 6 items given Action as the genres query', () => {
        return supertest(app)
            .get('/apps')
            .query({ sort: 'Rating', genres: 'Action'})
            .expect(200)
            .then(res => {
                expect(res.body).to.be.an('array')
                expect(res.body).to.have.lengthOf(6)
            })
    });

    it('should return an array of an array of 20 items given no queries', () => {
        return supertest(app)
            .get('/apps')
            .expect(200)
            .then(res => {
                expect(res.body).to.be.an('array')
                expect(res.body).to.have.lengthOf(20)
            })
    });

    it('any object in the array should have a specific set of keys', () => {
        return supertest(app)
            .get('/apps')
            .expect(200)
            .query({ sort: 'App', genres: 'Casual'})
            .then(res => {
                expect(res.body[0]).to.be.an('object')
                expect(res.body[0]).to.include.all.keys('App', 'Category', 'Rating', 'Reviews', 'Size', 'Installs', 'Type', 'Price', 'Content Rating', 'Genres', 'Last Updated', 'Current Ver', 'Android Ver')
            })
    });
});