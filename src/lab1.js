/**
 * Created by zhubojun on 2017/7/18.
 */


var display = "";

var result = "";

function Token_stream() {
    this.full = false;
    this.buffer = new Token(0, 0);
}

var ts = new Token_stream();

function enter(val) {
    display += val;
    $('#display').html(display);
}

function error(val) {
    result = val;
    display = "";
    $('#display').html(result);
}

function ce() {
    if (display.length == 0)
        return;

    display = display.slice(0, display.length - 1);
    $('#display').html(display);
}

function ac() {
    display = "";
    $('#display').html(display);
}

function equal() {
    display = "";
    result = expression();
    $('#display').html(result);
}

function putBack(t) {
    if (ts.full)
        error("putback into a full buffer");
    ts.buffer = t;
    ts.full = true;
}

function getCharfromDisplay() {
    if (display.length == 0)
        error();

    var ch = display[0];
    display = display.substring(1, display.length);
    return ch;
}

function getDecimal(ch) {
    var decimal = ch;
    for (var i = 0; i < display.length; i++) {
        var char = display[i]
        if (char == '.' || (char >= '0' && char <= '9'))
            decimal += char;
        else
            break;
    }

    display = display.substring(i, display.length);
    return decimal;
}

function Token(kind, val) {
    this.kind = kind;
    this.val = val;
}

Token.prototype.getKind = function() {
   return this.kind;
};

Token.prototype.getVal = function() {
    return this.val;
};

function get() {
    if (ts.full) {
        ts.full = false;
        return ts.buffer;
    }

    var ch = getCharfromDisplay();
    switch (ch) {
        case '(':case')':
        case'+':case'-':
        case'*':case '/':
            var result = new Token(ch, 0);
            return result;

        case '.':
        case '0':case'1':case '2':case'3':case '4':
        case '5':case'6':case '7':case'8':case '9':
            var decimal = parseFloat(getDecimal(ch));
            var result =  new Token('8', decimal);
            return result;

        default:
            error("");
    }
}

function primary() {
    var t = get();
    var value = 0;
    switch (t.getKind()) {
        case '(': {			    // handle '(' expression ')'
            var d = parseFloat(expression());
            t = get();
            if (t.getKind() != ')') {
                putBack(t);
                error("error");
            }

            return d;
        }

        case '8':				// we use '8' to represent a number
            value = t.getVal();	// return the number's value
            return value;

        case '-':
            return -parseFloat(primary());

        case '+':
            return parseFloat(primary());

        default:
            error("error");
    }
}

function term() {
    var left = parseFloat(primary());
    var t = get();		        // get the next Token from the Token stream

    while (true) {
        if (t === undefined)
            return left;

        switch (t.getKind()) {
            case '*':
                left *= parseFloat(primary());
                t = get();
                break;

            case '/': {
                var d = parseFloat(primary());
                if (d == 0) error("error");
                left /= d;
                t = get();
                break;
            }

            default:
                putBack(t);     // put t back into the Token stream
                return left;
        }
    }
}

function expression() {
    var left = term();	        // read and evaluate a Term
    var t = get();		    // get the next Token from the Token stream

    while (true) {
        if (t === undefined)
            return left;

        switch (t.getKind()) {
            case '+':
                left += parseFloat(term());	//evaluate Term and add
                console.log(left);
                t = get();
                break;

            case '-':
                left -= parseFloat(term());	// evaluate Term and subtract
                t = get();
                break;

            default:
                putBack(t);	    // put t back into the token stream
                return left;	// finally: no more + or -; return the answer
        }
    }
}

