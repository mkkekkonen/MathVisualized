const movie = bonsai.run(document.getElementById('canvas'), {
    url: '/static/mathvisualized/js/bonsai_movie_bundles/curveequation.js',
    width: 480,
    height: 480,
});

document.getElementById('updateButton').addEventListener('click', () => {
    movie.sendMessage('updateEquation', {
        equation: document.getElementById('equation').value,
    });
});
