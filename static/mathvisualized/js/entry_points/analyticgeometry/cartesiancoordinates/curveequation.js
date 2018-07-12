'use strict';

var movie = bonsai.run(document.getElementById('canvas'), {
    url: '/static/mathvisualized/js/bonsai_movie_bundles/curveequation.js',
    width: 480,
    height: 480
});

document.getElementById('updateButton').addEventListener('click', function () {
    movie.sendMessage('updateEquation', {
        a: parseFloat(document.getElementById('a').value),
        b: parseFloat(document.getElementById('b').value),
        c: parseFloat(document.getElementById('c').value)
    });
});