var UAV = require('../../robots/uav'),
	expect = require('chai').expect,
	directions = require('../../robots/directions'),
	turn = require('../../robots/turn'),
	Vehicle = require('../../robots/vehicle');


describe('UAV', function () {
	var uav = null;

	beforeEach(function () {
		uav = new UAV();
	});

	afterEach(function () {
		uav = null;
	});
	
	it('should be an instance of vehicle', function () {
		expect(uav).to.be.an.instanceof(Vehicle);
	});

	it('should be able to move only in RIGHT, LEFT, FORWARD, UPWARD and DOWNWARD directions', function () {
		expect(uav.movements).to.be.eql([directions.FORWARD, directions.UPWARD, directions.DOWNWARD]);
	});

	it('should throw an error if asked to move in BACKWARD direction', function (done) {
		uav.loadInstructions(directions.BACKWARD.code, function (err) {
			expect(err).to.be.instanceof(Error);
			done();
		});
	});


	it('should be able to move along the Z-axis', function (done) {
		uav.move(directions.UPWARD, function (err) {
			expect(uav.position()).to.be.eql([0, 0, 10]);
			done();
		});
	});

	it('should be able to move both along x, y and z-axis', function (done) {
		uav.loadInstructions('FFURFFRFF', function (err) {
			expect(this.position()).to.be.eql([2 , 0, 10]);
			done();
		});
	});

	it('should fail to move outside the board', function (done) {
		uav.loadInstructions('FFULUF', function (err) {
			expect(err).to.be.instanceof(Error);
			done();
		});
	});

});