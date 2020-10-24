var block = document.getElementById('background');
var text =  document.getElementById('text');

var C, M, Y, K;
var C1, C2, C3;
var output;

var r = 255 * (0 - C) * (1 - K);
var g = 255 * (0 - M) * (1 - K);
var b = 255 * (0 - Y) * (1 - K);

C1 = 54;
C2 = 200;
C3 = 55;

C = 0;
M = 0;
Y = 0;
K = 0;

function DataEdit(){
    var input_1 = document.getElementById('i1').value;
    var input_2 = document.getElementById('i2').value;
    var input_3 = document.getElementById('i3').value;

    C1 = input_1;
    C2 = input_2;
    C3 = input_3;

    block.style.backgroundColor = 'rgb(' + C1 + ',' + C2 + ',' + C3 + ')';

    Analis();
}

function NeronNet(){
    var net = new brain.NeuralNetwork();

    net.train([{
                input: {r: 0.03,
                        g: 0.7,
                        b: 0.5},
                output: {black: 1}},

                {input: {r: 0.16,
                        g: 0.09,
                        b: 0.2},
                output: {white: 1}
                },

                {input: {r: 0.5,
                        g: 0.5,
                        b: 1.0},
                output: {white: 1}}]);

    output = net.run({r: C1 / 255, g: C2 / 255, b: C3 / 255});
}

function Analis(){
    
    NeronNet();

    document.getElementById('W').textContent = output.white;
    document.getElementById('B').textContent = output.black;

    if( Math.round(output.white) === 1){
        K = 0;

        r = 255 * (1 - C) * (1 - K);
        g = 255 * (1 - M) * (1 - K);
        b = 255 * (1 - Y) * (1 - K);

        text.style.color = 'rgb(' + r + ',' + g + ',' + b + ')';
        
    }else if( Math.round(output.black) === 1){
        K = 1;

        r = 255 * (1 - C) * (1 - K);
        g = 255 * (1 - M) * (1 - K);
        b = 255 * (1 - Y) * (1 - K);

        text.style.color = 'rgb(' + r + ',' + g + ',' + b + ')';
    }
}
