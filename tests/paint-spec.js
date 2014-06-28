describe("Chip", function(){
    var options;
    var c;

    beforeEach(function () {
        options ={
            dimentions : [50, 50],
            position : [500, 500],
            content : ["html", "full"]
        };
        testChip = new Chip (options);
    });

    it("can take in Options", function(){
        expect( testChip.options ).toEqual( options );
    });

    it("has method Paint", function(){
        expect( testChip.paint ).toBeDefined();
    });
});
