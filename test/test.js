/**
 * Created by zhubojun on 2017/7/28.
 */


var Token_stream = new Token_stream();

var Token = new Token(8, 1);



describe('Token', function () {
    describe('#getKind()', function () {
        it('it should return the kind', function () {
            expect(Token.getKind()).toBe(8);
        });
    });

    describe('#getVal()', function () {
        it('it should return the value', function () {
            expect(Token.getVal()).toBe(1);
        });
    });
});

describe('Token_stream', function () {
   describe('#getFull()', function () {
       it('it should return false', function () {
           expect(Token_stream.full).toBe(false);
       });

   });
});


describe('Calculate1', function () {

    ac();
    enter("1+2.33*5");

    describe('Calculate1', function() {
        it('it should return 12.65', function () {
            expect(equal()).toBe(12.65);
        });
    });
});

describe('Calculate2', function() {

    describe('Calculate2', function () {
        it('it should be 9', function () {
            ac();
            enter("(1+2)*3");
            expect(equal().toBe(9));
        });
    });
});

describe('ac and ce', function () {
        ac();
        enter("(111+2)*9");
        ce();

    describe('Test ce', function () {
        it('it shold be (111+2)*', function() {
            expect(getCharfromDisplay().toBe("(111+2)*"));
        });
    });
});



