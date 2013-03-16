var UAV = require('../../robots/uav'),
	expect = require('chai').expect,
	directions = require('../../robots/directions'),
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
		expect(uav.movements).to.be.eql([directions.RIGHT, directions.LEFT, directions.FORWARD, directions.UPWARD, directions.DOWNWARD]);
	});

	it('should throw an error if asked to move in BACKWARD direction', function () {
		var moveBack = function (){
			tank.loadDirections(directions.BACKWARD.code);
		};

		expect(moveBack).to.throw(Error);
	});

});