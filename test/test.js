/**
 * Created by zhubojun on 2017/7/28.
 */


describe('Token', function () {
    describe('#getKind()', function () {
        var token = new Token(8, 1);
        it('it should return the kind', function () {
            expect(token.getKind()).toBe(8);
        })
    });

    describe('#getVal()', function () {
        var token = new Token(8, 1);
        it('it should return the value', function () {
            expect(token.getVal()).toBe(1);
        })
    });
});

describe('Token_stream', function () {
    var token_stream = new Token_stream();
    describe('#getFull()', function () {
       it('it should return false', function () {
           expect(token_stream.full).toBe(false);
       })

   });
});


describe('Calculate1', function () {
    describe('Calculate1', function() {
        it('it should return 12.65', function () {
            ac();
            enter("1+2.33*5");
            equal();
            expect(12.65).toBe(12.65);
        })
    });
});

describe('Calculate2', function() {

    describe('Calculate2', function () {
        it('it should be 9', function () {
            ac();
            enter("(1+2)*3");
            equal();
            expect(result).toBe(9);
        })
    });
});




